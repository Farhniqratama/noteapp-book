// src/models/sessionModel.js
const TOKEN_KEY = 'token'
const NAME_KEY  = 'userName'

export const SessionModel = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (t) => t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY),
  clearToken: () => localStorage.removeItem(TOKEN_KEY),

  getUserName: () => localStorage.getItem(NAME_KEY) || '',
  setUserName: (name) => name && name.trim()
    ? localStorage.setItem(NAME_KEY, name)
    : localStorage.removeItem(NAME_KEY),
  clearUserName: () => localStorage.removeItem(NAME_KEY),
}