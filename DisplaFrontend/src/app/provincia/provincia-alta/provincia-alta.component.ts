import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-provincia-alta',
  templateUrl: './provincia-alta.component.html',
  styleUrls: ['./provincia-alta.component.css']
})
export class ProvinciaAltaComponent {

  constructor( 
    public dialogRef: MatDialogRef<ProvinciaAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelProvincia.Nombre != "" && this.data.modelProvincia.Nombre != undefined) 
      this.dialogRef.close(this.data);
  }

}
