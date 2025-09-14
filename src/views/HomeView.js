import HomePresenter from '../presenters/HomePresenter.js'

export default class HomeView {
  async render(root){
    root.innerHTML = `
      <section class="stories-map-container">
        <article class="stories-card">
          <h1>Stories (online/offline)</h1>
          <div id="stories" class="stories-grid"></div>
        </article>

        <article class="map-card">
          <h2>Peta</h2>
          <div id="map"></div>
        </article>
      </section>
    `
    this.presenter = new HomePresenter(this)
    await this.presenter.init()
  }

  async showStories(items){
    const el = document.getElementById('stories')

    if (!items || items.length === 0){
      el.innerHTML = `
        <div class="card" style="text-align:center;padding:1.25rem;opacity:.85">
          <p><strong>Tidak ada stories.</strong></p>
          <p>Login untuk memuat data online, atau tambah data baru.</p>
        </div>
      `
      return
    }

    el.innerHTML = items.map(s => `
      <div class="card story-card">
        <img src="${s.photoUrl || 'assets/placeholder.png'}" alt="Foto story" class="story-img"/>
        <p class="story-author"><strong>${s.name || 'Anon'}</strong></p>
        <p class="story-desc">${s.description || ''}</p>
        <p class="story-date" style="opacity:.8;font-size:.9rem">
          Dibuat: ${s.createdAt ? new Date(s.createdAt).toLocaleString('id-ID',{dateStyle:'medium', timeStyle:'short'}) : '-'}
        </p>
        <button
          class="fav"
          data-id="${s.id || crypto.randomUUID()}"
          data-name="${(s.name || 'Anon').replace(/"/g,'&quot;')}"
          data-photo="${(s.photoUrl || 'assets/placeholder.png').replace(/"/g,'&quot;')}"
          data-desc="${(s.description || '').replace(/"/g,'&quot;')}"
          aria-label="Simpan story ini ke Favorit">
          Simpan ke Favorit
        </button>
      </div>
    `).join('')

    el.querySelectorAll('.fav').forEach(btn => {
      btn.onclick = async () => {
        if (btn.disabled) return
        const payload = {
          id: btn.dataset.id,
          name: btn.dataset.name,
          description: btn.dataset.desc,
          photoUrl: btn.dataset.photo,
        }
        const prev = btn.textContent
        btn.textContent = 'Menyimpan...'; btn.disabled = true; btn.style.filter='brightness(.95)'
        try{
          await this.presenter.addFavorite(payload)
          btn.textContent = 'Tersimpan ✓'
        }catch(e){
          btn.textContent = prev; btn.disabled = false; btn.style.filter=''
          console.error(e)
        }
      }
    })
  }

  initMap(points = []){
    if (typeof window.L === 'undefined') return
    const map = L.map('map').setView([-6.2, 106.8], 11)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map)
    points.forEach(p => L.marker([p.lat, p.lon]).addTo(map).bindPopup(p.description || ''))
    requestAnimationFrame(()=> map.invalidateSize())
  }
}