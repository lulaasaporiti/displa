import { Component, Inject } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gasto-alta',
  templateUrl: './gasto-alta.component.html',
  styleUrls: ['./gasto-alta.component.css']
})
export class GastoAltaComponent {

  constructor( 
    public dialogRef: MatDialogRef<GastoAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelGasto.Nombre != "" && this.data.modelGasto.Nombre != undefined) 
      this.dialogRef.close(this.data);
  }

}
