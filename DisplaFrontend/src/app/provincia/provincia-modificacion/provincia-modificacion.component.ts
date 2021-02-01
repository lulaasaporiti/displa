import { Component, Inject } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-provincia-modificacion',
  templateUrl: './provincia-modificacion.component.html',
  styleUrls: ['./provincia-modificacion.component.css']
})
export class ProvinciaModificacionComponent {

  constructor( 
    public dialogRef: MatDialogRef<ProvinciaModificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
    }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelProvincia.Nombre != "" && this.data.modelProvincia.Nombre != undefined) 
      this.dialogRef.close(this.data);
  }

}