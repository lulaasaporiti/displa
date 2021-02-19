import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cheque-baja',
  templateUrl: './cheque-baja.component.html',
  styleUrls: ['./cheque-baja.component.css']
})
export class ChequeBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<ChequeBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}