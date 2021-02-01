import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-block-baja',
  templateUrl: './tipo-block-baja.component.html',
  styleUrls: ['./tipo-block-baja.component.css']
})
export class TipoBlockBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<TipoBlockBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}