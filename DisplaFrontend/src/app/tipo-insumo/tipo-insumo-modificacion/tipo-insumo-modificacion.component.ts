import { Component, Inject } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-insumo-modificacion',
  templateUrl: './tipo-insumo-modificacion.component.html',
  styleUrls: ['./tipo-insumo-modificacion.component.css']
})
export class TipoInsumoModificacionComponent {

  constructor( 
    public dialogRef: MatDialogRef<TipoInsumoModificacionComponent>,
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