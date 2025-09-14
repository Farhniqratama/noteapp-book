// src/presenters/AddPresenter.js
import { StoryModel } from '../models/storyModel.js'

export default class AddPresenter {
  constructor(view){
    this.view = view
    this._captured = null
  }
  setCaptured(blob){ this._captured = blob }

  async submit({ description, lat, lon }){
    try{
      if (!description || Number.isNaN(lat) || Number.isNaN(lon)){
        throw new Error('Deskripsi/koordinat tidak valid')
      }
      await StoryModel.add({ description, photo:this._captured, lat, lon })
      this.view?.onSuccess?.('Berhasil menambah!')
    }catch(e){
      this.view?.onError?.(e?.message || 'Gagal menambah story')
    }
  }
}