import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-condicion-venta-alta',
  templateUrl: './condicion-venta-alta.component.html',
  styleUrls: ['./condicion-venta-alta.component.css']
})
export class CondicionVentaAltaComponent {

  constructor(
    public dialogRef: MatDialogRef<CondicionVentaAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
