// src/utils/notifications.js
const VAPID_PUBLIC_KEY = 'ISI_VAPID_PUBLIC_KEY_ANDA_DI_SINI' // ganti

export async function ensurePushPermission(){
  if (!('serviceWorker' in navigator)) throw new Error('SW tidak didukung')
  const reg = await navigator.serviceWorker.ready
  const perm = await Notification.requestPermission()
  if (perm !== 'granted') throw new Error('Izin notifikasi ditolak')

  // web push subscription
  const sub = await reg.pushManager.getSubscription()
  if (sub) return sub
  const converted = urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
  return reg.pushManager.subscribe({ userVisibleOnly:true, applicationServerKey: converted })
}

function urlBase64ToUint8Array(base64String){
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64  = (base64String + padding).replace(/-/g,'+').replace(/_/g,'/')
  const rawData = atob(base64); const outputArray = new Uint8Array(rawData.length)
  for (let i=0;i<rawData.length;i++) outputArray[i] = rawData.charCodeAt(i)
  return outputArray
}