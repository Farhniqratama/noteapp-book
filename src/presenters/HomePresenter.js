import { listStories, getToken } from '../models/storyApi.js'
import { getAll, put, clear, STORES } from '../utils/idb.js'

export default class HomePresenter {
  constructor(view){ this.view = view }

  async init(){
    try{
      const cached = await getAll(STORES.stories)
      if (cached?.length) this.view.showStories(cached)

      const token = getToken()
      if (!token){
        this.view.showStories(cached || [])
        return
      }

      const stories = await listStories({ page:1, size:10, location:1 }).catch(()=>[])
      if (stories?.length){
        // normalisasi createdAt agar tampil
        const normalized = stories.map(s => ({ ...s, createdAt: s.createdAt || new Date().toISOString() }))
        this.view.showStories(normalized)
        await clear(STORES.stories)
        for (const s of normalized) await put(STORES.stories, s)
        const points = normalized.filter(s => s.lat && s.lon)
        this.view.initMap(points)
      }
    }catch(e){ console.error(e) }
  }

  async addFavorite(item){
    await put(STORES.favorites, item)
    // UI toast ditangani di View (optimistic)
  }
}