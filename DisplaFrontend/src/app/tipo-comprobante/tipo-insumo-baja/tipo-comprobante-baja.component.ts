import { Component, Inject } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-comprobante-baja',
  templateUrl: './tipo-comprobante-baja.component.html',
  styleUrls: ['./tipo-comprobante-baja.component.css']
})
export class TipoComprobanteBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<TipoComprobanteBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}