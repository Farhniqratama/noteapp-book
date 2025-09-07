import{a as c,s as g,r as u}from"./index-BeDM5Q_P.js";const l="token",m="userName",b={getToken:()=>localStorage.getItem(l),setToken:r=>r?localStorage.setItem(l,r):localStorage.removeItem(l),clearToken:()=>localStorage.removeItem(l),getUserName:()=>localStorage.getItem(m)||"",setUserName:r=>r&&r.trim()?localStorage.setItem(m,r):localStorage.removeItem(m),clearUserName:()=>localStorage.removeItem(m)};class p{constructor(e){this.view=e}async login(e,s){var t,a,i,n;try{const o=await c(e,s);g(o.token),b.setUserName(o.name||""),(a=(t=this.view)==null?void 0:t.onLoginSuccess)==null||a.call(t,o.name)}catch(o){(n=(i=this.view)==null?void 0:i.onError)==null||n.call(i,(o==null?void 0:o.message)||"Gagal login")}}async register(e,s,t){var a,i,n,o;try{await u(e,s,t),(i=(a=this.view)==null?void 0:a.onRegisterSuccess)==null||i.call(a)}catch(d){(o=(n=this.view)==null?void 0:n.onError)==null||o.call(n,(d==null?void 0:d.message)||"Gagal registrasi")}}}class v{async render(e){e.innerHTML=`
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
    `,this.presenter=new p(this),this.bindTabs(),this.bindForms()}bindTabs(){const e=document.getElementById("tabLogin"),s=document.getElementById("tabRegister"),t=document.getElementById("panelLogin"),a=document.getElementById("panelRegister");e.onclick=()=>{e.classList.add("active"),s.classList.remove("active"),t.hidden=!1,a.hidden=!0},s.onclick=()=>{s.classList.add("active"),e.classList.remove("active"),a.hidden=!1,t.hidden=!0}}bindForms(){document.getElementById("formLogin").onsubmit=async e=>{e.preventDefault();const s=document.getElementById("loginEmail").value.trim(),t=document.getElementById("loginPassword").value;await this.presenter.login(s,t)},document.getElementById("formRegister").onsubmit=async e=>{e.preventDefault();const s=document.getElementById("regName").value.trim(),t=document.getElementById("regEmail").value.trim(),a=document.getElementById("regPassword").value;await this.presenter.register(s,t,a)}}onLoginSuccess(e){alert("Login berhasil, selamat datang "+(e||"")),location.hash="#/"}onRegisterSuccess(){alert("Registrasi berhasil. Silakan login."),document.getElementById("tabLogin").click()}onError(e){alert(e||"Terjadi kesalahan")}}export{v as default};
//# sourceMappingURL=AuthView-Cv5vwjWG.js.map
