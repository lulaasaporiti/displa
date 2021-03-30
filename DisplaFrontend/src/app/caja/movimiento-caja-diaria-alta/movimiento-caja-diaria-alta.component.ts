import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovimientoCaja } from 'src/app/model/movimientoCaja';


@Component({
  selector: 'app-movimiento-caja-diaria-alta',
  templateUrl: './movimiento-caja-diaria-alta.component.html',
  styleUrls: ['./movimiento-caja-diaria-alta.component.css']
})
export class MovimientoCajaDiariaAltaComponent {
  modelMovimientoCaja = <MovimientoCaja>{};


  constructor(
    public dialogRef: MatDialogRef<MovimientoCajaDiariaAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  onNoClick(): void {
    this.dialogRef.close(false);
  }

  ngOnInit() {
    this.modelMovimientoCaja.Fecha = new Date();
    this.modelMovimientoCaja.Entrada = true;
    this.modelMovimientoCaja.Efectivo = true;
  }

  onEnter(): void {
    if (this.modelMovimientoCaja.Monto != undefined)
      this.dialogRef.close(this.modelMovimientoCaja);
  }

}
