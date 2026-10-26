import { markInstallSurfaceReady } from './pwa';

type GameMenuItem = {
  id: 'living-world';
  title: string;
  description: string;
  status: 'PLAY NOW' | 'IN DEVELOPMENT';
  playable: true;
};

const games: GameMenuItem[] = [
  {
    id: 'living-world',
    title: 'CHOPPIES FARM WORLD',
    description: 'Choose your farmer, explore a 3D farm, water and harvest vegetables, care for animals and discover the world on foot or horseback.',
    status: 'PLAY NOW',
    playable: true,
  },

];

export function renderCatalog(onPlay: (gameId: GameMenuItem['id']) => void) {
  const app = document.getElementById('app');
  if (!app) return;

  app.className = 'ahg-catalog';

  // Keep Phaser's canvas mounted. Replacing #app.innerHTML would detach the
  // live game canvas, so the selected game's scene can start cleanly underneath
  // this menu. The library is an overlay on top of Phaser.
  app.querySelector('.game-menu')?.remove();
  app.insertAdjacentHTML('beforeend', `
    <main class="game-menu" aria-labelledby="game-menu-title">
      <header class="game-menu-header">
        <div class="brand">
          <span class="brand-mark">C</span>
          <span>CHOPPIES <b>PLAY & DISCOVER</b></span>
        </div>
        <span class="menu-label">GAME LIBRARY</span>
      </header>

      <section class="game-menu-main">
        <div class="menu-intro">
          <p class="eyebrow">PLAY · DISCOVER · RETURN</p>
          <h1 id="game-menu-title">Your world is waiting.</h1>
          <p>Choose your farmer and step into Choppies Farm World.</p>
        </div>

        <div class="menu-grid">
          ${games.map((game, index) => `
            <article class="menu-card ${game.playable ? 'is-playable' : 'is-coming'}">
              <div class="menu-card-art" aria-hidden="true"><span>0${index + 1}</span></div>
              <div class="menu-card-content">
                <div class="menu-card-meta"><span>${game.status}</span><span>WORLD</span></div>
                <h2>${game.title}</h2>
                <p>${game.description}</p>
                <button class="menu-play" data-game-id="${game.id}" type="button">PLAY ${game.title} <span>→</span></button>
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      <footer class="game-menu-footer">
        <span>CHOPPIES · PLAY & DISCOVER</span>
        <span>EXPLORE · PLAY · GROW</span>
      </footer>
    </main>
  `);

  markInstallSurfaceReady();

  const menu = app.querySelector<HTMLElement>('.game-menu');
  const playButtons = Array.from(menu?.querySelectorAll<HTMLButtonElement>('.menu-play') ?? []);

  const startSelectedGame = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const button = event.currentTarget as HTMLButtonElement | null;
    const gameId = button?.dataset.gameId as GameMenuItem['id'] | undefined;
    if (!menu?.isConnected || !gameId) return;

    menu.remove();
    app.className = '';

    // The library is a separate layer from Phaser. Wait for the browser's
    // pointer/click gesture to finish before starting the selected game's intro.
    window.setTimeout(() => onPlay(gameId), 120);
  };

  for (const button of playButtons) {
    button.addEventListener('click', startSelectedGame, { once: true });
    button.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
    button.addEventListener('pointerup', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  }
}
