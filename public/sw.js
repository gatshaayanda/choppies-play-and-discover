// Bump this cache version for each production app release so installed PWAs detect a new worker.
const CACHE_NAME = 'choppies-play-discover-v2';
const CORE_ASSETS = ['/', '/manifest.webmanifest', '/favicon.svg', '/icons/icon-192.svg', '/icons/icon-512.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => (key.startsWith('admin-hub-games-') || key.startsWith('choppies-play-discover-')) && key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then((response) => { if (response.ok) { const copy = response.clone(); void caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)); } return response; }).catch(() => caches.match(request).then((cached) => cached || caches.match('/'))));
    return;
  }
  const destination = request.destination;
  const pathname = new URL(request.url).pathname;
  const assetExtension = /\.(glb|gltf|bin|ktx2|basis|webp|png|jpe?g|svg|woff2?|json|webmanifest)$/i.test(pathname);
  const cacheable = destination === 'script' || destination === 'style' || destination === 'image' || destination === 'font' || destination === 'audio' || assetExtension;
  if (!cacheable) return;
  event.respondWith(caches.match(request).then((cached) => cached || fetch(request).then((response) => { if (response.ok) { const copy = response.clone(); void caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)); } return response; })));
});
