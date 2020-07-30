import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-precio-modificacion',
  templateUrl: './precio-modificacion.component.html',
  styleUrls: ['./precio-modificacion.component.css']
})
export class PrecioModificacionComponent {

  constructor( 
    public dialogRef: MatDialogRef<PrecioModificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}