import {  Component } from '@angular/core';

import { MaterialModule } from '@app/material.module';
import { AuthService } from '@services/auth.service';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { SvgLoaderComponent } from './svg-bar/svg-bar.component';
import { FileUploadService } from '@app/services/file-upload.service';


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
  selectedItemsPerPage: number = 1;

  constructor( public authService: AuthService, public fileUploadService : FileUploadService) { }

  ngOnInit() {
    this.fetchData();
  }
  

  fetchData(): void {
    this.fileUploadService.getData(this.currentPage).subscribe(
      (result: any) => {
        this.data = result.data;
      },
      (error) => {
        console.error('Error fetching data:', error);
        
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
