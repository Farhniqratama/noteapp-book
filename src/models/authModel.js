// src/models/authModel.js
import { login as apiLogin, register as apiRegister } from './storyApi.js'
import { SessionModel } from './sessionModel.js'

export const AuthModel = {
  async login(email, password) {
    const { token, name } = await apiLogin(email, password)   // <-- HTTP di Model
    SessionModel.setToken(token)
    SessionModel.setUserName(name || '')
    return { token, name }
  },

  async register(name, email, password) {
    // tetap Model yang memanggil API
    return apiRegister(name, email, password)
  }
}