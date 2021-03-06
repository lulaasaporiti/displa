import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tipo-block-alta',
  templateUrl: './tipo-block-alta.component.html',
  styleUrls: ['./tipo-block-alta.component.css']
})
export class TipoBlockAltaComponent {

  constructor( 
    public dialogRef: MatDialogRef<TipoBlockAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onEnter(): void {
    if (this.data.modelTipoBlock.nombre != "" && this.data.modelTipoBlock.nombre != undefined) 
      this.dialogRef.close(this.data);
  }

}
