import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-venta-virtual-modificacion',
  templateUrl: './venta-virtual-modificacion.component.html',
  styleUrls: ['./venta-virtual-modificacion.component.css']
})
export class VentaVirtualModificacionComponent implements OnInit {
  cantidadRestante;
  constructor(
    public dialogRef: MatDialogRef<VentaVirtualModificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.cantidadRestante =  this.data.venta.CantidadVendida - this.data.venta.CantidadEntregada;
  }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}