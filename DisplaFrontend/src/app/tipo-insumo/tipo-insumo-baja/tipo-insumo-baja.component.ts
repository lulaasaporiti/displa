import { Component, Inject } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-insumo-baja',
  templateUrl: './tipo-insumo-baja.component.html',
  styleUrls: ['./tipo-insumo-baja.component.css']
})
export class TipoInsumoBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<TipoInsumoBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}