// src/presenters/AuthPresenter.js
import { AuthModel } from '../models/authModel.js'

export default class AuthPresenter {
  constructor(view){ this.view = view }

  async login(email, password){
    try{
      const res = await AuthModel.login(email, password)
      this.view?.onLoginSuccess?.(res.name)
    }catch(e){
      this.view?.onError?.(e?.message || 'Gagal login')
    }
  }

  async register(name, email, password){
    try{
      await AuthModel.register(name, email, password)
      this.view?.onRegisterSuccess?.()
    }catch(e){
      this.view?.onError?.(e?.message || 'Gagal registrasi')
    }
  }
}