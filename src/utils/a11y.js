export function setupSkipLink(){
  const main = document.getElementById('main')
  if (!main) return
  if (location.hash === '#main') {
    requestAnimationFrame(()=> main.focus())
  }
}
export function moveFocusToMain(){
  const main = document.getElementById('main')
  if (main) main.focus()
}