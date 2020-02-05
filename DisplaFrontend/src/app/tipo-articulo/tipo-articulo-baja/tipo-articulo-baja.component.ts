import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-tipo-articulo-baja',
  templateUrl: './tipo-articulo-baja.component.html',
  styleUrls: ['./tipo-articulo-baja.component.css']
})
export class TipoArticuloBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<TipoArticuloBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}