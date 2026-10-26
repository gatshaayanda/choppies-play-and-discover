import './style.css';
import './mobile-controls';
import { registerPwa } from './pwa';

// Capture beforeinstallprompt before the game dynamically loads its scenes.
// Browsers may dispatch it during startup; attaching the listener after Promise.all loses it.
registerPwa();
function startHall() {
  const boot = async () => {
    // Load only the Choppies experience. Unrelated Admin Hub game chunks must
    // never prevent the farm from starting.
    const [
      { default: Phaser },
      { BootScene },
      { PublisherIntroScene },
      { LivingWorldIntroScene },
      { LivingWorldSetupScene },
      { LivingWorldGameScene },
    ] = await Promise.all([
      import('phaser'),
      import('./scenes/BootScene'),
      import('./scenes/PublisherIntroScene'),
      import('./scenes/LivingWorldIntroScene'),
      import('./scenes/LivingWorldSetupScene'),
      import('./scenes/LivingWorldGameScene'),
    ]);

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'app',
      width: 960,
      height: 540,
      backgroundColor: '#1e402b',
      input: { activePointers: 3 },
      dom: { createContainer: true },
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.NO_CENTER,
        expandParent: true,
        width: 960,
        height: 540,
        min: { width: 320, height: 180 },
        max: { width: 0, height: 0 },
      },
      scene: [BootScene, PublisherIntroScene, LivingWorldIntroScene, LivingWorldSetupScene, LivingWorldGameScene],
    };

    const game = new Phaser.Game(config);
    (window as Window & { __AHG_GAME__?: unknown }).__AHG_GAME__ = game;
  };

  void boot().catch(async (error: unknown) => {
    console.error('[Choppies] Startup failed:', error);
    const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);

    // Recover once from stale Vite chunks left by an older installed PWA.
    // Only clear this app's caches; never touch local farm progress.
    const cacheMismatch = /failed to fetch dynamically imported module|importing a module script failed|loading chunk|failed to fetch/i.test(message);
    if (cacheMismatch && navigator.onLine && !sessionStorage.getItem('choppies-startup-recovered')) {
      sessionStorage.setItem('choppies-startup-recovered', '1');
      try {
        if ('serviceWorker' in navigator) {
          const workers = await navigator.serviceWorker.getRegistrations();
          await Promise.all(workers.filter((worker) => new URL(worker.scope).origin === location.origin).map((worker) => worker.unregister()));
        }
        if ('caches' in window) {
          const names = await caches.keys();
          await Promise.all(names.filter((name) => name.startsWith('choppies-play-discover-') || name.startsWith('admin-hub-games-')).map((name) => caches.delete(name)));
        }
        window.location.reload();
        return;
      } catch (recoveryError) {
        console.error('[Choppies] Automatic cache recovery failed:', recoveryError);
      }
    }

    const app = document.getElementById('app');
    if (!app) return;
    app.innerHTML = `<main class="ahg-fallback"><p>CHOPPIES PLAY & DISCOVER COULD NOT START.</p><p class="ahg-fallback-help">Startup error details:</p><pre class="ahg-fallback-error"></pre><button type="button" id="ahg-return-menu">RETRY</button></main>`;
    const details = app.querySelector('.ahg-fallback-error');
    if (details) details.textContent = error instanceof Error && error.stack ? error.stack : message;
    document.getElementById('ahg-return-menu')?.addEventListener('click', () => window.location.reload());
  });
}

startHall();
