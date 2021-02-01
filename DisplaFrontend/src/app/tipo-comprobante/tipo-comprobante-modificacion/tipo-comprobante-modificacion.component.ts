import { Component, Inject } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-comprobante-modificacion',
  templateUrl: './tipo-comprobante-modificacion.component.html',
  styleUrls: ['./tipo-comprobante-modificacion.component.css']
})
export class TipoComprobanteModificacionComponent {

  constructor( 
    public dialogRef: MatDialogRef<TipoComprobanteModificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelTipoInsumo.Nombre != "" && this.data.modelTipoInsumo.Nombre != undefined) 
      this.dialogRef.close(this.data);
  }
}