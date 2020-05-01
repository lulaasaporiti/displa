import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-banco-baja',
  templateUrl: './banco-baja.component.html',
  styleUrls: ['./banco-baja.component.css']
})
export class BancoBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<BancoBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}