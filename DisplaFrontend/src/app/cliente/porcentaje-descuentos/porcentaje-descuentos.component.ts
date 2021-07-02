import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-porcentaje-descuentos',
  templateUrl: './porcentaje-descuentos.component.html',
  styleUrls: ['./porcentaje-descuentos.component.css']
})
export class PorcentajeDescuentosComponent {

  constructor( 
    public dialogRef: MatDialogRef<PorcentajeDescuentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}