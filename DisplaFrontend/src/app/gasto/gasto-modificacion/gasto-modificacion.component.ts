import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gasto-modificacion',
  templateUrl: './gasto-modificacion.component.html',
  styleUrls: ['./gasto-modificacion.component.css']
})
export class GastoModificacionComponent {

  constructor( 
    public dialogRef: MatDialogRef<GastoModificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
    }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelGasto.Nombre != "" && this.data.modelGasto.Nombre != undefined) 
      this.dialogRef.close(this.data);
  }

}