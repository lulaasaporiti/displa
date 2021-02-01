import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-categoria-iva-baja',
  templateUrl: './categoria-iva-baja.component.html',
  styleUrls: ['./categoria-iva-baja.component.css']
})
export class CategoriaIVABajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<CategoriaIVABajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}