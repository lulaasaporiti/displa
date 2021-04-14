import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-descuento-alta',
  templateUrl: './tipo-descuento-alta.component.html',
  styleUrls: ['./tipo-descuento-alta.component.css']
})
export class TipoDescuentoAltaComponent {

  constructor( 
    public dialogRef: MatDialogRef<TipoDescuentoAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelTipoDescuento.nombre != "" && this.data.modelTipoDescuento.nombre != undefined) 
      this.dialogRef.close(this.data);
  }

}
