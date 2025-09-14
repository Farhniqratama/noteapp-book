// src/utils/notifications.js
import { SessionModel } from '../models/sessionModel.js'
const urlBase64ToUint8Array = s => { const p='='.repeat((4 - s.length % 4) % 4); const b=(s+p).replace(/-/g,'+').replace(/_/g,'/'); const r=atob(b); const a=new Uint8Array(r.length); for (let i=0;i<r.length;i++) a[i]=r.charCodeAt(i); return a }

// GANTI sesuai dokumentasi API kamu:
const API_BASE = 'https://your-api.example.com'  // mis. CityCare API base
const VAPID_PUBLIC_KEY = '----VAPID_PUBLIC_KEY_DARI_API----' // ambil dari API kamu

export async function ensurePushPermission(){
  if (!('Notification' in window)) throw new Error('Browser tidak mendukung Notification')
  const perm = await Notification.requestPermission()
  if (perm !== 'granted') throw new Error('Izin notifikasi ditolak')

  const reg = await navigator.serviceWorker.ready
  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  })

  await sendSubscriptionToServer(sub)
  return sub
}

async function sendSubscriptionToServer(subscription){
  const token = SessionModel.getToken()
  const res = await fetch(`${API_BASE}/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(subscription),
  })
  if (!res.ok) throw new Error('Gagal mendaftarkan subscription ke server')
}