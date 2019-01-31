import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

const KEY = environment.storageRoomId;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  

  constructor() { }

  setRoomId(roomId: string) {
    localStorage.setItem(KEY, roomId);
  }

  getRoomId() {
    return localStorage.getItem(KEY);
  }

  removeRoomId() {
    localStorage.removeItem(KEY);
  }

}
