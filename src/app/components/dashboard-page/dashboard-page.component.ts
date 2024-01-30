import { Component } from '@angular/core';

import { MaterialModule } from '@app/material.module';
import { AuthService } from '@services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [MaterialModule, CommonModule, FileUploadComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent  {
  constructor( public authService: AuthService, private router:Router) { }


  logout(): void{
    this.authService.logout();
  }
}
