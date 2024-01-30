import {  Component } from '@angular/core';
import { MaterialModule } from '@app/material.module';
import { CommonModule } from '@angular/common';

import { AuthService, SnackbarService } from '@services/index';
import { FileUploadComponent } from '@components/shared/file-upload/file-upload.component';
import { SvgLoaderComponent } from '@components/shared/svg-bar/svg-bar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [MaterialModule, CommonModule, FileUploadComponent, SvgLoaderComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent  {
  constructor(
    public authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService) { }
    
  logout(): void {
    this.authService.logout().subscribe((response: any) => {
      this.authService.removeLocalStorageItem();
      this.router.navigateByUrl('/login');
      this.snackbarService.openSuccess(response.message);
    }, (e: any) => {
      this.snackbarService.openError(e.error.message);
    });
  }
}
