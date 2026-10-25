import './style.css';

async function startExperience() {
  try {
    const [
      { default: Phaser },
      { registerPwa },
      { BootScene },
      { PublisherIntroScene },
      { LivingWorldGameScene },
    ] = await Promise.all([
      import('phaser'),
      import('./pwa'),
      import('./scenes/BootScene'),
      import('./scenes/PublisherIntroScene'),
      import('./scenes/LivingWorldGameScene'),
    ]);

    registerPwa();

    const config: Phaser.Types.Core.GameConfig = {
      type: (window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0)
        ? Phaser.CANVAS
        : Phaser.AUTO,
      parent: 'app',
      width: 960,
      height: 540,
      backgroundColor: '#c8102e',
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
      scene: [BootScene, PublisherIntroScene, LivingWorldGameScene],
    };

    const game = new Phaser.Game(config);
    (window as Window & { __AHG_GAME__?: unknown }).__AHG_GAME__ = game;
  } catch (error) {
    const app = document.getElementById('app');
    if (!app) return;
    app.innerHTML = '<main class="ahg-fallback"><p>CHOPPIES PLAY & DISCOVER COULD NOT START.</p><button type="button" id="ahg-return-menu">RELOAD EXPERIENCE</button></main>';
    document.getElementById('ahg-return-menu')?.addEventListener('click', () => window.location.reload());
    console.error('Choppies Play & Discover failed to start.', error);
  }
}

void startExperience();
