import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { Cliente } from 'src/app/model/Cliente';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComprobanteCliente } from 'src/app/model/comprobanteCliente';
import { ComprobanteItem } from 'src/app/model/comprobanteItem';
import { combineLatest } from 'rxjs';
import { VentaVirtual } from 'src/app/model/ventaVirtual';
import { ComprobanteClienteService } from 'src/services/comprobanteCliente.service';
import { RemitoService } from 'src/services/remito.service';
import { Parametro } from 'src/app/model/parametro';
import { Remito } from 'src/app/model/remito';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-factura-detalle',
  templateUrl: './factura-detalle.component.html',
  styleUrls: ['./factura-detalle.component.css']
})
export class FacturaDetalleComponent implements OnInit {
  modelCliente = <Cliente>{};
  parametro = <Parametro>{};
  remitos: Remito [] = [];
  totalRemitos;
  private id: number = 0;
  panelOpenState = false;
  comprobantesItems: ComprobanteItem[] = [];
  ventasVirtuales: VentaVirtual[] = [];
  // displayedColumnsFooter: string[]= ['Subtotal']
  displayedColumns: string[] = ['Cantidad', 'Sobre', 'Descripcion', 'Esferico', 'Cilindrico', 'Recargo', 'Importe'];
  dataSource = new MatTableDataSource<any>();
  key;
  bloquearF = false;
  modelComprobante = <ComprobanteCliente>{};

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private router: Router,
    private segment: ActivatedRoute,
    private remitoService: RemitoService,
    private loadingSpinnerService: LoadingSpinnerService,
    private comprobanteClienteService: ComprobanteClienteService
  ) {
    this.segment.queryParams.subscribe((params: Params) => {
      this.id = +params['id']; // (+) converts string 'id' to a number;
    });
    if (this.id) {
      this.loadingSpinnerService.show();
      combineLatest([
        this.remitoService.getRemitosPendientesCliente(this.id),
        this.comprobanteClienteService.getById(this.id)
      ])
        .subscribe(result => {
          this.remitos = result[0];
          this.modelComprobante = result[1];
          this.modelCliente = this.modelComprobante.IdClienteNavigation;
          this.dataSource.data = this.modelComprobante.ComprobanteItem;
          if (this.modelComprobante.VentaVirtual != []) {
            this.modelComprobante.VentaVirtual.forEach(vv => {
              this.dataSource.data = this.dataSource.data.concat(vv);
            });
          }
          this.loadingSpinnerService.hide();
        });
    }
  }

  ngOnInit() {
    this.loadingSpinnerService.show();
    // this.dataSource = new MatTableDataSource([]);
    // this.dataSource.data = this.modelComprobante.ComprobanteItem;
    this.dataSource.paginator = this.paginator;
    this.loadingSpinnerService.hide();
  }

  cancelar() {
    this.router.navigateByUrl('/Home');
    window.close();
  }

  getSubtotales() {
    if (this.dataSource.data.length > 0 || this.remitos.length > 0) {
      document.getElementById('footers').style.display = 'block';
      this.modelComprobante.SubtotalFactura = 0;
      this.dataSource.data.forEach(to => {
        this.modelComprobante.SubtotalFactura = (+to.Monto + this.modelComprobante.SubtotalFactura);
      })
      return this.modelComprobante.SubtotalFactura;
    }
    else {
      document.getElementById('footers').style.display = 'none';
      this.modelComprobante.SubtotalFactura = 0;
      this.modelComprobante.MontoTotal = 0;
    } 
  }

  getTotalRemito() {
    let totalAux = 0;
    if (this.remitos != undefined && this.remitos.length > 0) {
      this.remitos.forEach(r => {
        r.ComprobanteItem.forEach(co => {
          totalAux = totalAux + co.Monto;
        });
      });
    }
    this.totalRemitos = totalAux;
    return this.totalRemitos.toFixed(2);
  }

  getCantidadProductos() {
    let cantidadAux = 0;
    if (this.remitos != undefined && this.remitos.length > 0) {
      this.remitos.forEach(r => {
        cantidadAux = cantidadAux + r.ComprobanteItem.length;
      });
      return cantidadAux;
    }
  }

  validaciones(row){
    if (row.IdComprobanteItemNavigation != undefined && row.IdComprobanteItemNavigation.Monto > this.parametro.MontoMaximoProductosDiferentes || row.Monto > this.parametro.MontoMaximoProductosDiferentes || row.Monto == 0 && !row.Descripcion.includes('V.Virt +')) 
      return 'conColor';
    if (this.dataSource.data.length > this.parametro.CantidadProductoDiferentes && this.dataSource.data[this.dataSource.data.length-1] == row)
      return 'conColor';
    if (row.Descripcion.includes('V.Virt +0'))
      return 'colorVerde';
  }


  getSubtotalConDescuento() {
    let subtotal = 0;
    this.dataSource.data.forEach(to => {
      if (to.Descripcion != undefined && to.Descripcion.endsWith("VIRTUAL") || to.CantidadVendida != undefined) {
        subtotal = subtotal + to.Monto;
      }
      else {
        subtotal = subtotal + (to.Monto - (to.Monto * this.modelCliente.PorcentajeDescuentoGeneral) / 100);
      }
    })
    return subtotal.toFixed(2);
  }

  getMontoIVA() {
    return (+this.getSubtotalConDescuento() * 0.21).toFixed(2);
  }

  getTotales() {
    if (this.modelCliente.IdCategoriaIvaNavigation != undefined && this.modelCliente.IdCategoriaIvaNavigation.Discrimina == false)
      return (this.modelComprobante.MontoTotal = +this.getSubtotalConDescuento()).toFixed(2);
    else
      return ((
        this.modelComprobante.MontoTotal = +this.getSubtotalConDescuento() * 1.21)).toFixed(2);
  }
 }
