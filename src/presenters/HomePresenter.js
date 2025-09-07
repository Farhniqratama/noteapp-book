// src/presenters/HomePresenter.js
import { StoryModel } from '../models/storyModel.js'
import { FavoritesModel } from '../models/favoritesModel.js'

export default class HomePresenter {
  constructor(view){ this.view = view }

  async init(){
    try{
      const cached = await StoryModel.getCached()
      if (cached?.length){
        this.view.showStories(cached)
        this._initMapSafe(cached)
      } else {
        this.view.showStories([])
      }

      const stories = await StoryModel.listAndCache({ page:1, size:10, location:1 })
      this.view.showStories(stories)
      this._initMapSafe(stories)
    }catch(err){
      console.error('HomePresenter.init error', err)
      const fallback = await StoryModel.getCached()
      this.view.showStories(fallback || [])
      this._initMapSafe(fallback || [])
    }
  }

  _initMapSafe(items){
    const pts = (items || []).filter(s => s.lat && s.lon)
    if (this.view.initMap) this.view.initMap(pts)
  }

  async addFavorite(item){
    await FavoritesModel.add(item)
    alert('Ditambahkan ke Favorit')
  }
}