type BeforeInstallPromptEventLike = Event & {
  prompt: () => Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

let deferredInstallPrompt: BeforeInstallPromptEventLike | undefined;
let registration: ServiceWorkerRegistration | undefined;
let installSurfaceReady = false;

const dispatchPwaEvent = (name: string, detail?: Record<string, unknown>) => {
  window.dispatchEvent(new CustomEvent(name, { detail }));
};

function removePwaNotice(id: string) {
  document.getElementById(id)?.remove();
}

function showUpdateNotice(waiting: ServiceWorker) {
  if (document.getElementById('ahg-pwa-update')) return;

  const notice = document.createElement('div');
  notice.id = 'ahg-pwa-update';
  notice.className = 'ahg-pwa-notice';
  notice.innerHTML = '<span>NEW VERSION READY</span><button type="button">RELOAD</button>';

  const button = notice.querySelector('button');
  button?.addEventListener('click', () => {
    waiting.postMessage({ type: 'SKIP_WAITING' });
    button.disabled = true;
    button.textContent = 'LOADING…';
  }, { once: true });

  document.body.append(notice);
}

export function showInstallNotice() {
  if (!deferredInstallPrompt || document.getElementById('ahg-pwa-install')) return;

  const notice = document.createElement('div');
  notice.id = 'ahg-pwa-install';
  notice.className = 'ahg-pwa-notice ahg-pwa-install';
  document.getElementById('ahg-pwa-reopen')?.remove();
  notice.innerHTML = '<div class="ahg-pwa-brand"><span class="ahg-pwa-mark" aria-hidden="true">C</span><span class="ahg-pwa-brand-copy"><strong>CHOPPIES</strong><small>PLAY & DISCOVER</small></span></div><button type="button" class="ahg-pwa-install-action">INSTALL APP ↗</button><button type="button" class="ahg-pwa-close" aria-label="Dismiss install prompt">×</button>';

  const buttons = notice.querySelectorAll('button');
  buttons[0]?.addEventListener('click', async () => {
    const prompt = deferredInstallPrompt;
    deferredInstallPrompt = undefined;
    notice.remove();
    document.getElementById('ahg-pwa-reopen')?.remove();
    if (!prompt) return;
    try { await prompt.prompt(); } catch { /* browser may reject a stale prompt */ }
  }, { once: true });

  buttons[1]?.addEventListener('click', () => {
    notice.remove();
    if (!deferredInstallPrompt || document.getElementById('ahg-pwa-reopen')) return;
    const reopen = document.createElement('button');
    reopen.id = 'ahg-pwa-reopen';
    reopen.className = 'ahg-pwa-reopen';
    reopen.type = 'button';
    reopen.textContent = 'INSTALL CHOPPIES';
    reopen.addEventListener('click', showInstallNotice, { once: true });
    document.body.append(reopen);
  }, { once: true });
  document.body.append(notice);
}

function wireServiceWorkerUpdate(reg: ServiceWorkerRegistration) {
  registration = reg;

  if (reg.waiting) showUpdateNotice(reg.waiting);

  reg.addEventListener('updatefound', () => {
    const worker = reg.installing;
    if (!worker) return;

    worker.addEventListener('statechange', () => {
      if (worker.state === 'installed' && navigator.serviceWorker.controller) {
        showUpdateNotice(worker);
        dispatchPwaEvent('admin-hub-games:pwa-update-ready');
      }
    });
  });
}

async function registerServiceWorker() {
  try {
    registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    wireServiceWorkerUpdate(registration);
    await registration.update().catch(() => undefined);
  } catch {
    dispatchPwaEvent('admin-hub-games:pwa-unavailable');
  }
}

async function requestPersistentStorage() {
  const storage = navigator.storage;
  if (!storage) return;

  try {
    const persistent = storage.persisted ? await storage.persisted() : false;
    if (!persistent && storage.persist) await storage.persist();
  } catch {
    // Persistence is an enhancement. IndexedDB and Cache Storage still work best-effort.
  }

  try {
    const estimate = storage.estimate ? await storage.estimate() : undefined;
    dispatchPwaEvent('admin-hub-games:pwa-storage', {
      persisted: storage.persisted ? await storage.persisted() : false,
      usage: estimate?.usage ?? 0,
      quota: estimate?.quota ?? 0,
    });
  } catch {
    // Storage diagnostics are deliberately non-blocking.
  }
}

export function markInstallSurfaceReady() {
  installSurfaceReady = true;
  showInstallNotice();
}

export function isInstallPromptAvailable() {
  return Boolean(deferredInstallPrompt);
}

export async function promptInstall() {
  const prompt = deferredInstallPrompt;
  if (!prompt) return false;

  deferredInstallPrompt = undefined;
  try {
    const result = await prompt.prompt();
    return result.outcome === 'accepted';
  } catch {
    return false;
  }
}

function showPlatformInstallGuidance() {
  if (window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone) return;
  const ua = navigator.userAgent;
  const iosSafari = /iPhone|iPad|iPod/i.test(ua) && /Safari/i.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua);
  const embedded = /FBAN|FBAV|Instagram|TikTok|Line\/|; wv\)/i.test(ua);
  if (!embedded && !iosSafari) return;
  const id = embedded ? 'ahg-pwa-browser-guide' : 'ahg-pwa-ios-guide';
  if (document.getElementById(id)) return;
  const guide = document.createElement('aside');
  guide.id = id;
  guide.className = 'ahg-pwa-platform-guide';
  guide.innerHTML = embedded
    ? '<strong>OPEN CHOPPIES IN YOUR BROWSER</strong><p>Use this app’s menu and choose “Open in browser” to install Choppies Play & Discover.</p><button type="button" aria-label="Dismiss browser guidance">×</button>'
    : '<strong>ADD CHOPPIES TO YOUR HOME SCREEN</strong><p>In Safari, tap Share ↑, then choose “Add to Home Screen”.</p><button type="button" aria-label="Dismiss install guidance">×</button>';
  guide.querySelector('button')?.addEventListener('click', () => guide.remove(), { once: true });
  document.body.append(guide);
}

export function registerPwa() {
  showPlatformInstallGuidance();
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event as BeforeInstallPromptEventLike;
    dispatchPwaEvent('admin-hub-games:pwa-install-available');
    showInstallNotice();
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = undefined;
    removePwaNotice('ahg-pwa-install');
    dispatchPwaEvent('admin-hub-games:pwa-installed');
  });

  window.addEventListener('online', () => dispatchPwaEvent('admin-hub-games:connectivity', { online: true }));
  window.addEventListener('offline', () => dispatchPwaEvent('admin-hub-games:connectivity', { online: false }));

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (document.getElementById('ahg-pwa-update')) window.location.reload();
  });

  void requestPersistentStorage();

  void registerServiceWorker();

  if (navigator.serviceWorker.controller) {
    void navigator.serviceWorker.ready.then(wireServiceWorkerUpdate);
  }

  void registration;
}
