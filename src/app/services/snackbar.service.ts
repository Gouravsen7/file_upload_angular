import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSuccess(message: string, action: string = 'Close'): void {
    this.openSnackBar(message, 'success', action);
  }

  openError(message: string, action: string = 'Close'): void {
    this.openSnackBar(message, 'error', action);
  }

  private openSnackBar(message: string, messageType: 'success' | 'error', action: string = 'Close'): void {
    let panelClass: string[] = [''];
    if (messageType === 'success') {
      panelClass = ['snackbar-success'];
    } else if (messageType === 'error') {
      panelClass = ['snackbar-error'];
    }

    this.snackBar.open(message, action, {
      duration: 300000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: panelClass
    });
  }
}
