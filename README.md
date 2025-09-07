# Proyek Kedua — PWA SPA (Dicoding)

Aplikasi SPA berbasis PWA dengan Application Shell, Push Notification, IndexedDB, kamera capture, dan peta. Menggunakan arsitektur MVP.

## Fitur Inti
- SPA (hash routing), transisi halus (View Transition API)
- Aksesibilitas (skip link, alt, label yang semantik)
- PWA: installable, offline-first (App Shell + runtime caching)
- Push Notification (Web Push, VAPID)
- IndexedDB (simpan/tampil/hapus data)
- Tambah data dengan kamera dan lokasi dari peta
- Deploy publik (GitHub Pages / Netlify / Firebase Hosting)

## Pengembangan
```bash
npm i
npm run dev
```

## Build & Preview
```bash
npm run build
npm run preview
```

## Deploy
- **GitHub Pages**: build → upload `dist/` ke branch `gh-pages` atau gunakan action.
- **Netlify**: deploy direktori `dist/`.
- **Firebase Hosting**: `firebase init hosting` → deploy `dist/`.

Lihat `STUDENT.txt` untuk URL deploy & kunci API yang digunakan.
