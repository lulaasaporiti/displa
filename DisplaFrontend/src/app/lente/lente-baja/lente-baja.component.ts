import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-lente-baja',
  templateUrl: './lente-baja.component.html',
  styleUrls: ['./lente-baja.component.css']
})
export class LenteBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<LenteBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}