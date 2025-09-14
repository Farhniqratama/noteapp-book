import{r as c,l as g}from"./storyApi-CisDlYOj.js";import{S as d}from"./index-BXyFPkpQ.js";const m={async login(o,e){const{token:t,name:a}=await g(o,e);return d.setToken(t),d.setUserName(a||""),{token:t,name:a}},async register(o,e,t){return c(o,e,t)}};class u{constructor(e){this.view=e}async login(e,t){var a,s,n,r;try{const i=await m.login(e,t);(s=(a=this.view)==null?void 0:a.onLoginSuccess)==null||s.call(a,i.name)}catch(i){(r=(n=this.view)==null?void 0:n.onError)==null||r.call(n,(i==null?void 0:i.message)||"Gagal login")}}async register(e,t,a){var s,n,r,i;try{await m.register(e,t,a),(n=(s=this.view)==null?void 0:s.onRegisterSuccess)==null||n.call(s)}catch(l){(i=(r=this.view)==null?void 0:r.onError)==null||i.call(r,(l==null?void 0:l.message)||"Gagal registrasi")}}}class h{async render(e){e.innerHTML=`
      <section class="card" style="max-width:720px;margin:0 auto">
        <h2>Masuk / Daftar</h2>
        <div class="tabs" role="tablist" aria-label="Auth tabs">
          <button id="tabLogin" class="active" role="tab" aria-selected="true">Masuk</button>
          <button id="tabRegister" role="tab" aria-selected="false">Daftar</button>
        </div>
        <div id="panelLogin" role="tabpanel">
          <form id="formLogin" class="grid">
            <label for="loginEmail">Email</label>
            <input id="loginEmail" type="email" required autocomplete="username" />
            <label for="loginPassword">Password</label>
            <input id="loginPassword" type="password" required minlength="8" autocomplete="current-password" />
            <button type="submit">Masuk</button>
          </form>
        </div>
        <div id="panelRegister" role="tabpanel" hidden>
          <form id="formRegister" class="grid">
            <label for="regName">Nama</label>
            <input id="regName" type="text" required />
            <label for="regEmail">Email</label>
            <input id="regEmail" type="email" required autocomplete="username" />
            <label for="regPassword">Password</label>
            <input id="regPassword" type="password" required minlength="8" autocomplete="new-password" />
            <button type="submit">Daftar</button>
          </form>
        </div>
      </section>
    `,this.presenter=new u(this),this.bindTabs(),this.bindForms()}bindTabs(){const e=document.getElementById("tabLogin"),t=document.getElementById("tabRegister"),a=document.getElementById("panelLogin"),s=document.getElementById("panelRegister");e.onclick=()=>{e.classList.add("active"),t.classList.remove("active"),a.hidden=!1,s.hidden=!0},t.onclick=()=>{t.classList.add("active"),e.classList.remove("active"),s.hidden=!1,a.hidden=!0}}bindForms(){document.getElementById("formLogin").onsubmit=async e=>{e.preventDefault();const t=document.getElementById("loginEmail").value.trim(),a=document.getElementById("loginPassword").value;await this.presenter.login(t,a)},document.getElementById("formRegister").onsubmit=async e=>{e.preventDefault();const t=document.getElementById("regName").value.trim(),a=document.getElementById("regEmail").value.trim(),s=document.getElementById("regPassword").value;await this.presenter.register(t,a,s)}}onLoginSuccess(e){alert("Login berhasil, selamat datang "+(e||"")),location.hash="#/"}onRegisterSuccess(){alert("Registrasi berhasil. Silakan login."),document.getElementById("tabLogin").click()}onError(e){alert(e||"Terjadi kesalahan")}}export{h as default};
