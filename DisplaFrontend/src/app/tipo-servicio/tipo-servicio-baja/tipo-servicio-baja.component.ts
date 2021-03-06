import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-servicio-baja',
  templateUrl: './tipo-servicio-baja.component.html',
  styleUrls: ['./tipo-servicio-baja.component.css']
})
export class TipoServicioBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<TipoServicioBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}