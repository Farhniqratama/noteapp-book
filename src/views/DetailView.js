import DetailPresenter from '../presenters/DetailPresenter.js'
export default class DetailView{
  async render(root){
    root.innerHTML = `<section class="card"><h2>Detail</h2><div id="detail">Memuat...</div></section>`
    const presenter = new DetailPresenter(this)
    await presenter.init()
  }
  show(detail){
    document.getElementById('detail').innerHTML = `<pre>${escapeHtml(JSON.stringify(detail, null, 2))}</pre>`
  }
}
function escapeHtml(s){ return s.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])) }