import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cheque-alta',
  templateUrl: './cheque-alta.component.html',
  styleUrls: ['./cheque-alta.component.css']
})
export class ChequeAltaComponent {

  constructor(
    public dialogRef: MatDialogRef<ChequeAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
