import { markInstallSurfaceReady } from './pwa';

const FARM_PROFILE_KEY = 'choppies-play-discover:farm-profile-v1';

const directions = [
  {
    id: 'fruit-match',
    title: 'Fruit Match & Sorting',
    category: 'ORCHARD · PUZZLES',
    description: 'Harvest fruit, sort by type and colour, and solve quick matching challenges.',
    status: 'PLANNED · NOT PLAYABLE',
  },
  {
    id: 'splatter',
    title: 'Splatter Farm Defence',
    category: 'PASTURE · DODGE & THROW',
    description: 'Protect crops and feed from cartoon coyotes with playful produce projectiles.',
    status: 'PLANNED · NOT PLAYABLE',
  },
  {
    id: 'cart-racing',
    title: 'Shopping Cart Racing',
    category: 'OUTBACK TRACK · TIME TRIALS',
    description: 'Race the dirt track, beat personal bests and celebrate every finish.',
    status: 'PLANNED · NOT PLAYABLE',
  },
  {
    id: 'pumpkin',
    title: 'Biggest Pumpkin',
    category: 'CROPS · COMPETITION',
    description: 'Grow, tend and harvest a pumpkin, then compare your own farm records.',
    status: 'PLANNED · NOT PLAYABLE',
  },
  {
    id: 'cookhouse',
    title: 'Cookhouse Challenge',
    category: 'KITCHEN · COOKING',
    description: 'Turn farm ingredients into dishes through timing, selection and sequence challenges.',
    status: 'PLANNED · NOT PLAYABLE',
  },
];

type FarmProfile = { farmName: string; createdAt: number; updatedAt?: number };

function readFarmProfile(): FarmProfile | null {
  try {
    const value = JSON.parse(localStorage.getItem(FARM_PROFILE_KEY) || 'null') as Partial<FarmProfile> | null;
    if (!value || typeof value.farmName !== 'string' || !value.farmName.trim()) return null;
    return { farmName: value.farmName.trim().slice(0, 24), createdAt: Number(value.createdAt) || Date.now(), updatedAt: value.updatedAt };
  } catch {
    return null;
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] || char);
}

