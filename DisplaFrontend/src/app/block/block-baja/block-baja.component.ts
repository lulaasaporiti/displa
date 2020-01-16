import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-block-baja',
  templateUrl: './block-baja.component.html',
  styleUrls: ['./block-baja.component.css']
})
export class BlockBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<BlockBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}