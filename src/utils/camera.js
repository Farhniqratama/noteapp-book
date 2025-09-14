let stream

export async function startCamera(videoEl){
  stopCamera()
  stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
  videoEl.srcObject = stream
  await videoEl.play()
}

export function capture(videoEl){
  const canvas = document.createElement('canvas')
  canvas.width = videoEl.videoWidth
  canvas.height = videoEl.videoHeight
  const ctx = canvas.getContext('2d')
  ctx.drawImage(videoEl, 0, 0)
  return new Promise(res => canvas.toBlob(res, 'image/jpeg', 0.85))
}

export function stopCamera(){
  if (!stream) return
  stream.getTracks().forEach(t => t.stop())
  stream = null
}