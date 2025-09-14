import{S as n}from"./storyModel-Cl2lOAwe.js";import{F as d}from"./favoritesModel-BngbJ05d.js";import"./idb-AsxtWpiW.js";import"./storyApi-CisDlYOj.js";import"./index-BIUkB2tA.js";class c{constructor(e){this.view=e}async init(){try{const e=await n.listAndCache({page:1,size:10,location:1});this.view.showStories(e);const a=(e||[]).filter(t=>t.lat&&t.lon);this.view.initMap(a)}catch(e){console.error(e)}}async addFavorite(e){await d.add(e)}}class u{async render(e){e.innerHTML=`
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
    `,this.presenter=new c(this),await this.presenter.init()}async showStories(e){const a=document.getElementById("stories");if(!e||e.length===0){a.innerHTML=`
        <div class="card" style="text-align:center;padding:1.25rem;opacity:.85">
          <p><strong>Tidak ada stories.</strong></p>
          <p>Login untuk memuat data online, atau tambah data baru.</p>
        </div>
      `;return}a.innerHTML=e.map(t=>`
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
    `).join(""),a.querySelectorAll(".fav").forEach(t=>{t.onclick=async()=>{if(t.disabled)return;const o={id:t.dataset.id,name:t.dataset.name,description:t.dataset.desc,photoUrl:t.dataset.photo},r=t.textContent;t.textContent="Menyimpan...",t.disabled=!0,t.style.filter="brightness(.95)";try{await this.presenter.addFavorite(o),t.textContent="Tersimpan ✓"}catch(s){t.textContent=r,t.disabled=!1,t.style.filter="",console.error(s)}}})}initMap(e=[]){if(typeof window.L>"u")return;const a=L.map("map").setView([-6.2,106.8],11);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(a),e.forEach(t=>L.marker([t.lat,t.lon]).addTo(a).bindPopup(t.description||"")),requestAnimationFrame(()=>a.invalidateSize())}}export{u as default};