export function renderCatalog() {
  const app = document.getElementById('app');
  if (!app) return;
  app.className = 'ahg-catalog';
  app.querySelector('.game-menu')?.remove();
  app.insertAdjacentHTML('beforeend', `
    <main class="game-menu" aria-labelledby="game-menu-title">
      <a class="skip-link" href="#discover-activities">Skip to the activity menu</a>
      <header class="game-menu-header">
        <a class="brand" href="/" aria-label="Choppies Play & Discover home">
          <span class="brand-mark" aria-hidden="true">C</span>
          <span class="brand-wordmark"><span>CHOPPIES</span><b>PLAY & DISCOVER</b></span>
        </a>
        <nav class="menu-nav" aria-label="Main menu">
          <a href="#discover-activities">Discover</a>
          <a href="#family-first">Our approach</a>
        </nav>
        <span class="menu-label">A LITTLE FUN FOR EVERYONE</span>
      </header>

      <section class="menu-hero" aria-labelledby="game-menu-title">
        <div class="menu-hero-copy">
          <p class="eyebrow">A DIGITAL PLAYGROUND FOR EVERYDAY MOMENTS</p>
          <h1 id="game-menu-title">Everyday shopping.<br><span>A little more playful.</span></h1>
          <p class="hero-description">Welcome to Choppies Play & Discover: a growing collection of little digital adventures for shoppers, families and friends in Botswana.</p>
          <div class="menu-hero-actions menu-hero-actions--paths">
            <button class="menu-cta" type="button" data-enter-farm>Enter the farm <span aria-hidden="true">→</span></button>
            <a class="menu-cta menu-cta--secondary" href="#discover-activities" data-scroll-to-activities>Discover mini-games <span aria-hidden="true">↓</span></a>
          </div>
          <p class="hero-microcopy">Explore the farm first, or browse the activities planned for the world.</p>
        </div>
        <aside class="hero-note" aria-label="What this experience is designed for">
          <p class="hero-note-kicker">MADE FOR REAL MOMENTS</p>
          <h2>A quick bit of fun, on your phone.</h2>
          <ul>
            <li>Easy to understand</li>
            <li>Designed for touch screens</li>
            <li>Family-friendly by default</li>
          </ul>
          <p class="hero-note-foot">No account is needed just to explore this menu.</p>
        </aside>
      </section>

      <section class="farm-flow-section" id="farm-flow-section" aria-labelledby="farm-flow-heading" hidden>
        <div class="farm-flow" id="farm-flow" aria-live="polite"></div>
      </section>

      <section class="experience-section" id="discover-activities" aria-labelledby="discover-title">
        <div class="section-heading">
          <p class="eyebrow">THE DISCOVERY MENU</p>
          <h2 id="discover-title">What would you like to explore?</h2>
          <p>The farm is the flagship. These mini-games will connect to places in its world and can also be opened directly when they become playable. Planned activities are listed for discovery, not as fake launch buttons.</p>
        </div>
        <div class="future-grid">
          ${directions.map((item, index) => `
            <article class="future-card" aria-labelledby="activity-${item.id}">
              <div class="future-card-top"><span class="future-number">0${index + 1}</span><span class="future-status">${item.status}</span></div>
              <p class="future-category">${item.category}</p>
              <h3 id="activity-${item.id}">${item.title}</h3>
              <p>${item.description}</p>
            </article>
          `).join('')}
        </div>
      </section>

      <section class="family-first" id="family-first" aria-labelledby="family-first-title">
        <div><p class="eyebrow">OUR APPROACH</p><h2 id="family-first-title">Made for people, not endless screen time.</h2></div>
        <p>We’re aiming for short, satisfying play, clear choices, a sense of achievement and safe ways for families to enjoy an activity together. No pressure to keep a streak, buy an upgrade or share personal details just to have fun.</p>
      </section>
      <footer class="game-menu-footer">
        <span>CHOPPIES PLAY & DISCOVER</span>
        <span>A GROWING COLLECTION · BUILT FOR MOBILE</span>
      </footer>
    </main>
  `);
  const explore = app.querySelector<HTMLAnchorElement>('[data-scroll-to-activities]');
  explore?.addEventListener('click', (event) => {
    event.preventDefault();
    app.querySelector('#discover-activities')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  });

  const flowSection = app.querySelector<HTMLElement>('#farm-flow-section');
  const flow = app.querySelector<HTMLElement>('#farm-flow');
  const scrollToFlow = () => flowSection?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'start',
  });
  const showChoice = () => {
    if (!flowSection || !flow) return;
    const profile = readFarmProfile();
    flowSection.hidden = false;
    flow.innerHTML = `
      <p class="eyebrow">THE FLAGSHIP WORLD</p>
      <h2 id="farm-flow-heading">${profile ? 'Welcome back to the farm.' : 'Your farm adventure starts here.'}</h2>
      <p class="farm-flow-copy">${profile ? `Your saved farm, <strong>${escapeHtml(profile.farmName)}</strong>, is on this device.` : 'Start a new farm, give it a name, and explore the first walkable farm preview.'}</p>
      <div class="farm-flow-actions">
        <button class="menu-cta" type="button" data-farm-action="new">New game <span aria-hidden="true">→</span></button>
        ${profile ? '<button class="menu-cta menu-cta--secondary" type="button" data-farm-action="continue">Continue saved game <span aria-hidden="true">↗</span></button>' : ''}
        <button class="farm-back" type="button" data-farm-action="back">Back to discovery menu</button>
      </div>
    `;
    scrollToFlow();
  };
  const showNewFarm = () => {
    if (!flowSection || !flow) return;
    flowSection.hidden = false;
    flow.innerHTML = `
      <p class="eyebrow">A PLACE OF YOUR OWN</p>
      <h2 id="farm-flow-heading">What will you call your farm?</h2>
      <p class="farm-flow-copy">Choose a farm nickname, not your real name. Your preview progress is stored on this device.</p>
      <form class="farm-name-form" id="farm-name-form">
        <label for="farm-name-input">Farm name</label>
        <input id="farm-name-input" name="farmName" type="text" maxlength="24" required autocomplete="off" placeholder="e.g. Sunshine Acres" />
        <div class="farm-flow-actions">
          <button class="menu-cta" type="submit">Continue <span aria-hidden="true">→</span></button>
          <button class="farm-back" type="button" data-farm-action="choice">Back</button>
        </div>
      </form>
    `;
    scrollToFlow();
    flow.querySelector<HTMLInputElement>('#farm-name-input')?.focus({ preventScroll: true });
  };
  const showFarmIntro = (profile: FarmProfile) => {
    if (!flowSection || !flow) return;
    flowSection.hidden = false;
    flow.innerHTML = `
      <p class="eyebrow">CHOPPIES FARM · FIRST WALKABLE PREVIEW</p>
      <h2 id="farm-flow-heading">Welcome to ${escapeHtml(profile.farmName)}.</h2>
      <p class="farm-flow-copy">This is the first farm playtest, not the finished open world. Walk around the current pasture, guide sheep and goats toward the safe pen, care for your dog and try the wildlife-tracking task.</p>
      <div class="farm-preview-guide">
        <div><strong>MOVE</strong><span>Use the on-screen movement pad or tap the ground.</span></div>
        <div><strong>EXPLORE</strong><span>Look around the pasture, barn, water and feed points.</span></div>
        <div><strong>TRY</strong><span>Use HERD and HUNT to test the current interactions.</span></div>
      </div>
      <p class="farm-flow-copy farm-flow-note">Crops, orchard puzzles, Splatter, cooking and cart racing are still being built. Your feedback will help shape what comes next.</p>
      <div class="farm-flow-actions">
        <button class="menu-cta" type="button" data-farm-action="start">Start exploring <span aria-hidden="true">→</span></button>
        <button class="farm-back" type="button" data-farm-action="choice">Back</button>
      </div>
    `;
    scrollToFlow();
  };
  const launchFarm = () => {
    const profile = readFarmProfile();
    if (!profile) {
      showNewFarm();
      return;
    }
    const game = (window as Window & { __AHG_GAME__?: { scene?: { start: (key: string) => void } } }).__AHG_GAME__;
    if (!game?.scene?.start) {
      if (flow) flow.insertAdjacentHTML('beforeend', '<p role="alert" class="farm-flow-error">The farm could not start. Please reload and try again.</p>');
      return;
    }
    flowSection?.remove();
    app.querySelector('.game-menu')?.remove();
    game.scene.start('LivingWorldGameScene');
  };

  app.querySelector<HTMLButtonElement>('[data-enter-farm]')?.addEventListener('click', showChoice);
  flow?.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target.closest<HTMLButtonElement>('[data-farm-action]') : null;
    if (!target) return;
    const action = target.dataset.farmAction;
    if (action === 'new') showNewFarm();
    else if (action === 'continue') {
      const profile = readFarmProfile();
      if (profile) showFarmIntro(profile);
      else showNewFarm();
    } else if (action === 'back') {
      flowSection?.setAttribute('hidden', '');
      app.querySelector('#discover-activities')?.scrollIntoView({ behavior: 'auto', block: 'start' });
    } else if (action === 'choice') showChoice();
    else if (action === 'start') launchFarm();
  });
  flow?.addEventListener('submit', (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || form.id !== 'farm-name-form') return;
    event.preventDefault();
    const input = form.elements.namedItem('farmName');
    if (!(input instanceof HTMLInputElement)) return;
    const farmName = input.value.trim().replace(/\s+/g, ' ').slice(0, 24);
    if (!farmName) {
      input.focus();
      return;
    }
    const profile: FarmProfile = { farmName, createdAt: Date.now(), updatedAt: Date.now() };
    try {
      // Starting a genuinely new farm must not inherit an old prototype dog's saved needs.
      localStorage.removeItem('admin-hub-games:paws-world-v1');
      localStorage.setItem(FARM_PROFILE_KEY, JSON.stringify(profile));
    } catch {
      if (flow) flow.insertAdjacentHTML('beforeend', '<p role="alert" class="farm-flow-error">This browser could not save the farm name. You can still retry after checking device storage settings.</p>');
      return;
    }
    showFarmIntro(profile);
  });
  markInstallSurfaceReady();
}
