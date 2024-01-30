export const  EXPECTED_HEADERS: Array<string> = ['HoleId', 'HoleName', 'StartPointX', 'StartPointY', 'StartPointZ', 'EndPointX', 'EndPointY', 'EndPointZ']

export const CSV_ERROR_MESSAGES = {
  INVALID_VALUE: `Please ensure the following points:<br>
    1. Type1 CSV file is required.<br>
    2. Non-truthy values and correct headers.<br>
    3. Non-empty or missing headers.`,
  INVALID_CONTENT: 'Invalid content in the CSV file. Please check the data.',
  NO_MATCH_FILE: "No matching record found for the uploaded CSV file.",
  TYPE1_FILE_REQUIRED: "Type1 CSV file is required."
};

export const SUCCESS_MESSAGES = {
  FILE_UPLOAD_SUCCESS: 'File uploaded successfully.',
  FILE_REMOVE_SUCCESS: 'File removed successfully',
};
