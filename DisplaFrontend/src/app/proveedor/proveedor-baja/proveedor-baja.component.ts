import { Component, Inject } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-proveedor-baja',
  templateUrl: './proveedor-baja.component.html',
  styleUrls: ['./proveedor-baja.component.css']
})
export class ProveedorBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<ProveedorBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}