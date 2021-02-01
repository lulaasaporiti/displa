import { Component, Inject } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ubicacion-modificacion',
  templateUrl: './ubicacion-modificacion.component.html',
  styleUrls: ['./ubicacion-modificacion.component.css']
})
export class UbicacionModificacionComponent {

  constructor( 
    public dialogRef: MatDialogRef<UbicacionModificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
    }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelUbicacion.Nombre != "" && this.data.modelUbicacion.Nombre != undefined) 
      this.dialogRef.close(this.data);
  }

}