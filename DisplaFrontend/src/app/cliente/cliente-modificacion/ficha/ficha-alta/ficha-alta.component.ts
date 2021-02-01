import { Component, Inject } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ficha-alta',
  templateUrl: './ficha-alta.component.html',
  styleUrls: ['./ficha-alta.component.css']
})
export class FichaAltaComponent {

  constructor(
    public dialogRef: MatDialogRef<FichaAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }

}