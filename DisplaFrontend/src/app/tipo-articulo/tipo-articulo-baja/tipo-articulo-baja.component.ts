import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-articulo-baja',
  templateUrl: './tipo-articulo-baja.component.html',
  styleUrls: ['./tipo-articulo-baja.component.css']
})
export class TipoArticuloBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<TipoArticuloBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}