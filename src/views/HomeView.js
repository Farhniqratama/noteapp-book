// src/views/HomeView.js
import HomePresenter from '../presenters/HomePresenter.js'

export default class HomeView {
  async render(root) {
    root.innerHTML = `
      <section class="stories-map-container">
        <article class="stories-card">
          <h2>Stories (online/offline)</h2>
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

  async showStories(items) {
    const el = document.getElementById('stories')

    // Jika kosong → tampilkan UI fallback
    if (!items || items.length === 0) {
      el.innerHTML = `
        <div class="card" style="text-align:center;padding:1.25rem;opacity:.85">
          <p><strong>Tidak ada stories.</strong></p>
          <p>Login untuk memuat data online, atau tambah data baru.</p>
        </div>
      `
      return
    }

    // Render semua story
    el.innerHTML = items.map(s => `
      <div class="card story-card">
        <img
          src="${s.photoUrl || 'assets/placeholder.png'}"
          alt="Foto story"
          class="story-img"
        />
        <p class="story-author"><strong>${s.name || 'Anon'}</strong></p>
        <p class="story-desc">${s.description || ''}</p>
        <p class="story-date" style="opacity:.8;font-size:.9rem">
          Dibuat: ${s.createdAt 
            ? new Date(s.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) 
            : '-'}
        </p>
        <button
          class="fav"
          data-id="${s.id || crypto.randomUUID()}"
          data-name="${(s.name || 'Anon').replace(/"/g, '&quot;')}"
          data-photo="${(s.photoUrl || 'assets/placeholder.png').replace(/"/g, '&quot;')}"
          data-desc="${(s.description || '').replace(/"/g, '&quot;')}"
          aria-label="Simpan story ini ke Favorit"
        >
          Simpan ke Favorit
        </button>
      </div>
    `).join('')

    // Handle klik "Simpan ke Favorit"
    el.querySelectorAll('.fav').forEach(btn => {
      btn.onclick = async () => {
        // Jika sudah tersimpan → abaikan
        if (btn.disabled) return

        const payload = {
          id: btn.dataset.id,
          name: btn.dataset.name,
          description: btn.dataset.desc,
          photoUrl: btn.dataset.photo,
        }

        // Optimistic UI: ubah teks & disable tombol
        const prevText = btn.textContent
        btn.textContent = 'Menyimpan...'
        btn.disabled = true
        btn.style.filter = 'brightness(.9)'

        try {
          await this.presenter.addFavorite(payload)

          // Jika sukses → ubah label tombol & tampilkan toast modern
          btn.textContent = 'Tersimpan ✓'
          btn.setAttribute('aria-live', 'polite')

          // SweetAlert toast (bukan pop-up)
          if (window.Swal) {
            Swal.fire({
              title: 'Tersimpan!',
              text: 'Story berhasil ditambahkan ke Favorit.',
              toast: true,
              position: 'top-end',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
              background: '#111827',
              color: '#e5e7eb'
            })
          }
        } catch (e) {
          // Gagal → rollback tombol & tampilkan error toast
          btn.textContent = prevText
          btn.disabled = false
          btn.style.filter = ''

          if (window.Swal) {
            Swal.fire({
              title: 'Gagal Menyimpan',
              text: e?.message || 'Coba lagi.',
              icon: 'error',
              confirmButtonColor: '#22c55e',
              background: '#111827',
              color: '#e5e7eb'
            })
          }
        }
      }
    })
  }

  initMap(points = []) {
    if (typeof window.L === 'undefined') {
      console.warn('Leaflet belum dimuat')
      return
    }
    const map = L.map('map').setView([-6.2, 106.8], 11)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map)

    // Tambahkan marker ke peta
    points.forEach(p =>
      L.marker([p.lat, p.lon]).addTo(map).bindPopup(p.description || '')
    )

    requestAnimationFrame(() => map.invalidateSize())
  }
}