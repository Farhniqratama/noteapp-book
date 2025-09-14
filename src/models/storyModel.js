// src/models/storyModel.js
import { getAll, put as idbPut, clear as idbClear, STORES } from '../utils/idb.js'
import { listStories as apiList, addStory as apiAdd } from './storyApi.js'
import { SessionModel } from './sessionModel.js'

const nowISO = () => new Date().toISOString()
const SEED = [
  { id:'seed-1', name:'Demo 1', description:'Contoh 1', photoUrl:'./public/icons/icon-192.png', lat:-6.2,  lon:106.8,  createdAt: nowISO() },
  { id:'seed-2', name:'Demo 2', description:'Contoh 2', photoUrl:'./public/icons/icon-192.png', lat:-6.21, lon:106.82, createdAt: nowISO() },
  { id:'seed-3', name:'Demo 3', description:'Contoh 3', photoUrl:'./public/icons/icon-192.png', lat:-6.19, lon:106.85, createdAt: nowISO() },
]

async function ensureSeed(){
  const cur = await getAll(STORES.stories)
  if (!cur || cur.length === 0){
    for (const s of SEED) await idbPut(STORES.stories, s)
  }
}

export const StoryModel = {
  async getCached(){
    const data = await getAll(STORES.stories)
    return (data || []).map(s => ({ ...s, createdAt: s.createdAt || nowISO() }))
  },

  async listAndCache({ page=1, size=10, location=1 } = {}){
    const token = SessionModel.getToken()
    if (!token){
      await ensureSeed()
      return this.getCached()
    }
    try{
      const online = await apiList({ page, size, location }, token)
      const normalized = (online || []).map(s => ({
        id:s.id, name:s.name, description:s.description, photoUrl:s.photoUrl,
        lat:s.lat, lon:s.lon, createdAt: s.createdAt || s.created_at || nowISO()
      }))
      await idbClear(STORES.stories)
      for (const it of normalized) await idbPut(STORES.stories, it)
      return normalized
    }catch{
      await ensureSeed()
      return this.getCached()
    }
  },

  async add({ description, photo, lat, lon }){
    const token = SessionModel.getToken()
    if (token){
      const res = await apiAdd({ description, photo, lat, lon }, token)
      const createdLocal = {
        id: res?.story?.id || `srv-${Date.now()}`,
        name: res?.story?.name || 'Saya',
        description, photoUrl: res?.story?.photoUrl || null,
        lat, lon, createdAt: nowISO()
      }
      await idbPut(STORES.stories, createdLocal)
      return createdLocal
    }
    const localItem = {
      id:`local-${Date.now()}`, name:'Guest', description,
      photo, photoUrl:null, lat, lon, createdAt: nowISO()
    }
    await idbPut(STORES.stories, localItem)
    return localItem
  }
}