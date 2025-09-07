// src/utils/idb.js
const DB_NAME = 'pwa-spa-db'
const DB_VER  = 1

export const STORES = {
  stories:   'stories',
  favorites: 'favorites',
}

let _dbp
function openDB(){
  if (_dbp) return _dbp
  _dbp = new Promise((resolve, reject)=>{
    const req = indexedDB.open(DB_NAME, DB_VER)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORES.stories))
        db.createObjectStore(STORES.stories, { keyPath:'id' })
      if (!db.objectStoreNames.contains(STORES.favorites))
        db.createObjectStore(STORES.favorites, { keyPath:'id' })
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror   = () => reject(req.error)
  })
  return _dbp
}

async function store(name, mode='readonly'){
  const db = await openDB()
  return db.transaction(name, mode).objectStore(name)
}

export async function getAll(name){
  const s = await store(name)
  return new Promise((res, rej)=>{
    const rq = s.getAll(); rq.onsuccess=()=>res(rq.result||[]); rq.onerror=()=>rej(rq.error)
  })
}
export async function put(name, value){
  const s = await store(name, 'readwrite')
  return new Promise((res, rej)=>{
    const rq = s.put(value); rq.onsuccess=()=>res(true); rq.onerror=()=>rej(rq.error)
  })
}
export async function del(name, key){
  const s = await store(name, 'readwrite')
  return new Promise((res, rej)=>{
    const rq = s.delete(key); rq.onsuccess=()=>res(true); rq.onerror=()=>rej(rq.error)
  })
}
export async function clear(name){
  const s = await store(name, 'readwrite')
  return new Promise((res, rej)=>{
    const rq = s.clear(); rq.onsuccess=()=>res(true); rq.onerror=()=>rej(rq.error)
  })
}