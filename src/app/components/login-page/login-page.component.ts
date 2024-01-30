import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@app/material.module';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],  
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, RouterModule],
  standalone: true,
})

export class LoginPageComponent implements OnInit  {

  loginForm!: FormGroup; 
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit(): void {
    const {email, password } = this.loginForm.value;
    this.authService.login({ email, password });
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
