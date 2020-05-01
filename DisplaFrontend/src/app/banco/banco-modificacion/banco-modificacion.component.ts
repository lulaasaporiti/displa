import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-banco-modificacion',
  templateUrl: './banco-modificacion.component.html',
  styleUrls: ['./banco-modificacion.component.css']
})
export class BancoModificacionComponent {

  constructor( 
    public dialogRef: MatDialogRef<BancoModificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
    }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelBanco.Nombre != "" && this.data.modelBanco.Nombre != undefined) 
      this.dialogRef.close(this.data);
  }

}