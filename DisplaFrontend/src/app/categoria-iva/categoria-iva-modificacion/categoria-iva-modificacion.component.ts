import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-categoria-iva-modificacion',
  templateUrl: './categoria-iva-modificacion.component.html',
  styleUrls: ['./categoria-iva-modificacion.component.css']
})
export class CategoriaIVAModificacionComponent {

  constructor(
    public dialogRef: MatDialogRef<CategoriaIVAModificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}