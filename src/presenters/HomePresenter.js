// src/presenters/HomePresenter.js
import { StoryModel } from '../models/storyModel.js'
import { FavoritesModel } from '../models/favoritesModel.js'

export default class HomePresenter {
  constructor(view){ this.view = view }

  async init(){
    try{
      const stories = await StoryModel.listAndCache({ page:1, size:10, location:1 })
      this.view.showStories(stories)
      const points = (stories || []).filter(s => s.lat && s.lon)
      this.view.initMap(points)
    }catch(e){ console.error(e) }
  }

  async addFavorite(item){
    await FavoritesModel.add(item)
  }
}