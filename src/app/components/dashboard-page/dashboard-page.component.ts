import {  Component } from '@angular/core';

import { MaterialModule } from '@app/material.module';
import { AuthService } from '@services/auth.service';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { SvgLoaderComponent } from './svg-bar/svg-bar.component';
import { FileUploadService } from '@app/services/file-upload.service';
import { SnackbarService } from '@app/services/snackbar.service';


@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [MaterialModule, CommonModule, FileUploadComponent, SvgLoaderComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent  {
  data:any; 
  currentPage: number = 1
  totalSvgRecord: number = 0;
  isLoading:boolean = true;

  constructor( public authService: AuthService, public fileUploadService : FileUploadService,  private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.fetchData();
  }
  

  fetchData(): void {
    this.fileUploadService.getData(this.currentPage).subscribe(
      (result: any) => {
        const { metadata } = result.data
        this.isLoading = false
        this.data = result.data;
        this.totalSvgRecord = metadata.total_records
      },
      (error) => {
        this.snackbarService.openError("Oops! Something went wrong while trying to fetch the data. Please try again later."
        );
        this.isLoading = false
      }
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.fetchData();
  }
  
  logout(): void{
    this.authService.logout();
  }
}
