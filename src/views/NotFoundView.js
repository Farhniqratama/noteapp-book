export default class NotFoundView{
  async render(root){
    root.innerHTML = `<section class="card"><h2>Halaman Tidak Ditemukan</h2>
      <p>Alamat yang Anda tuju tidak dikenali.</p>
      <a href="#/">Kembali ke beranda</a>
    </section>`
  }
}