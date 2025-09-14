import { openDB } from 'idb'

const DB_NAME = 'pwa-spa'
const DB_VER = 1
export const STORES = { stories: 'stories', favorites: 'favorites' }

const dbp = openDB(DB_NAME, DB_VER, {
  upgrade(db){
    if (!db.objectStoreNames.contains(STORES.stories)) db.createObjectStore(STORES.stories, { keyPath:'id' })
    if (!db.objectStoreNames.contains(STORES.favorites)) db.createObjectStore(STORES.favorites, { keyPath:'id' })
  }
})
export async function getAll(store){ return (await dbp).getAll(store) }
export async function put(store, val){ return (await dbp).put(store, val) }
export async function clear(store){ return (await dbp).clear(store) }
export async function del(store, key){ return (await dbp).delete(store, key) }