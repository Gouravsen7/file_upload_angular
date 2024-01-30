export const  EXPECTED_HEADERS: Array<string> = ['HoleId', 'HoleName', 'StartPointX', 'StartPointY', 'StartPointZ', 'EndPointX', 'EndPointY', 'EndPointZ']

export const CSV_ERROR_MESSAGES = {
    INVALID_FILE_TYPE: 'Invalid file type. Please upload a CSV file.',
    INVALID_VALUE: 'Invalid value. Please check the CSV file values.',
    MISSING_HEADERS: 'Missing headers. Please include all required headers.',
    INVALID_CONTENT: 'Invalid content in the CSV file. Please check the data.',
    HEADERS_MISSING: "Headers are missing. Please upload a file with headers.",

  };

  export const SUCCESS_MESSAGES = {
    FILE_UPLOAD_SUCCESS: 'File uploaded successfully.',
    FILE_REMOVE_SUCCESS: 'File removed successfully',
  };
  