import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-tipo-insumo-alta',
  templateUrl: './tipo-insumo-alta.component.html',
  styleUrls: ['./tipo-insumo-alta.component.css']
})
export class TipoInsumoAltaComponent {

  constructor( 
    public dialogRef: MatDialogRef<TipoInsumoAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelTipoInsumo.nombre != "" && this.data.modelTipoInsumo.nombre != undefined) 
      this.dialogRef.close(this.data);
  }

}
