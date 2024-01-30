# Assignment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Prerequisites
Make sure you have the following installed:

Node.js: 18.18.2
Angular CLI: 17.1.0
Angular Material: ^17.1.0

## Requirement
-Type1 file Required

## Assumptions

1. File Upload:
- Type1 CSV File:
- Type1 CSV file is required.

2. Type2 CSV Files:
- Multiple Type2 CSV files are assumed to exist.
- Type2 file names are based on the hole_id column of the Type1 file.

3. SVG Creation:
- SVG total depth Determination.
- SVG's total depth will be determined by the StartPointZ and EndPointZ columns of the Type1 file.

4. SVG Display Name 
- Each SVG will be named using the corresponding Type2 CSV file name.

5. Color Palette:
- Four colors are specified: #eb401d, #fcff42, #2f00f9, #2f7f18.

6. Color Assignment:
- For each Type2 file, identify the maximum value across all columns.
- Divide this maximum value by 4 to create four color groups/ranges.
- Assign a color to each column value based on its group.