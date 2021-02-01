import { Component, Inject } from '@angular/core';
import { , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-servicio-alta',
  templateUrl: './tipo-servicio-alta.component.html',
  styleUrls: ['./tipo-servicio-alta.component.css']
})
export class TipoServicioAltaComponent {

  constructor( 
    public dialogRef: MatDialogRef<TipoServicioAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelTipoServicio.nombre != "" && this.data.modelTipoServicio.nombre != undefined) 
      this.dialogRef.close(this.data);
  }

}
