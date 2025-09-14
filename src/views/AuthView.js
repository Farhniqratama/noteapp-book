import AuthPresenter from '../presenters/AuthPresenter.js'

export default class AuthView {
  async render(root){
    root.innerHTML = `
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
    `
    this.presenter = new AuthPresenter(this)
    this.bindTabs()
    this.bindForms()
  }
  bindTabs(){
    const tabLogin = document.getElementById('tabLogin')
    const tabRegister = document.getElementById('tabRegister')
    const panelLogin = document.getElementById('panelLogin')
    const panelRegister = document.getElementById('panelRegister')
    tabLogin.onclick = ()=>{
      tabLogin.classList.add('active'); tabRegister.classList.remove('active')
      panelLogin.hidden = false; panelRegister.hidden = true
    }
    tabRegister.onclick = ()=>{
      tabRegister.classList.add('active'); tabLogin.classList.remove('active')
      panelRegister.hidden = false; panelLogin.hidden = true
    }
  }
  bindForms(){
    document.getElementById('formLogin').onsubmit = async (e)=>{
      e.preventDefault()
      const email = document.getElementById('loginEmail').value.trim()
      const password = document.getElementById('loginPassword').value
      await this.presenter.login(email, password)
    }
    document.getElementById('formRegister').onsubmit = async (e)=>{
      e.preventDefault()
      const name = document.getElementById('regName').value.trim()
      const email = document.getElementById('regEmail').value.trim()
      const password = document.getElementById('regPassword').value
      await this.presenter.register(name, email, password)
    }
  }
  onLoginSuccess(name){
    alert('Login berhasil, selamat datang ' + (name || ''))
    location.hash = '#/'
  }
  onRegisterSuccess(){
    alert('Registrasi berhasil. Silakan login.')
    document.getElementById('tabLogin').click()
  }
  onError(msg){
    alert(msg || 'Terjadi kesalahan')
  }
}