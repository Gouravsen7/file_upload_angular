import {  Component } from '@angular/core';
import { MaterialModule } from '@app/material.module';
import { CommonModule } from '@angular/common';

import { AuthService } from '@services/auth.service';
import { FileUploadComponent } from '@components/shared/file-upload/file-upload.component';
import { SvgLoaderComponent } from '@components/shared/svg-bar/svg-bar.component';


@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [MaterialModule, CommonModule, FileUploadComponent, SvgLoaderComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent  {
  constructor( public authService: AuthService) { }
    
  logout(): void{
    this.authService.logout();
  }
}
