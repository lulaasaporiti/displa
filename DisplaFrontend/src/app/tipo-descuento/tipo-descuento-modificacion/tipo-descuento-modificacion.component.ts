import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-descuento-modificacion',
  templateUrl: './tipo-descuento-modificacion.component.html',
  styleUrls: ['./tipo-descuento-modificacion.component.css']
})
export class TipoDescuentoModificacionComponent {

  constructor( 
    public dialogRef: MatDialogRef<TipoDescuentoModificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelTipoDescuento.Nombre != "" && this.data.modelTipoDescuento.Nombre != undefined) 
      this.dialogRef.close(this.data);
  }
}