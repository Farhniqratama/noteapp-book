import{S as r}from"./storyModel-CYf3ghHO.js";import{d,S as s,p as c,g as p}from"./idb-RFQXYX_j.js";import"./storyApi-1rK2hKwQ.js";const h={list(){return p(s.favorites)},add(i){const e=i!=null&&i.id?i:{...i,id:`fav-${Date.now()}`};return c(s.favorites,e)},remove(i){return d(s.favorites,i)}};class m{constructor(e){this.view=e}async init(){try{const e=await r.getCached();e!=null&&e.length?(this.view.showStories(e),this._initMapSafe(e)):this.view.showStories([]);const a=await r.listAndCache({page:1,size:10,location:1});this.view.showStories(a),this._initMapSafe(a)}catch(e){console.error("HomePresenter.init error",e);const a=await r.getCached();this.view.showStories(a||[]),this._initMapSafe(a||[])}}_initMapSafe(e){const a=(e||[]).filter(t=>t.lat&&t.lon);this.view.initMap&&this.view.initMap(a)}async addFavorite(e){await h.add(e),alert("Ditambahkan ke Favorit")}}class y{async render(e){e.innerHTML=`
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
    `,this.presenter=new m(this),await this.presenter.init()}async showStories(e){const a=document.getElementById("stories");if(!e||e.length===0){a.innerHTML=`
        <div class="card" style="text-align:center;padding:1.25rem;opacity:.85">
          <p><strong>Tidak ada stories.</strong></p>
          <p>Login untuk memuat data online, atau tambah data baru.</p>
        </div>
      `;return}a.innerHTML=e.map(t=>`
      <div class="card story-card">
        <img
          src="${t.photoUrl||"assets/placeholder.png"}"
          alt="Foto story"
          class="story-img"
        />
        <p class="story-author"><strong>${t.name||"Anon"}</strong></p>
        <p class="story-desc">${t.description||""}</p>
        <p class="story-date" style="opacity:.8;font-size:.9rem">
          Dibuat: ${t.createdAt?new Date(t.createdAt).toLocaleString("id-ID",{dateStyle:"medium",timeStyle:"short"}):"-"}
        </p>
        <button
          class="fav"
          data-id="${t.id||crypto.randomUUID()}"
          data-name="${(t.name||"Anon").replace(/"/g,"&quot;")}"
          data-photo="${(t.photoUrl||"assets/placeholder.png").replace(/"/g,"&quot;")}"
          data-desc="${(t.description||"").replace(/"/g,"&quot;")}"
          aria-label="Simpan story ini ke Favorit"
        >
          Simpan ke Favorit
        </button>
      </div>
    `).join(""),a.querySelectorAll(".fav").forEach(t=>{t.onclick=async()=>{if(t.disabled)return;const n={id:t.dataset.id,name:t.dataset.name,description:t.dataset.desc,photoUrl:t.dataset.photo},l=t.textContent;t.textContent="Menyimpan...",t.disabled=!0,t.style.filter="brightness(.9)";try{await this.presenter.addFavorite(n),t.textContent="Tersimpan ✓",t.setAttribute("aria-live","polite"),window.Swal&&Swal.fire({title:"Tersimpan!",text:"Story berhasil ditambahkan ke Favorit.",toast:!0,position:"top-end",icon:"success",timer:1500,showConfirmButton:!1,background:"#111827",color:"#e5e7eb"})}catch(o){t.textContent=l,t.disabled=!1,t.style.filter="",window.Swal&&Swal.fire({title:"Gagal Menyimpan",text:(o==null?void 0:o.message)||"Coba lagi.",icon:"error",confirmButtonColor:"#22c55e",background:"#111827",color:"#e5e7eb"})}}})}initMap(e=[]){if(typeof window.L>"u"){console.warn("Leaflet belum dimuat");return}const a=L.map("map").setView([-6.2,106.8],11);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(a),e.forEach(t=>L.marker([t.lat,t.lon]).addTo(a).bindPopup(t.description||"")),requestAnimationFrame(()=>a.invalidateSize())}}export{y as default};
//# sourceMappingURL=HomeView-D1ddS5PA.js.map
