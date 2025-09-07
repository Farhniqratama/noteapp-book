// src/sw-register.js
export async function registerSW(){
  if (!('serviceWorker' in navigator)) return
  try{
    await navigator.serviceWorker.register('./public/sw.js?scope=./', { scope:'./' })
  }catch(e){
    console.warn('SW register failed', e)
  }
}