import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LocalStorageService } from '@services/local-storage.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(map((res: any) => {
        this.localStorageService.setAccessToken(res.token);
        return res;
      }));
  }
  
  logout():Observable<any> {
    return this.http.delete(`${this.apiUrl}/logout`)
  }

  isAuthenticated(): boolean {
    return !!this.localStorageService.getAccessToken();
  }

  removeLocalStorageItem() {
    this.localStorageService.removeAccessToken();
    this.localStorageService.removeKeys();
  }
}
