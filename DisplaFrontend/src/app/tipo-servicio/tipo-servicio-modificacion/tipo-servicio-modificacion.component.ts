import { Component, Inject } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-servicio-modificacion',
  templateUrl: './tipo-servicio-modificacion.component.html',
  styleUrls: ['./tipo-servicio-modificacion.component.css']
})
export class TipoServicioModificacionComponent {

  constructor( 
    public dialogRef: MatDialogRef<TipoServicioModificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelTipoServicio.Nombre != "" && this.data.modelTipoServicio.Nombre != undefined) 
      this.dialogRef.close(this.data);
  }
}