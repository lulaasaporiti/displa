import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material/core';
import { VentaVirtualService } from 'src/services/venta.virtual.service';

@Component({
  selector: 'app-venta-virtual-movimientos',
  templateUrl: './venta-virtual-movimientos.component.html',
  styleUrls: ['./venta-virtual-movimientos.component.css']
})
export class VentaVirtualMovimientosComponent implements OnInit {
  displayedColumns = ['Fecha', 'NumeroComprobante', 'TipoComprobante', 'Cantidad', 'Entrega', 'Usuario']
  dataSource = new MatTableDataSource<any>();


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;
  
  constructor(
    public dialogRef: MatDialogRef<VentaVirtualMovimientosComponent>,
    private ventaVirtualService: VentaVirtualService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.ventaVirtualService.getMovimientos(data.idVenta
        ).subscribe(m => {
          this.dataSource.data = m;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      });
  }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  abrirComprobante(idComprobante: number){
    let url = `Factura/Detalle?id=${idComprobante}`
    window.open(url, '_blank');
  }
}