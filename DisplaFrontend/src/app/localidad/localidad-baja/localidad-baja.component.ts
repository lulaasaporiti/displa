import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-localidad-baja',
  templateUrl: './localidad-baja.component.html',
  styleUrls: ['./localidad-baja.component.css']
})
export class LocalidadBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<LocalidadBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}