import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

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