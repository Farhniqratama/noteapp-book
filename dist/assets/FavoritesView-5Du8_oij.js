import{g as m,d as p,S as r}from"./idb-RFQXYX_j.js";class h{constructor(t){this.view=t}async init(){const t=await m(r.favorites);this.view.show(t||[]),this.view.onDelete=async i=>{await p(r.favorites,i);const e=await m(r.favorites);this.view.show(e||[])}}}class v{async render(t){t.innerHTML=`
      <section class="card" style="text-align:center;">
        <h2 style="margin-bottom:1rem;font-size:1.5rem;">Favorit</h2>
        <div id="list" class="favorites-grid"></div>
      </section>
    `,this.presenter=new h(this),await this.presenter.init()}show(t){const i=document.getElementById("list");if(!t||t.length===0){i.innerHTML=`
        <div style="
          display:flex;flex-direction:column;justify-content:center;align-items:center;
          text-align:center;padding:2rem;margin:2rem auto;min-height:200px;max-width:520px;
          background:#1f2937;border:1px solid #374151;border-radius:1rem;box-shadow:0 4px 12px rgba(0,0,0,.4);color:#e5e7eb;">
          <p style="font-size:1.3rem;margin-bottom:.5rem;"><strong>Belum ada data favorit</strong></p>
          <p style="font-size:1rem;opacity:.85;">Silakan tambahkan data ke favorit terlebih dahulu.</p>
        </div>
      `;return}i.innerHTML=t.map(e=>`
      <article class="card fav-card" data-id="${e.id}" style="text-align:center;">
        <img src="${e.photoUrl||"assets/placeholder.png"}" alt="Gambar favorit"
             class="fav-img" style="margin-bottom:.5rem;"/>
        <div class="fav-body">
          <h3 class="fav-title" style="margin:.3rem 0;">${e.name||"Tanpa Nama"}</h3>
          <p class="fav-desc" style="margin:.3rem 0;opacity:.9;">${e.description||""}</p>
          <div class="fav-actions" style="margin-top:.5rem;">
            <button data-id="${e.id}" class="del">Hapus</button>
          </div>
        </div>
      </article>
    `).join(""),i.querySelectorAll(".del").forEach(e=>{e.onclick=async()=>{var l;const o=e.dataset.id,a=i.querySelector(`.fav-card[data-id="${o}"]`),n=a==null?void 0:a.outerHTML;a.style.transition="opacity .18s ease, transform .18s ease",a.style.opacity="0",a.style.transform="scale(.98)",setTimeout(()=>{a==null||a.remove()},180);try{await((l=this.onDelete)==null?void 0:l.call(this,o)),window.Swal&&Swal.fire({title:"Dihapus",toast:!0,position:"top-end",timer:1200,showConfirmButton:!1,icon:"success",background:"#111827",color:"#e5e7eb"})}catch(s){if(n){const c=document.createElement("div");c.innerHTML=n;const d=c.firstElementChild;i.prepend(d),d.querySelector(".del").onclick=e.onclick}window.Swal?Swal.fire({title:"Gagal menghapus",text:(s==null?void 0:s.message)||"Coba lagi.",icon:"error",confirmButtonColor:"#22c55e",background:"#111827",color:"#e5e7eb"}):alert("Gagal menghapus, coba lagi.")}i.querySelector(".fav-card")||this.show([])}})}}export{v as default};
//# sourceMappingURL=FavoritesView-5Du8_oij.js.map
