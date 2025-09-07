export async function registerSW(){
  if (!('serviceWorker' in navigator)) return
  try{
    // file sw berada di /public → dibundel ke /dist/sw.js → akses dgn path relatif
    await navigator.serviceWorker.register('./public/sw.js', { scope: './' })
  }catch(e){
    console.warn('SW register failed', e)
  }
}