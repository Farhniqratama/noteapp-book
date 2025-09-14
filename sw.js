// sw.js (InjectManifest compatible)
import { precacheAndRoute } from 'workbox-precaching'

// Precaching daftar aset yang di-inject saat build
precacheAndRoute(self.__WB_MANIFEST)

const VERSION = 'v3'
const CACHE_APP_SHELL = `app-shell-${VERSION}`

const APP_SHELL = [
  './',
  './index.html',
  './offline.html', // ⬅️ perbaikan: hilangkan "public/"
]

// Install: cache app shell
self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE_APP_SHELL)
    await cache.addAll(APP_SHELL)
    self.skipWaiting()
  })())
})

// Activate: bersihkan cache lama
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys()
    await Promise.all(
      keys
        .filter((k) => k !== CACHE_APP_SHELL)
        .map((k) => caches.delete(k))
    )
    self.clients.claim()
  })())
})

// Fetch: navigasi → fallback offline; runtime caching untuk API/asset/gambar
self.addEventListener('fetch', (e) => {
  const req = e.request
  const url = new URL(req.url)

  // Fallback untuk navigasi halaman
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        return await fetch(req)
      } catch {
        const cache = await caches.open(CACHE_APP_SHELL)
        return cache.match('./offline.html') // ⬅️ perbaikan: hilangkan "public/"
      }
    })())
    return
  }

  // Cache-first untuk ikon manifest (opsional, bantu installability stabil)
  if (req.destination === 'image' && url.pathname.startsWith('/icons/')) {
    e.respondWith((async () => {
      const cache = await caches.open('img-cache')
      const hit = await cache.match(req)
      if (hit) return hit
      const res = await fetch(req)
      cache.put(req, res.clone())
      return res
    })())
    return
  }

  // Network-first untuk API (contoh: story-api.dicoding.dev)
  if (url.hostname.includes('story-api.dicoding.dev')) {
    e.respondWith((async () => {
      const cache = await caches.open('api-cache')
      try {
        const fresh = await fetch(req)
        cache.put(req, fresh.clone())
        return fresh
      } catch {
        return (
          (await cache.match(req)) ||
          new Response(JSON.stringify({ error: true, message: 'Offline' }), {
            headers: { 'Content-Type': 'application/json' },
          })
        )
      }
    })())
    return
  }

  // Stale-while-revalidate untuk script & style
  if (req.destination === 'script' || req.destination === 'style') {
    e.respondWith((async () => {
      const cache = await caches.open('asset-cache')
      const cached = await cache.match(req)
      const fetching = fetch(req)
        .then((r) => {
          cache.put(req, r.clone())
          return r
        })
        .catch(() => cached)
      return cached || fetching
    })())
    return
  }

  // Cache-first untuk image umum
  if (req.destination === 'image') {
    e.respondWith((async () => {
      const cache = await caches.open('img-cache')
      const hit = await cache.match(req)
      if (hit) return hit
      const res = await fetch(req)
      cache.put(req, res.clone())
      return res
    })())
    return
  }
})

// Push notification (dinamis + action buka halaman)
self.addEventListener('push', (event) => {
  let data = {}
  try {
    data = event.data?.json() || {}
  } catch {
    data = { body: event.data?.text() }
  }

  const title = data.title || 'Notifikasi'
  const options = {
    body: data.body || 'Anda menerima notifikasi baru.',
    icon: data.icon || 'icons/icon-192.png',
    badge: data.badge || 'icons/icon-192.png',
    image: data.image,
    data: { url: data.url || './#/' },
    actions: data.actions || [{ action: 'open', title: 'Buka' }],
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification?.data?.url || './#/'
  event.waitUntil(self.clients.openWindow(url))
})