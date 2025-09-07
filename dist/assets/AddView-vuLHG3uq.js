import{p as f,c as C,S as b,g as S}from"./idb-AsxtWpiW.js";import{g as w,b as x,l as B,c as I,d as N,e as D}from"./index-BeDM5Q_P.js";const g=()=>new Date().toISOString(),F=[{id:"seed-1",name:"Demo 1",description:"Contoh 1",photoUrl:"./public/icons/icon-192.png",lat:-6.2,lon:106.8,createdAt:g()},{id:"seed-2",name:"Demo 2",description:"Contoh 2",photoUrl:"./public/icons/icon-192.png",lat:-6.21,lon:106.82,createdAt:g()},{id:"seed-3",name:"Demo 3",description:"Contoh 3",photoUrl:"./public/icons/icon-192.png",lat:-6.19,lon:106.85,createdAt:g()}];async function k(){const n=await S(b.stories);if(!n||n.length===0)for(const t of F)await f(b.stories,t)}const U={async getCached(){return(await S(b.stories)||[]).map(t=>({...t,createdAt:t.createdAt||g()}))},async listAndCache({page:n=1,size:t=10,location:i=1}={}){if(!w())return await k(),this.getCached();try{const r=(await B({page:n,size:t,location:i})||[]).map(e=>({id:e.id,name:e.name,description:e.description,photoUrl:e.photoUrl,lat:e.lat,lon:e.lon,createdAt:e.createdAt||e.created_at||g()}));await C(b.stories);for(const e of r)await f(b.stories,e);return r}catch{return await k(),this.getCached()}},async add({description:n,photo:t,lat:i,lon:c}){var e,u,l;if(w()){const o=await x({description:n,photo:t,lat:i,lon:c}),h={id:((e=o==null?void 0:o.story)==null?void 0:e.id)||`srv-${Date.now()}`,name:((u=o==null?void 0:o.story)==null?void 0:u.name)||"Saya",description:n,photoUrl:((l=o==null?void 0:o.story)==null?void 0:l.photoUrl)||null,lat:i,lon:c,createdAt:g()};return await f(b.stories,h),h}const r={id:`local-${Date.now()}`,name:"Guest",description:n,photo:t,photoUrl:null,lat:i,lon:c,createdAt:g()};return await f(b.stories,r),r}};class T{constructor(t){this.view=t,this._captured=null}setCaptured(t){this._captured=t}async submit({description:t,lat:i,lon:c}){var s,r,e,u;try{if(!t||Number.isNaN(i)||Number.isNaN(c))throw new Error("Deskripsi/koordinat tidak valid");await U.add({description:t,photo:this._captured,lat:i,lon:c}),(r=(s=this.view)==null?void 0:s.onSuccess)==null||r.call(s,"Berhasil menambah!")}catch(l){(u=(e=this.view)==null?void 0:e.onError)==null||u.call(e,(l==null?void 0:l.message)||"Gagal menambah story")}}}class q{async render(t){t.innerHTML=`
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
    `,this.presenter=new T(this);const i=document.getElementById("preview"),c=document.getElementById("result"),s=document.getElementById("btnStart"),r=document.getElementById("btnCapture"),e=document.getElementById("btnStop");s.onclick=async()=>{try{await I(i),r.disabled=!1,e.disabled=!1,s.disabled=!0}catch(a){alert("Gagal menyalakan kamera: "+((a==null?void 0:a.message)||a))}},document.getElementById("btnCapture").onclick=async()=>{try{const a=await N(i);c.src=URL.createObjectURL(a),this.presenter.setCaptured(a)}catch(a){alert("Gagal mengambil foto: "+((a==null?void 0:a.message)||a))}},e.onclick=async()=>{try{await D(i)}finally{s.disabled=!1,r.disabled=!0,e.disabled=!0}};const u=document.getElementById("lat"),l=document.getElementById("lon");if(typeof window.L<"u"){const a=L.map("pickMap").setView([-6.2,106.8],11);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19}).addTo(a);let p=null;const v=(d,m)=>{p?p.setLatLng([d,m]):(p=L.marker([d,m],{draggable:!0}).addTo(a),p.on("moveend",y=>{const{lat:E,lng:A}=y.target.getLatLng();u.value=E.toFixed(6),l.value=A.toFixed(6)})),u.value=d,l.value=m};a.on("click",d=>{const{lat:m,lng:y}=d.latlng;v(+m.toFixed(6),+y.toFixed(6))}),navigator.geolocation&&navigator.geolocation.getCurrentPosition(d=>{const{latitude:m,longitude:y}=d.coords;a.setView([m,y],13),v(+m.toFixed(6),+y.toFixed(6))},()=>{}),requestAnimationFrame(()=>a.invalidateSize())}const o=document.getElementById("form"),h=document.getElementById("btnSubmit");o.onsubmit=async a=>{a.preventDefault();const p=document.getElementById("desc").value.trim(),v=parseFloat(u.value),d=parseFloat(l.value);if(!p)return alert("Deskripsi wajib diisi.");if(Number.isNaN(v)||Number.isNaN(d))return alert("Koordinat tidak valid.");o.setAttribute("aria-busy","true"),h.disabled=!0;try{await this.presenter.submit({description:p,lat:v,lon:d})}finally{o.removeAttribute("aria-busy"),h.disabled=!1}}}onSuccess(t){alert(t||"Berhasil menambah!"),location.hash="#/"}onError(t){alert(t||"Gagal menambah story")}}export{q as default};
//# sourceMappingURL=AddView-vuLHG3uq.js.map
