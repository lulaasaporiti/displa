import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-articulo-modificacion',
  templateUrl: './tipo-articulo-modificacion.component.html',
  styleUrls: ['./tipo-articulo-modificacion.component.css']
})
export class TipoArticuloModificacionComponent {

  constructor( 
    public dialogRef: MatDialogRef<TipoArticuloModificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelTipoArticulo.Nombre != "" && this.data.modelTipoArticulo.Nombre != undefined) 
      this.dialogRef.close(this.data);
  }
}