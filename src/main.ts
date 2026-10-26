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

  void boot().catch((error: unknown) => {
    console.error('[Choppies] Startup failed:', error);
    const app = document.getElementById('app');
    if (!app) return;
    const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
    app.innerHTML = `<main class="ahg-fallback"><p>CHOPPIES PLAY & DISCOVER COULD NOT START.</p><p class="ahg-fallback-help">Startup error details (send this text if the problem repeats):</p><pre class="ahg-fallback-error"></pre><button type="button" id="ahg-return-menu">RETRY</button></main>`;
    const details = app.querySelector('.ahg-fallback-error');
    if (details) details.textContent = message;
    document.getElementById('ahg-return-menu')?.addEventListener('click', () => window.location.reload());
  });
}

startHall();
