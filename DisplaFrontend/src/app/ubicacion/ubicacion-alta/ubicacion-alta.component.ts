import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ubicacion-alta',
  templateUrl: './ubicacion-alta.component.html',
  styleUrls: ['./ubicacion-alta.component.css']
})
export class UbicacionAltaComponent {

  constructor( 
    public dialogRef: MatDialogRef<UbicacionAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelUbicacion.Nombre != "" && this.data.modelUbicacion.Nombre != undefined) 
      this.dialogRef.close(this.data);
  }

}
