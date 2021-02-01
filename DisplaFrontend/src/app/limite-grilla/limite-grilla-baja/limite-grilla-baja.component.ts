import { Component, Inject } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-limite-grilla-baja',
  templateUrl: './limite-grilla-baja.component.html',
  styleUrls: ['./limite-grilla-baja.component.css']
})
export class LimiteGrillaBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<LimiteGrillaBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}