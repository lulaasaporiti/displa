import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-ubicacion-baja',
  templateUrl: './ubicacion-baja.component.html',
  styleUrls: ['./ubicacion-baja.component.css']
})
export class UbicacionBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<UbicacionBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}