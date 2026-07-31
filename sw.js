const CACHE = 'rechnungslauf-v7';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

// App-Shell (index.html, manifest, icon) + Navigationen: NETWORK-FIRST.
// So bekommt der Nutzer online immer die neueste Version; nur wenn das Netz
// fehlt, wird die zuletzt gecachte Fassung geliefert (Offline-Fähigkeit bleibt).
// Alles andere (z. B. Tesseract-/jsPDF-CDN): stale-while-revalidate.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const isShell = req.mode === 'navigate' || SHELL.some(s => req.url.endsWith(s.replace('./', '')));

  if (isShell) {
    e.respondWith(
      caches.open(CACHE).then(async (cache) => {
        try {
          const res = await fetch(req);
          if (res && res.status === 200) cache.put(req, res.clone());
          return res;
        } catch (err) {
          const cached = await cache.match(req);
          return cached || cache.match('./index.html');
        }
      })
    );
    return;
  }

  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req);
      const network = fetch(req).then(res => {
        if (res && res.status === 200) cache.put(req, res.clone());
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
