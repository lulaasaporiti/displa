import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cuenta-bancaria-baja',
  templateUrl: './cuenta-bancaria-baja.component.html',
  styleUrls: ['./cuenta-bancaria-baja.component.css']
})
export class CuentaBancariaBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<CuentaBancariaBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}