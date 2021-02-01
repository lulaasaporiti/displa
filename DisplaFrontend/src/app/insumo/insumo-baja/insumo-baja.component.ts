import { Component, Inject } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-insumo-baja',
  templateUrl: './insumo-baja.component.html',
  styleUrls: ['./insumo-baja.component.css']
})
export class InsumoBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<InsumoBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}