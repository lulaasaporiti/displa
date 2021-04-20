import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-anulacion-confirmacion',
  templateUrl: './anulacion-confirmacion.component.html',
  styleUrls: ['./anulacion-confirmacion.component.css']
})
export class AnulacionConfirmacionComponent {

  constructor( 
    public dialogRef: MatDialogRef<AnulacionConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}