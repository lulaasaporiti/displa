import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tarjeta-credito-baja',
  templateUrl: './tarjeta-credito-baja.component.html',
  styleUrls: ['./tarjeta-credito-baja.component.css']
})
export class TarjetaCreditoBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<TarjetaCreditoBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}