// src/models/storyApi.js
const BASE = 'https://story-api.dicoding.dev/v1'

export async function register(name, email, password){
  const r = await fetch(BASE + '/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })
  const j = await r.json(); if (j.error) throw new Error(j.message)
  return j
}

export async function login(email, password){
  const r = await fetch(BASE + '/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const j = await r.json(); if (j.error) throw new Error(j.message)
  return j.loginResult // { userId, name, token }
}

export async function listStories({ page=1, size=10, location=1 }={}, token){
  if (!token) throw new Error('AUTH_REQUIRED')
  const r = await fetch(`${BASE}/stories?page=${page}&size=${size}&location=${location}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  const j = await r.json(); if (j.error) throw new Error(j.message)
  return j.listStory
}

export async function addStory({ description, photo, lat, lon }, token){
  if (!token) throw new Error('AUTH_REQUIRED')
  const fd = new FormData()
  fd.append('description', description)
  if (photo) fd.append('photo', photo, 'photo.jpg')
  if (lat != null) fd.append('lat', lat)
  if (lon != null) fd.append('lon', lon)
  const r = await fetch(BASE + '/stories', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd })
  const j = await r.json(); if (j.error) throw new Error(j.message)
  return j
}

export async function addStoryGuest({ description, photo, lat, lon }){
  const fd = new FormData()
  fd.append('description', description)
  if (photo) fd.append('photo', photo, 'photo.jpg')
  if (lat != null) fd.append('lat', lat)
  if (lon != null) fd.append('lon', lon)
  const r = await fetch(BASE + '/stories/guest', { method:'POST', body: fd })
  const j = await r.json(); if (j.error) throw new Error(j.message)
  return j
}