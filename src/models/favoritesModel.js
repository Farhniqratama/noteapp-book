// src/models/favoritesModel.js
import { getAll, put, del, STORES } from '../utils/idb.js'

export const FavoritesModel = {
  list() {
    return getAll(STORES.favorites)
  },

  add(item) {
    // Pastikan ada id; kalau belum, buat id lokal unik
    const withId = item?.id ? item : { ...item, id: `fav-${Date.now()}` }
    return put(STORES.favorites, withId)
  },

  remove(id) {
    return del(STORES.favorites, id) // gunakan del dari utils/idb.js
  }
}