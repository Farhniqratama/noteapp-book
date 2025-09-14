// src/presenters/FavoritesPresenter.js
import { FavoritesModel } from '../models/favoritesModel.js'

export default class FavoritesPresenter {
  constructor(view){ this.view = view }

  async init(){
    const items = await FavoritesModel.list()
    this.view.show(items || [])
    this.view.onDelete = async (id) => {
      await FavoritesModel.remove(id)
      const after = await FavoritesModel.list()
      this.view.show(after || [])
    }
  }
}