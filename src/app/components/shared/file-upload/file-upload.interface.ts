 export interface FileUpload {
    fileName: string,
    type: string,
    errorMessage:string,
    isFileUploaded: boolean
  }
  
  export interface CsvFileValdiation {
    headers: boolean,
    valueValid: boolean,
    isValidFileType: boolean
  }