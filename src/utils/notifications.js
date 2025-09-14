// src/utils/notifications.js
import { SessionModel } from '../models/sessionModel.js'

const urlBase64ToUint8Array = (s) => {
  const p = '='.repeat((4 - (s.length % 4)) % 4)
  const b = (s + p).replace(/-/g, '+').replace(/_/g, '/')
  const r = atob(b)
  const a = new Uint8Array(r.length)
  for (let i = 0; i < r.length; i++) a[i] = r.charCodeAt(i)
  return a
}

// Sesuai dokumentasi Dicoding Story API
const API_BASE = 'https://story-api.dicoding.dev/v1'
const VAPID_PUBLIC_KEY = 'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk'

export async function ensurePushPermission () {
  if (!('Notification' in window)) throw new Error('Browser tidak mendukung Notification')
  if (!('serviceWorker' in navigator)) throw new Error('Service Worker tidak didukung')

  const perm = await Notification.requestPermission()
  if (perm !== 'granted') throw new Error('Izin notifikasi ditolak')

  const reg = await navigator.serviceWorker.ready

  // Hindari duplicate subscription
  let sub = await reg.pushManager.getSubscription()
  if (!sub) {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    })
  }

  await sendSubscriptionToServer(sub)
  return sub
}

export async function unsubscribePush () {
  const reg = await navigator.serviceWorker.ready
  const sub = await reg.pushManager.getSubscription()
  if (!sub) return false

  const token = SessionModel.getToken()
  const { endpoint } = sub.toJSON()

  const res = await fetch(`${API_BASE}/notifications/subscribe`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ endpoint }),
  })

  if (!res.ok) throw new Error('Gagal unsubscribe di server')
  await sub.unsubscribe()
  return true
}

async function sendSubscriptionToServer (subscription) {
  const token = SessionModel.getToken()
  if (!token) throw new Error('Token login tidak ditemukan')

  // Ambil field yang diminta server
  const { endpoint, keys } = subscription.toJSON()
  const res = await fetch(`${API_BASE}/notifications/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ endpoint, keys }),
  })

  if (!res.ok) {
    let msg = 'Gagal mendaftarkan subscription ke server'
    try {
      const j = await res.json()
      if (j?.message) msg = j.message
    } catch {}
    throw new Error(msg)
  }
}