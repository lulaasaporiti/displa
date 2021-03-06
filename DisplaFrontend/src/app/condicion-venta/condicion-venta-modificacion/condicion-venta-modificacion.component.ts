import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-condicion-venta-modificacion',
  templateUrl: './condicion-venta-modificacion.component.html',
  styleUrls: ['./condicion-venta-modificacion.component.css']
})
export class CondicionVentaModificacionComponent {

  constructor(
    public dialogRef: MatDialogRef<CondicionVentaModificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}