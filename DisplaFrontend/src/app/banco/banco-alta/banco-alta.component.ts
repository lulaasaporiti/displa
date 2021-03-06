import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-banco-alta',
  templateUrl: './banco-alta.component.html',
  styleUrls: ['./banco-alta.component.css']
})
export class BancoAltaComponent {

  constructor( 
    public dialogRef: MatDialogRef<BancoAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelBanco.Nombre != "" && this.data.modelBanco.Nombre != undefined) 
      this.dialogRef.close(this.data);
  }

}
