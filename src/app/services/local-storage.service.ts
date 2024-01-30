import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LocalStorageService {

  constructor(){}

  public getAccessToken() {
    return localStorage.getItem('token');
  }

  public setAccessToken(val: string) {
    localStorage.setItem('token', val);
  }

  public removeAccessToken(){
    localStorage.removeItem('token');
  }

  public getKeys() {
    return JSON.parse(localStorage.getItem('keys') || '[]');
  }

  public setKeys(val: any) {
    return localStorage.setItem('keys', JSON.stringify(val));
  }

  public removeKeys(){
    localStorage.removeItem('keys');
  }
}
