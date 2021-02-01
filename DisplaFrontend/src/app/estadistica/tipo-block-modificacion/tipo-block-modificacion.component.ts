import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-block-modificacion',
  templateUrl: './tipo-block-modificacion.component.html',
  styleUrls: ['./tipo-block-modificacion.component.css']
})
export class TipoBlockModificacionComponent {

  constructor( 
    public dialogRef: MatDialogRef<TipoBlockModificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelTipoBlock.Nombre != "" && this.data.modelTipoBlock.Nombre != undefined) 
      this.dialogRef.close(this.data);
  }
}