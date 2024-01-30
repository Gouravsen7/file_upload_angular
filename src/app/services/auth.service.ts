import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { SnackbarService } from '@services/snackbar.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:3000'; 
  private isAuthenticatedEmitter = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private router: Router, private snackbarService:SnackbarService) {}

  login(credentials: { email: string, password: string }): void {
    this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .subscribe(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl('/dashboard');
          this.isAuthenticatedEmitter.emit(true);
          this.snackbarService.openSnackBar(response.message);
        }
      }, error => {
        console.error('Error', error);
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    this.isAuthenticatedEmitter.emit(false);
    this.snackbarService.openSnackBar("You have logged out successfully");
  }

  isAuthenticated(): boolean {
    // !!localStorage.getItem('token') ||
    return  true;
  }

  getIsAuthenticatedEmitter(): EventEmitter<boolean> {
    return this.isAuthenticatedEmitter;
  }
}
