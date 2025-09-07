// Pastikan permission & (opsional) subscription push
export async function ensurePushPermission(){
  if (!('Notification' in window)) throw new Error('Browser tidak mendukung Notification')
  const perm = await Notification.requestPermission()
  if (perm !== 'granted') throw new Error('Izin notifikasi ditolak')

  // opsional: buat subscription web-push (kalau punya VAPID public key)
  // const reg = await navigator.serviceWorker.ready
  // await reg.pushManager.subscribe({
  //   userVisibleOnly: true,
  //   applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY)
  // })
}