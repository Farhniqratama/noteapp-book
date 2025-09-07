import{g as d,l}from"./index-BeDM5Q_P.js";import{g as p,S as s,c as m,p as n}from"./idb-AsxtWpiW.js";class h{constructor(e){this.view=e}async init(){try{const e=await p(s.stories);if(e!=null&&e.length&&this.view.showStories(e),!d()){this.view.showStories(e||[]);return}const t=await l({page:1,size:10,location:1}).catch(()=>[]);if(t!=null&&t.length){const o=t.map(a=>({...a,createdAt:a.createdAt||new Date().toISOString()}));this.view.showStories(o),await m(s.stories);for(const a of o)await n(s.stories,a);const r=o.filter(a=>a.lat&&a.lon);this.view.initMap(r)}}catch(e){console.error(e)}}async addFavorite(e){await n(s.favorites,e)}}class u{async render(e){e.innerHTML=`
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
    `,this.presenter=new h(this),await this.presenter.init()}async showStories(e){const i=document.getElementById("stories");if(!e||e.length===0){i.innerHTML=`
        <div class="card" style="text-align:center;padding:1.25rem;opacity:.85">
          <p><strong>Tidak ada stories.</strong></p>
          <p>Login untuk memuat data online, atau tambah data baru.</p>
        </div>
      `;return}i.innerHTML=e.map(t=>`
      <div class="card story-card">
        <img src="${t.photoUrl||"assets/placeholder.png"}" alt="Foto story" class="story-img"/>
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
          aria-label="Simpan story ini ke Favorit">
          Simpan ke Favorit
        </button>
      </div>
    `).join(""),i.querySelectorAll(".fav").forEach(t=>{t.onclick=async()=>{if(t.disabled)return;const o={id:t.dataset.id,name:t.dataset.name,description:t.dataset.desc,photoUrl:t.dataset.photo},r=t.textContent;t.textContent="Menyimpan...",t.disabled=!0,t.style.filter="brightness(.95)";try{await this.presenter.addFavorite(o),t.textContent="Tersimpan ✓"}catch(a){t.textContent=r,t.disabled=!1,t.style.filter="",console.error(a)}}})}initMap(e=[]){if(typeof window.L>"u")return;const i=L.map("map").setView([-6.2,106.8],11);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(i),e.forEach(t=>L.marker([t.lat,t.lon]).addTo(i).bindPopup(t.description||"")),requestAnimationFrame(()=>i.invalidateSize())}}export{u as default};
//# sourceMappingURL=HomeView-sCdI289g.js.map
