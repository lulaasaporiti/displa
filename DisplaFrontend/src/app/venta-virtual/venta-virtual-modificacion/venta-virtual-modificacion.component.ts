import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-venta-virtual-modificacion',
  templateUrl: './venta-virtual-modificacion.component.html',
  styleUrls: ['./venta-virtual-modificacion.component.css']
})
export class VentaVirtualModificacionComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<VentaVirtualModificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}