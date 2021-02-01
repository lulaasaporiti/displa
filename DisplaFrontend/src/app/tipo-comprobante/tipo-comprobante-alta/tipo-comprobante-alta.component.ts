import { Component, Inject } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-comprobante-alta',
  templateUrl: './tipo-comprobante-alta.component.html',
  styleUrls: ['./tipo-comprobante-alta.component.css']
})
export class TipoComprobanteAltaComponent {

  constructor( 
    public dialogRef: MatDialogRef<TipoComprobanteAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelTipoComprobante.nombre != "" && this.data.modelTipoComprobante.nombre != undefined) 
      this.dialogRef.close(this.data);
  }

}
