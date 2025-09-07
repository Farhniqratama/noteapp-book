import { getAll, del, STORES } from '../utils/idb.js'

export default class FavoritesPresenter {
  constructor(view){ this.view = view }

  async init(){
    const items = await getAll(STORES.favorites)
    this.view.show(items || [])
    this.view.onDelete = async (id) => {
      await del(STORES.favorites, id)
      const after = await getAll(STORES.favorites)
      this.view.show(after || [])
    }
  }
}