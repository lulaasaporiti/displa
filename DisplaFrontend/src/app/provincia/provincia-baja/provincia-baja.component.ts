import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-provincia-baja',
  templateUrl: './provincia-baja.component.html',
  styleUrls: ['./provincia-baja.component.css']
})
export class ProvinciaBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<ProvinciaBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}