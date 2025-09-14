import AddPresenter from '../presenters/AddPresenter.js'
import { startCamera, capture, stopCamera } from '../utils/camera.js'

export default class AddView {
  async render(root){
    root.innerHTML = `
      <section class="card">
        <h2>Tambah Data Baru</h2>
        <form id="form" class="grid" novalidate>
          <label for="desc">Deskripsi</label>
          <textarea id="desc" required rows="3" placeholder="Tulis deskripsi singkat..."></textarea>
          <div class="grid cols-2">
            <div>
              <label>Kamera</label>
              <video id="preview" autoplay playsinline style="width:100%;height:240px;border-radius:.75rem;background:#000"></video>
              <div style="display:flex;gap:.5rem;margin-top:.5rem">
                <button type="button" id="btnStart">Nyalakan Kamera</button>
                <button type="button" id="btnCapture" disabled>Ambil Foto</button>
                <button type="button" id="btnStop" disabled>Matikan Kamera</button>
              </div>
            </div>
            <div>
              <label>Hasil Foto</label>
              <img id="result" alt="Hasil foto" style="width:100%;height:240px;object-fit:cover;border-radius:.75rem;background:#0b1220" />
            </div>
          </div>
          <div class="card" style="margin-top:1rem">
            <p><strong>Pilih Lokasi</strong></p>
            <div id="pickMap" style="height:320px;border-radius:1rem;overflow:hidden;background:#0b1220"></div>
            <div class="grid cols-2" style="margin-top:.5rem">
              <label for="lat">Latitude
                <input id="lat" type="number" step="any" placeholder="-6.2" required />
              </label>
              <label for="lon">Longitude
                <input id="lon" type="number" step="any" placeholder="106.8" required />
              </label>
            </div>
          </div>
          <button id="btnSubmit" type="submit" style="width:100%;margin-top:1rem">Simpan</button>
        </form>
      </section>
    `
    this.presenter = new AddPresenter(this)
    const video = document.getElementById('preview')
    const img   = document.getElementById('result')
    const btnStart   = document.getElementById('btnStart')
    const btnCapture = document.getElementById('btnCapture')
    const btnStop    = document.getElementById('btnStop')
    btnStart.onclick = async () => {
      try { await startCamera(video); btnCapture.disabled=false; btnStop.disabled=false; btnStart.disabled=true }
      catch(e){ alert('Gagal menyalakan kamera: ' + (e?.message||e)) }
    }
    document.getElementById('btnCapture').onclick = async () => {
      try{
        const blob = await capture(video)
        img.src = URL.createObjectURL(blob)
        this.presenter.setCaptured(blob)
      }catch(e){ alert('Gagal mengambil foto: ' + (e?.message||e)) }
    }
    btnStop.onclick = async () => { try{ await stopCamera(video) } finally { btnStart.disabled=false; btnCapture.disabled=true; btnStop.disabled=true } }
    const latEl = document.getElementById('lat')
    const lonEl = document.getElementById('lon')
    if (typeof window.L !== 'undefined'){
      const map = L.map('pickMap').setView([-6.2, 106.8], 11)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom:19 }).addTo(map)
      let marker = null
      const place = (lat, lon)=>{
        if (marker){ marker.setLatLng([lat,lon]) }
        else {
          marker = L.marker([lat,lon], { draggable:true }).addTo(map)
          marker.on('moveend', e=>{
            const { lat, lng } = e.target.getLatLng()
            latEl.value = lat.toFixed(6); lonEl.value = lng.toFixed(6)
          })
        }
        latEl.value = lat; lonEl.value = lon
      }
      map.on('click', e => { const { lat, lng } = e.latlng; place(+lat.toFixed(6), +lng.toFixed(6)) })
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos=>{
          const { latitude, longitude } = pos.coords
          map.setView([latitude, longitude], 13)
          place(+latitude.toFixed(6), +longitude.toFixed(6))
        }, ()=>{})
      }
      requestAnimationFrame(()=> map.invalidateSize())
    }
    const form = document.getElementById('form')
    const btnSubmit = document.getElementById('btnSubmit')
    form.onsubmit = async (e)=>{
      e.preventDefault()
      const description = document.getElementById('desc').value.trim()
      const lat = parseFloat(latEl.value), lon = parseFloat(lonEl.value)
      if (!description) return alert('Deskripsi wajib diisi.')
      if (Number.isNaN(lat) || Number.isNaN(lon)) return alert('Koordinat tidak valid.')
      form.setAttribute('aria-busy','true'); btnSubmit.disabled = true
      try{ await this.presenter.submit({ description, lat, lon }) }
      finally { form.removeAttribute('aria-busy'); btnSubmit.disabled=false }
    }
  }
  onSuccess(msg){ alert(msg || 'Berhasil menambah!'); location.hash = '#/' }
  onError(msg){ alert(msg || 'Gagal menambah story') }
}