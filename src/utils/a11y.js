export function setupSkipLink(){
  // tidak wajib, tapi memastikan fokus mendarat mulus
  const main = document.getElementById('main')
  if (!main) return
  // saat hash #main, fokuskan ke <main>
  if (location.hash === '#main') {
    requestAnimationFrame(()=> main.focus())
  }
}
export function moveFocusToMain(){
  const main = document.getElementById('main')
  if (main) main.focus()
}