import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-servicio-baja',
  templateUrl: './servicio-baja.component.html',
  styleUrls: ['./servicio-baja.component.css']
})
export class ServicioBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<ServicioBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}