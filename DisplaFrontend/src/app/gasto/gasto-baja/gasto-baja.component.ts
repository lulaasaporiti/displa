import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gasto-baja',
  templateUrl: './gasto-baja.component.html',
  styleUrls: ['./gasto-baja.component.css']
})
export class GastoBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<GastoBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}