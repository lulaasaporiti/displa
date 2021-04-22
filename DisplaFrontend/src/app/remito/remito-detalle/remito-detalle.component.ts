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
import { AnulacionConfirmacionComponent } from 'src/app/anulacion-confirmacion/anulacion-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';
import { SessionService } from 'src/services/session.service';


@Component({
  selector: 'app-remito-detalle',
  templateUrl: './remito-detalle.component.html',
  styleUrls: ['./remito-detalle.component.css']
})
export class RemitoDetalleComponent implements OnInit {
  modelCliente = <Cliente>{};
  parametro = <Parametro>{};
  remitos: Remito [] = [];
  totalRemitos;
  private id: number = 0;
  idComprobanteItem: number = 0;
  panelOpenState = false;
  comprobantesItems: ComprobanteItem[] = [];
  ventasVirtuales: VentaVirtual[] = [];
  // displayedColumnsFooter: string[]= ['Subtotal']
  displayedColumns: string[] = ['Cantidad', 'Sobre', 'Descripcion', 'Esferico', 'Cilindrico', 'Recargo', 'Importe'];
  dataSource = new MatTableDataSource<any>();
  key;
  bloquearF = false;
  modelRemito = <Remito>{};
  tipoComprobante;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private router: Router,
    public dialog: MatDialog,
    private segment: ActivatedRoute,
    private remitoService: RemitoService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService,
  ) {
    this.segment.queryParams.subscribe((params: Params) => {
      this.id = +params['id']; // (+) converts string 'id' to a number;
      this.idComprobanteItem = +params['idItem']; // (+) converts string 'id' to a number;
    });
    this.tipoComprobante = this.router.url.split('/')[this.router.url.split('/').length-2]
    if (this.id) {
      this.loadingSpinnerService.show();
      combineLatest([
        this.remitoService.getById(this.id)
      ])
        .subscribe(result => {
          this.modelRemito = result[0];
          console.log(this.modelRemito, "REMITO")
          this.modelCliente = this.modelRemito.IdClienteNavigation;
          this.dataSource.data = this.modelRemito.ComprobanteItem;
          // if (this.modelRemito.VentaVirtual != []) {
          //   this.modelRemito.VentaVirtual.forEach(vv => {
          //     this.dataSource.data = this.dataSource.data.concat(vv);
          //   });
          // }
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

  // getSubtotales() {
  //   if (this.dataSource.data.length > 0 || this.remitos.length > 0) {
  //     document.getElementById('footers').style.display = 'block';
  //     this.modelComprobante.SubtotalFactura = 0;
  //     this.dataSource.data.forEach(to => {
  //       this.modelComprobante.SubtotalFactura = (+to.Monto + this.modelComprobante.SubtotalFactura);
  //     })
  //     return this.modelRemito.SubtotalFactura;
  //   }
  //   else {
  //     document.getElementById('footers').style.display = 'none';
  //     this.modelRemito.SubtotalFactura = 0;
  //     this.modelRemito.MontoTotal = 0;
  //   } 
  // }

  comprobante(){
    if (this.tipoComprobante == "Factura")
      return '';
    else
      return 'panel-credito-debito';
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
    if (row.Id != undefined && row.Id == this.idComprobanteItem) 
      return 'conColor';
  }


  openDialogAnulacion(){
    const dialogRef = this.dialog.open(AnulacionConfirmacionComponent, {
      width: '550px',
      data: { model: this.modelRemito }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.remitoService.saveOrUpdateRemito(result).subscribe(
          data => {
            this.sessionService.showSuccess("El recibo se ha anulado correctamente.");
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El recibo no se anuló.");
          }
        );
      }
    });
  }

  // getSubtotalConDescuento() {
  //   let subtotal = 0;
  //   this.dataSource.data.forEach(to => {
  //     if (to.Descripcion != undefined && to.Descripcion.endsWith("VIRTUAL") || to.CantidadVendida != undefined) {
  //       subtotal = subtotal + to.Monto;
  //     }
  //     else {
  //       subtotal = subtotal + (to.Monto - (to.Monto * this.modelCliente.PorcentajeDescuentoGeneral) / 100);
  //     }
  //   })
  //   return subtotal.toFixed(2);
  // }

  // getMontoIVA() {
  //   return (+this.getSubtotalConDescuento() * 0.21).toFixed(2);
  // }

  // getTotales() {
  //   if (this.modelCliente.IdCategoriaIvaNavigation != undefined && this.modelCliente.IdCategoriaIvaNavigation.Discrimina == false)
  //     return (this.modelComprobante.MontoTotal = +this.getSubtotalConDescuento()).toFixed(2);
  //   else
  //     return ((
  //       this.modelComprobante.MontoTotal = +this.getSubtotalConDescuento() * 1.21)).toFixed(2);
  // }
 }
