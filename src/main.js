import { navigate } from './router.js'
import * as a11y from './utils/a11y.js'
import { registerSW } from './sw-register.js'
import { ensurePushPermission } from './utils/notifications.js'
import { stopCamera } from './utils/camera.js'
import { getToken, clearToken } from './models/storyApi.js'

// Default ke halaman list saat reload/kunjungan pertama
if (!location.hash || location.hash === '#') {
  location.replace('#/')
}

let deferredPrompt
const installBtn = document.getElementById('installBtn')
const pushBtn    = document.getElementById('enablePushBtn')
const loginLink  = document.getElementById('loginLink')
const logoutBtn  = document.getElementById('logoutBtn')

function refreshAuthUI(){
  const hasToken = !!getToken()
  if (loginLink) loginLink.hidden = hasToken
  if (logoutBtn) logoutBtn.hidden = !hasToken
}
refreshAuthUI()

logoutBtn?.addEventListener('click', ()=>{
  clearToken()
  // kalau kamu simpan nama user di model, panggil clearName() di sana
  localStorage.removeItem('userName')
  refreshAuthUI()
  location.hash = '#/'
})

/* Install (PWA) */
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  deferredPrompt = e
  installBtn.hidden = false
})
installBtn?.addEventListener('click', async () => {
  installBtn.hidden = true
  deferredPrompt?.prompt()
  await deferredPrompt?.userChoice
  deferredPrompt = null
})

/* Push Permission button */
pushBtn?.addEventListener('click', async () => {
  try {
    await ensurePushPermission()
    alert('Notifikasi diaktifkan!')
  } catch (e) {
    console.error(e)
    alert('Gagal mengaktifkan notifikasi')
  }
})

/* Routing & a11y */
window.addEventListener('hashchange', () => {
  // ketika fokus ke #main dari skip link, jangan render route baru
  if (location.hash === '#main') return
  stopCamera()
  render()
})

window.addEventListener('load', async () => {
  a11y.setupSkipLink?.()
  await registerSW()

  // tampilkan tombol push jika lingkungan mendukung
  try {
    await navigator.serviceWorker.ready
    const hasPush = 'PushManager' in window && 'Notification' in window
    const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
    const isStandalone = window.matchMedia?.('(display-mode: standalone)')?.matches
                      || window.navigator.standalone === true
    if (hasPush && (!isiOS || isStandalone)) {
      pushBtn.hidden = false
    }
  } catch {}

  refreshAuthUI()
  await render()
})

async function render(){
  const View = await navigate()
  const root = document.getElementById('main')
  root.innerHTML = ''
  const view = new View()
  await view.render(root)
  a11y.moveFocusToMain?.()
}