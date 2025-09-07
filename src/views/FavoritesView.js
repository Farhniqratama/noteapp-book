import FavoritesPresenter from '../presenters/FavoritesPresenter.js'

export default class FavoritesView {
  async render(root){
    root.innerHTML = `
      <section class="card" style="text-align:center;">
        <h2 style="margin-bottom:1rem;font-size:1.5rem;">Favorit</h2>
        <div id="list" class="favorites-grid"></div>
      </section>
    `
    this.presenter = new FavoritesPresenter(this)
    await this.presenter.init()
  }

  show(items){
    const list = document.getElementById('list')

    if (!items || items.length === 0) {
      list.innerHTML = `
        <div style="
          display:flex;flex-direction:column;justify-content:center;align-items:center;
          text-align:center;padding:2rem;margin:2rem auto;min-height:200px;max-width:520px;
          background:#1f2937;border:1px solid #374151;border-radius:1rem;box-shadow:0 4px 12px rgba(0,0,0,.4);color:#e5e7eb;">
          <p style="font-size:1.3rem;margin-bottom:.5rem;"><strong>Belum ada data favorit</strong></p>
          <p style="font-size:1rem;opacity:.85;">Silakan tambahkan data ke favorit terlebih dahulu.</p>
        </div>
      `
      return
    }

    list.innerHTML = items.map(i => `
      <article class="card fav-card" data-id="${i.id}" style="text-align:center;">
        <img src="${i.photoUrl || 'assets/placeholder.png'}" alt="Gambar favorit"
             class="fav-img" style="margin-bottom:.5rem;"/>
        <div class="fav-body">
          <h3 class="fav-title" style="margin:.3rem 0;">${i.name || 'Tanpa Nama'}</h3>
          <p class="fav-desc" style="margin:.3rem 0;opacity:.9;">${i.description || ''}</p>
          <div class="fav-actions" style="margin-top:.5rem;">
            <button data-id="${i.id}" class="del">Hapus</button>
          </div>
        </div>
      </article>
    `).join('')

    // Hapus instan (optimistic UI)
    list.querySelectorAll('.del').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.id
        const card = list.querySelector(`.fav-card[data-id="${id}"]`)

        // simpan snapshot untuk rollback bila gagal
        const snapshot = card?.outerHTML

        // efek hilang cepat
        card.style.transition = 'opacity .18s ease, transform .18s ease'
        card.style.opacity = '0'
        card.style.transform = 'scale(.98)'

        // tunggu animasi singkat lalu remove dari DOM
        setTimeout(() => { card?.remove() }, 180)

        // panggil presenter (hapus di DB)
        try {
          await this.onDelete?.(id)

          // toast kecil sukses (tanpa tombol)
          if (window.Swal) {
            Swal.fire({
              title: 'Dihapus',
              toast: true, position: 'top-end', timer: 1200, showConfirmButton: false,
              icon: 'success', background: '#111827', color: '#e5e7eb'
            })
          }
        } catch (e) {
          // rollback: kalau gagal, kembalikan kartu
          if (snapshot) {
            const tmp = document.createElement('div')
            tmp.innerHTML = snapshot
            const restored = tmp.firstElementChild
            list.prepend(restored)

            // re-bind handler tombol hapus pada elemen hasil restore
            restored.querySelector('.del').onclick = btn.onclick
          }
          if (window.Swal) {
            Swal.fire({
              title: 'Gagal menghapus',
              text: e?.message || 'Coba lagi.',
              icon: 'error',
              confirmButtonColor: '#22c55e',
              background: '#111827', color: '#e5e7eb'
            })
          } else {
            alert('Gagal menghapus, coba lagi.')
          }
        }

        // bila DOM kosong setelah remove → render state kosong
        if (!list.querySelector('.fav-card')) {
          this.show([])
        }
      }
    })
  }
}