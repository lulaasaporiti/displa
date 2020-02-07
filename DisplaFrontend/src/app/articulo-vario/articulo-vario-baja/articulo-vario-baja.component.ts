import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-articulo-vario-baja',
  templateUrl: './articulo-vario-baja.component.html',
  styleUrls: ['./articulo-vario-baja.component.css']
})
export class ArticuloVarioBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<ArticuloVarioBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}