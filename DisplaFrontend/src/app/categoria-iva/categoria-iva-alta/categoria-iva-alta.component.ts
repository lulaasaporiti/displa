import { Component, Inject } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-categoria-iva-alta',
  templateUrl: './categoria-iva-alta.component.html',
  styleUrls: ['./categoria-iva-alta.component.css']
})
export class CategoriaIVAAltaComponent {

  constructor(
    public dialogRef: MatDialogRef<CategoriaIVAAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
