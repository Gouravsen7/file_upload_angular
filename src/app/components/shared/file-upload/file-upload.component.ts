import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';

import { LocalStorageService, SnackbarService, FileUploadService, SharedService } from '@app/services';
import { EXPECTED_HEADERS, CSV_ERROR_MESSAGES, SUCCESS_MESSAGES } from './constants';
import { FileUpload, CsvFileValdiation } from './file-upload.interface.js';
import { stringify } from 'querystring';

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
  @Output() fetchDataEvent: EventEmitter<void> = new EventEmitter<void>();
  fileForm!: FormGroup;
  validType2Files: Array<string> = [];

  fileObj: FileUpload = {
    fileName: "",
    type: "",
    errorMessage: "",
    isFileUploaded: false
  }; 

  constructor(
    private formBuilder: FormBuilder, 
    private fileUploadService : FileUploadService, 
    private snackbarService: SnackbarService,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService
    ) 
    { }
  
  ngOnInit() {
    this.fileForm = this.formBuilder.group({
      file: ['', [Validators.required]]
    });
    this.validType2Files = this.localStorageService.getKeys();
  }

  removeFile(): void {
    this.fileInput.nativeElement.value = '';
    this.fileObj.fileName = '';
    this.fileObj.errorMessage = '';
    this.fileObj.isFileUploaded = false;
  }

  onFileChange(event:Event) {
    this.fileObj.errorMessage = ""
    const csvFile = (event.target as HTMLInputElement)?.files?.[0] as File;
    if (csvFile) {
      this.fileForm.patchValue({
        file: csvFile,
      });
      this.fileForm.get('file')?.updateValueAndValidity();
      this.fileObj.isFileUploaded = true;
      this.checkValidFiles();
    }
  }

  onSubmit() {
    const selectedFileValue = this.fileForm.get('file')?.value;
    selectedFileValue && this.fileObj.type === "type1" ?  this.uploadFileWithType1(selectedFileValue) : this.uploadFileWithType2(selectedFileValue)
    this.removeFile();
    this.fileObj.isFileUploaded = false;
  }

  uploadFileWithType1(file: Blob): void {
    const formData = new FormData();
    formData.append('file', file);
    this.fileUploadService.uploadFile(formData).subscribe(
      (res) => {
        this.validType2Files = res;
        this.localStorageService.setKeys(res);
        this.snackbarService.openSuccess(SUCCESS_MESSAGES.FILE_UPLOAD_SUCCESS);
      },
      (error) => {
        this.snackbarService.openError("File upload failed:");
      }
    );
  }

  uploadFileWithType2(file: Blob): void {
    const formData = new FormData();
    formData.append('file', file);
    this.fileUploadService.upLoadFileHoleDetails(formData).subscribe(
      (res) => {
        this.sharedService.fetchSvgData();       
        this.snackbarService.openSuccess(SUCCESS_MESSAGES.FILE_UPLOAD_SUCCESS);
    },
    (error) => {
      this.snackbarService.openError("File upload failed");
    }
    );
  }

  checkValidFiles() {
    const selectedFileValue = this.fileForm.get('file')?.value;
    this.fileObj.fileName = selectedFileValue.name
    this.readCSVFile(selectedFileValue);
  } 
    
  readCSVFile(file: Blob): void {
    const reader = new FileReader();
    reader.onload = (e :ProgressEvent<any>) => {
      const csvContent: string = e.target.result;
      const rows = csvContent.split('\n');
      const uploadedFileName = this.fileObj.fileName.toLowerCase().replace(/\.[^/.]+$/, '')
      const csvProcessingResult: CsvFileValdiation = {
        headers: this.areHeadersValid(rows[0]),
        valueValid: this.areValuesValid(rows.slice(1)),
      };

      if (this.validType2Files.length > 0) {
        csvProcessingResult.isValidFileType = this.validType2Files.some((validFileName: any) => validFileName.hole_id.toLowerCase() === uploadedFileName);
      }
      
      this.handleFileValidation(csvProcessingResult);
    };
    reader.readAsText(file);
  }

  handleFileValidation(val: CsvFileValdiation) {
    if(!val.valueValid) return;

    const fileType = {
      isType1File: val.headers && val.valueValid,
      isType2File: val.isValidFileType && val.valueValid
    }

    if (fileType.isType1File || fileType.isType2File) {
      this.fileObj.type = val.headers ? "type1" : "type2"
    } else {
      const checkValidFile = (!val.isValidFileType && val.isValidFileType !== undefined)
      this.fileObj.errorMessage = checkValidFile ?  CSV_ERROR_MESSAGES.NO_MATCH_FILE : CSV_ERROR_MESSAGES.TYPE1_FILE_REQUIRED ;
    }
  }

  private areValuesValid(dataRows: Array<string>): boolean {
    const invalidRowIndex = dataRows.findIndex((row) => {
      const values = row.split(',');
      return  values.some(value => !value);
    });

    if (invalidRowIndex !== -1) {
      this.fileObj.errorMessage = CSV_ERROR_MESSAGES.INVALID_CONTENT;
      return false;
    }
    return true;
  }
  
  private areHeadersValid(headerRow: string): boolean {
    const spiltHeaders = headerRow.split(',');
    return spiltHeaders.length === EXPECTED_HEADERS.length && EXPECTED_HEADERS.every((header:string, index: number) => header === spiltHeaders[index]);
  }
}
