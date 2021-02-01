import { Component, Inject } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-precio-actualizacion',
  templateUrl: './precio-actualizacion.component.html',
  styleUrls: ['./precio-actualizacion.component.css']
})
export class PrecioActualizacionComponent {

  constructor( 
    public dialogRef: MatDialogRef<PrecioActualizacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}