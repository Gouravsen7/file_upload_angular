import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app/material.module';
import { FileUploadService } from '@app/services/file-upload.service';
import { SnackbarService } from '@app/services/snackbar.service';
import { EXPECTED_HEADERS, CSV_ERROR_MESSAGES, SUCCESS_MESSAGES } from './constans.js';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  imports: [ MaterialModule, ReactiveFormsModule, CommonModule],
  standalone: true

})
export class FileUploadComponent implements OnInit {
  @ViewChild('fileInput')
  fileInput!: ElementRef;

  fileForm!: FormGroup;
  validType2Files: Array<string> = [];
  hasNotHeaders: boolean = false;
  isFileUploaded: boolean = false;
  fileName!:string;
  errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder, 
    private fileUploadService : FileUploadService, 
    private snackbarService: SnackbarService) 
    { }
  
  ngOnInit() {
    this.fileForm = this.formBuilder.group({
      file: ['']
    });
      const storedData = localStorage.getItem('keys');
      this.validType2Files = storedData ? JSON.parse(storedData) : []; 
  }

  removeFile(): void {
    this.fileInput.nativeElement.value = '';
    this.fileName = '';
    this.errorMessage = '';
    this.isFileUploaded = false;
  }

  onFileChange(event:Event) {
    this.errorMessage = ""
    const csvFile = (event.target as HTMLInputElement)?.files?.[0] as File;
    if (csvFile) {
      this.fileForm.patchValue({
        file: csvFile,
      });
      this.fileForm.get('file')?.updateValueAndValidity();
      this.isFileUploaded = true;
      this.checkValidFiles();
    }
  }


  onSubmit() {
    const selectedFileValue = this.fileForm.get('file')?.value;
    selectedFileValue && this.hasNotHeaders ? this.uploadFileWithHoleId(selectedFileValue) : this.uploadFileWithHeaders(selectedFileValue);
    this.removeFile();
    this.isFileUploaded = false;
  }

  uploadFileWithHeaders(file: Blob): void {
    const formData = new FormData();
    formData.append('file', file);
    this.fileUploadService.uploadFile(formData).subscribe(
      (res) => {
        this.validType2Files = res;
        localStorage.setItem("keys", JSON.stringify(res));
        this.snackbarService.openSuccess(SUCCESS_MESSAGES.FILE_UPLOAD_SUCCESS);

      },
      (error) => {
        console.error('File upload failed:', error);
        this.snackbarService.openError("error");
      }
    );
  }

  uploadFileWithHoleId(file: Blob): void {
    const formData = new FormData();
    formData.append('file', file);
    this.fileUploadService.upLoadFileHoleDetails(formData).subscribe(
      (res) => {
        console.log(res)
      this.snackbarService.openSuccess(SUCCESS_MESSAGES.FILE_UPLOAD_SUCCESS);
    },
    (error) => {
      console.error('File upload failed:', error);
      this.snackbarService.openError("error");
    }
    );
  }

  checkValidFiles() {
    const selectedFileValue = this.fileForm.get('file')?.value;
    this.fileName = selectedFileValue.name
    const uploadedFileName = this.fileName.toLowerCase().replace(/\.[^/.]+$/, '');
    const isValidFileType = this.validType2Files.some((validFileName: string) => validFileName.toLowerCase() === uploadedFileName);
    switch (true) {
      case isValidFileType:
        this.hasNotHeaders = false; 
        this.readCSVFile(selectedFileValue);
        break;
      case selectedFileValue && selectedFileValue.name.endsWith('.csv'):
        this.readCSVFile(selectedFileValue);
        break;
      default:
        this.errorMessage = isValidFileType ? CSV_ERROR_MESSAGES.INVALID_FILE_TYPE : CSV_ERROR_MESSAGES.HEADERS_MISSING;
        break;
    }
  } 
  

  readCSVFile(file: Blob): void  {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const csvContent: string = e.target.result;
      const rows = csvContent.split('\n');

      if (!this.areValuesValid(rows.slice(1))) return;

      if (this.hasNotHeaders && !this.areHeadersValid(rows[0])) {
        this.errorMessage = CSV_ERROR_MESSAGES.MISSING_HEADERS;
        return;
      }
      this.hasNotHeaders = !this.hasNotHeaders;   
      this.errorMessage = '';
    };

    reader.readAsText(file);
  }

  private areValuesValid(dataRows: Array<string>): boolean {
    const invalidRowIndex = dataRows.findIndex((row) => {
      const values = row.split(',');
      return  values.some(value => !value);
    });

    if (invalidRowIndex !== -1) {
      this.errorMessage = CSV_ERROR_MESSAGES.INVALID_CONTENT;
      return false;
    }
    return true;
  }

  private areHeadersValid(headerRow: string): boolean {
    const headers = headerRow.split(',');
    return headers.length === EXPECTED_HEADERS.length && EXPECTED_HEADERS.every((header:string, index: number) => header === headers[index]);
  }

}
