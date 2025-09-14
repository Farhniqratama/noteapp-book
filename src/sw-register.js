// src/sw-register.js
export async function registerSW(){
  if (!('serviceWorker' in navigator)) return
  try{
    const { registerSW } = await import('virtual:pwa-register')
    registerSW({ immediate: true })
  }catch{
    const swPath = `${import.meta.env.BASE_URL}sw.js`
    await navigator.serviceWorker.register(swPath)
  }
}