import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private snakbar: MatSnackBar) { }

  success(message: string){
    this.snakbar.open(message,'ُSuccess', {
      direction: 'ltr',
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: 'toast-success'
    });
  }

  error(message: string){
    this.snakbar.open(message,'Internal Server Error!', {
      direction: 'ltr',
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: 'toast-success'
    });
  }

  warning(message: string) {
    this.snakbar.open(message, '', {
      direction: 'ltr',
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: 'toast-success'
    });
  }
}