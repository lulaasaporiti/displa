import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-tipo-articulo-alta',
  templateUrl: './tipo-articulo-alta.component.html',
  styleUrls: ['./tipo-articulo-alta.component.css']
})
export class TipoArticuloAltaComponent {

  constructor( 
    public dialogRef: MatDialogRef<TipoArticuloAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelTipoArticulo.nombre != "" && this.data.modelTipoArticulo.nombre != undefined) 
      this.dialogRef.close(this.data);
  }

}
