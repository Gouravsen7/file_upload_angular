import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app/material.module';
import { FileUploadService } from '@app/services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  imports: [ MaterialModule, ReactiveFormsModule, CommonModule],
  standalone: true

})
export class FileUploadComponent implements OnInit {
  uploadForm!: FormGroup;
  errorMessage!: string;
  expectedHeaders: Array<string> = ['HoleId', 'HoleName', 'StartPointX', 'StartPointY', 'StartPointZ', 'EndPointX', 'EndPointY', 'EndPointZ'];    
  fileName!:string;
  type2FileVaild: Array<string> = [] 
  constructor(private fb: FormBuilder, private fileUploadService : FileUploadService) { }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      file: [null, [Validators.required]]
    });
  }

  onFileChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.fileName = file.name;
      this.uploadForm.patchValue({
        file: file
      });
      this.uploadForm.get('file')?.updateValueAndValidity();
    }
    this.checkValidFiles()
  }
  
  onSubmit(): void {
    const file = this.uploadForm.get('file')?.value;
      if (file) {
        this.fileUploadService.uploadFile(file).subscribe((res) => {
          this.type2FileVaild = res;
          localStorage.setItem("key", res)
        })
    } else {
      console.error('File is null. Cannot submit empty file.');
    }
  }
  

  checkValidFiles() {
    const file = this.uploadForm.get('file')?.value;
      const uploadedFileName = this.fileName.toLowerCase().replace(/\.[^/.]+$/, '');
      const value = this.type2FileVaild.some((validFileName: string) => validFileName.toLowerCase() === uploadedFileName);
      if(value) {
        console.log("testing...")
      } else if (file && file.name.endsWith('.csv')) {
        this.fileReader(file);     
      } else {
        this.errorMessage = 'Please select a valid file.';
      }
  } 
  

  fileReader(file: Blob): void  {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const csvContent: string = e.target.result;
      const rows = csvContent.split('\n');
      if (!this.areHeadersValid(rows[0])) {
        this.errorMessage = 'Incorrect or missing headers';
        return;
      }
      if (!this.areValuesValid(rows.slice(1))) {
        return;
      }
      this.errorMessage = '';
    };
    reader.readAsText(file);
  }

   areValuesValid(dataRows: string[]): boolean {
    const invalidRowIndex = dataRows.findIndex((row, index) => {
      const values = row.split(',');
      return values.length !== this.expectedHeaders.length || values.some(value => !value);
    });

    if (invalidRowIndex !== -1) {
      this.errorMessage = `Invalid CSV format: Inconsistent number of columns or non-truthy value found in row.`;
      return false;
    }
    return true;
  }

   areHeadersValid(headerRow: string): boolean {
    const headers = headerRow.split(',');
    return headers.length === this.expectedHeaders.length && this.expectedHeaders.every((header, index) => header === headers[index]);
  }

}
