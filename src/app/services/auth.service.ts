import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { SnackbarService } from '@services/snackbar.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient, private router: Router, private snackbarService:SnackbarService) {}

  login(credentials: { email: string, password: string }): void {
    this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .subscribe(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl('/dashboard');
          this.snackbarService.openSuccess(response.message);
        }
      }, (e) => {
        this.snackbarService.openError(e.error.message);
      });
  }

  logout() {
    const accessToken = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/logout`,{ headers: {
      'token': accessToken || '',
    }}).subscribe((response: any) => {
      this.removeLocalStorageItem();
      this.router.navigateByUrl('/login');
      this.snackbarService.openSuccess(response.message);
  
    }, (e) => {
      this.snackbarService.openError(e.error.message);
    });;
    
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  removeLocalStorageItem() {
    localStorage.removeItem('token');
    localStorage.removeItem('keys');
  }
}
