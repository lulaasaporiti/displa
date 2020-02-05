import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-condicion-venta-baja',
  templateUrl: './condicion-venta-baja.component.html',
  styleUrls: ['./condicion-venta-baja.component.css']
})
export class CondicionVentaBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<CondicionVentaBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}