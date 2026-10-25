import { markInstallSurfaceReady } from './pwa';

const directions = [
  { title:'Food & Market', description:'Discover familiar foods, produce, and everyday shopping moments through short, playful activities.', status:'ASSETS UNDER REVIEW', category:'FOOD · DISCOVERY' },
  { title:'Family Fun', description:'Quick challenges designed for siblings, caregivers, and friends to share a laugh or learn something together.', status:'CONCEPT UNDER REVIEW', category:'TOGETHER · PLAY' },
  { title:'Racing & Driving', description:'A future driving experience informed by the proven handling and collision work in Vula’s Car Wash—not a copy of its branding.', status:'MECHANICS UNDER REVIEW', category:'SKILL · MOVEMENT' },
];

export function renderCatalog() {
  const app=document.getElementById('app');
  if(!app) return;
  app.className='ahg-catalog';
  app.querySelector('.game-menu')?.remove();
  app.insertAdjacentHTML('beforeend', `
    <main class="game-menu" aria-labelledby="game-menu-title">
      <header class="game-menu-header">
        <a class="brand" href="/" aria-label="Choppies Play & Discover home">
          <span class="brand-mark" aria-hidden="true">C</span>
          <span class="brand-wordmark">CHOPPIES <b>PLAY & DISCOVER</b></span>
        </a>
        <span class="menu-label">A LITTLE FUN FOR EVERYONE</span>
      </header>
      <section class="game-menu-main">
        <div class="menu-intro">
          <p class="eyebrow">PLAY · DISCOVER · SHARE</p>
          <h1 id="game-menu-title">Welcome to your<br>playground.</h1>
          <p>A playful digital destination for Choppies shoppers and families in Botswana. We’re shaping the first collection around real assets, proven mechanics, and quick moments of fun.</p>
        </div>
        <section class="experience-section" aria-labelledby="discover-title">
          <div class="section-heading">
            <h2 id="discover-title">Choose what you’d like to discover.</h2>
            <p>The first activities are being selected. Nothing below is presented as playable until its artwork, controls, and core loop have been inspected and verified.</p>
          </div>
          <div class="future-grid">
            ${directions.map((item) => `
              <article class="future-card">
                <p class="future-category">${item.category}</p>
                <div class="menu-card-meta"><span>${item.status}</span></div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
              </article>
            `).join('')}
          </div>
        </section>
      </section>
      <footer class="game-menu-footer">
        <span>CHOPPIES PLAY & DISCOVER</span>
        <span>ACTIVITIES WILL OPEN HERE AS THEY ARE VERIFIED</span>
      </footer>
    </main>
  `);
  markInstallSurfaceReady();
}
