import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { MaterialModule } from '@app/material.module';
import { AuthService, SnackbarService } from '@services/index';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],  
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, RouterModule],
  standalone: true,
})

export class LoginPageComponent implements OnInit  {

  loginForm!: FormGroup; 
  constructor(
    private router: Router,
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private snackbarService:SnackbarService,) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit(): void {
    const {email, password } = this.loginForm.value;
    this.authService.login({ email, password }).subscribe(
      (response: any) => {
      this.router.navigateByUrl('/dashboard');
      this.snackbarService.openSuccess(response.message);
    }, (e) => {
      this.snackbarService.openError(e.error.message);
    });
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
