import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/noteapp-book/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: '.',
      filename: 'sw.js',
      devOptions: { enabled: true },
      includeAssets: ['favicon.png', 'public/offline.html', 'public/icons/icon-192.png', 'public/icons/icon-512.png'],
      manifest: {
        name: 'Proyek Kedua — PWA SPA',
        short_name: 'PWA SPA',
        start_url: '/noteapp-book/',
        scope: '/noteapp-book/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0f172a',
        icons: [
          { src: 'public/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'public/icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
})