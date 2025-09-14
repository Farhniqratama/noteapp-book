import{S as f}from"./storyModel-C3CKOtsZ.js";import{s as k,c as w,a as E}from"./index-BXyFPkpQ.js";import"./idb-AsxtWpiW.js";import"./storyApi-CisDlYOj.js";class x{constructor(e){this.view=e,this._captured=null}setCaptured(e){this._captured=e}async submit({description:e,lat:l,lon:b}){var i,u,r,d;try{if(!e||Number.isNaN(l)||Number.isNaN(b))throw new Error("Deskripsi/koordinat tidak valid");await f.add({description:e,photo:this._captured,lat:l,lon:b}),(u=(i=this.view)==null?void 0:i.onSuccess)==null||u.call(i,"Berhasil menambah!")}catch(n){(d=(r=this.view)==null?void 0:r.onError)==null||d.call(r,(n==null?void 0:n.message)||"Gagal menambah story")}}}class I{async render(e){e.innerHTML=`
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
    `,this.presenter=new x(this);const l=document.getElementById("preview"),b=document.getElementById("result"),i=document.getElementById("btnStart"),u=document.getElementById("btnCapture"),r=document.getElementById("btnStop");i.onclick=async()=>{try{await k(l),u.disabled=!1,r.disabled=!1,i.disabled=!0}catch(t){alert("Gagal menyalakan kamera: "+((t==null?void 0:t.message)||t))}},document.getElementById("btnCapture").onclick=async()=>{try{const t=await w(l);b.src=URL.createObjectURL(t),this.presenter.setCaptured(t)}catch(t){alert("Gagal mengambil foto: "+((t==null?void 0:t.message)||t))}},r.onclick=async()=>{try{await E(l)}finally{i.disabled=!1,u.disabled=!0,r.disabled=!0}};const d=document.getElementById("lat"),n=document.getElementById("lon");if(typeof window.L<"u"){const t=L.map("pickMap").setView([-6.2,106.8],11);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(t);let s=null;const c=(a,o)=>{s?s.setLatLng([a,o]):(s=L.marker([a,o],{draggable:!0}).addTo(t),s.on("moveend",m=>{const{lat:h,lng:v}=m.target.getLatLng();d.value=h.toFixed(6),n.value=v.toFixed(6)})),d.value=a,n.value=o};t.on("click",a=>{const{lat:o,lng:m}=a.latlng;c(+o.toFixed(6),+m.toFixed(6))}),navigator.geolocation&&navigator.geolocation.getCurrentPosition(a=>{const{latitude:o,longitude:m}=a.coords;t.setView([o,m],13),c(+o.toFixed(6),+m.toFixed(6))},()=>{}),requestAnimationFrame(()=>t.invalidateSize())}const p=document.getElementById("form"),g=document.getElementById("btnSubmit");p.onsubmit=async t=>{t.preventDefault();const s=document.getElementById("desc").value.trim(),c=parseFloat(d.value),a=parseFloat(n.value);if(!s)return alert("Deskripsi wajib diisi.");if(Number.isNaN(c)||Number.isNaN(a))return alert("Koordinat tidak valid.");p.setAttribute("aria-busy","true"),g.disabled=!0;try{await this.presenter.submit({description:s,lat:c,lon:a})}finally{p.removeAttribute("aria-busy"),g.disabled=!1}}}onSuccess(e){alert(e||"Berhasil menambah!"),location.hash="#/"}onError(e){alert(e||"Gagal menambah story")}}export{I as default};
