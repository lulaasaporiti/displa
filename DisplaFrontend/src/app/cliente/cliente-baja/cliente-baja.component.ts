import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente-baja',
  templateUrl: './cliente-baja.component.html',
  styleUrls: ['./cliente-baja.component.css']
})
export class ClienteBajaComponent {

  constructor( 
    public dialogRef: MatDialogRef<ClienteBajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}