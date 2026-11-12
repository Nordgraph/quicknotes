// Кэш оболочки приложения: открывается и без сети. Данные идут мимо кэша.
const VER = 'qn-6';
const SHELL = ['./', 'index.html', 'style.css?v=6', 'app.js?v=6', 'manifest.webmanifest', 'icon-192.png', 'favicon.png',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js',
  'https://cdn.jsdelivr.net/npm/sortablejs@1.15.2/Sortable.min.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VER).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VER).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.hostname.endsWith('supabase.co')) return;
  // своё — сначала сеть (чтобы обновления доезжали), без сети — из кэша; арты и CDN — из кэша
  const cacheFirst = url.pathname.includes('/art/') || url.hostname !== location.hostname;
  if (cacheFirst) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(VER).then(c => c.put(e.request, copy));
      return res;
    })));
  } else {
    // no-cache: браузер каждый раз сверяется с сайтом, обновления видны сразу
    e.respondWith(fetch(url.href, { cache: 'no-cache' }).then(res => {
      const copy = res.clone();
      caches.open(VER).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true })));
  }
});
