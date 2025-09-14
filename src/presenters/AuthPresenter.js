// src/presenters/AuthPresenter.js
import { login, register } from '../models/storyApi.js'
import { SessionModel } from '../models/sessionModel.js'

export default class AuthPresenter {
  constructor(view){ this.view = view }

  async login(email, password){
    try{
      const res = await login(email, password) // { name, token }
      SessionModel.setToken(res.token)
      SessionModel.setUserName(res.name || '')
      this.view?.onLoginSuccess?.(res.name)
    }catch(e){
      this.view?.onError?.(e?.message || 'Gagal login')
    }
  }

  async register(name, email, password){
    try{
      await register(name, email, password)
      this.view?.onRegisterSuccess?.()
    }catch(e){
      this.view?.onError?.(e?.message || 'Gagal registrasi')
    }
  }
}