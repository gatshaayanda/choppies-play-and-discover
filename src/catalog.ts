import { markInstallSurfaceReady } from './pwa';

const directions = [
  {
    id: 'food-market',
    title: 'Food & Market',
    category: 'EVERYDAY DISCOVERY',
    description: 'Small, satisfying challenges inspired by the foods, colours and everyday choices people recognise from a market visit.',
    status: 'ARTWORK UNDER REVIEW',
  },
  {
    id: 'family-fun',
    title: 'Play Together',
    category: 'FAMILY · FRIENDS · FUN',
    description: 'Easy-to-understand moments designed for siblings, caregivers and friends to share a laugh or take turns.',
    status: 'ACTIVITY DESIGN UNDER REVIEW',
  },
  {
    id: 'move-race',
    title: 'Move & Race',
    category: 'SKILL · MOVEMENT',
    description: 'A possible driving experience informed by Vula’s proven handling and collision work, with its own art and identity.',
    status: 'VEHICLE ART UNDER REVIEW',
  },
];

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
          <div class="menu-hero-actions">
            <a class="menu-cta" href="#discover-activities" data-scroll-to-activities>Explore the menu <span aria-hidden="true">↓</span></a>
            <span class="hero-microcopy">Browse first. Pick an activity when it’s ready.</span>
          </div>
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

      <section class="experience-section" id="discover-activities" aria-labelledby="discover-title">
        <div class="section-heading">
          <p class="eyebrow">THE DISCOVERY MENU</p>
          <h2 id="discover-title">What would you like to explore?</h2>
          <p>We’re checking the real artwork, licences, controls and performance before calling anything playable. These are directions for the collection—not games you can launch yet.</p>
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
  markInstallSurfaceReady();
}
