import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { ClienteService } from 'src/services/cliente.service';
import { Cliente } from 'src/app/model/Cliente';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SessionService } from 'src/services/session.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ComprobanteCliente } from 'src/app/model/comprobanteCliente';
import { ComprobanteItem } from 'src/app/model/comprobanteItem';
import { ComprobanteItemLente } from 'src/app/model/comprobanteItemLente';
import { ProductoArticuloComponent } from '../factura-producto/producto-articulo/producto-articulo.component';
import { combineLatest } from 'rxjs';
// import { ProductoServicioComponent } from '../factura-producto/producto-servicio/producto-servicio.component';
import { ProductoLibreComponent } from '../factura-producto/producto-libre/producto-libre.component';
import { ProductoDescuentoComponent } from '../factura-producto/producto-descuento/producto-descuento.component';
import { ProductoTotalesComponent } from '../factura-producto/producto-totales/producto-totales.component';
import { ProductoServicioComponent } from '../factura-producto/producto-servicio/producto-servicio.component';
import { ProductoLenteComponent } from '../factura-producto/producto-lente/producto-lente.component';
import { FacturaFichaComponent } from '../factura-ficha/factura-ficha.component';
import { Ficha } from 'src/app/model/ficha';
import { VentaVirtual } from 'src/app/model/ventaVirtual';
import { LenteVentaVirtualComponent } from '../factura-producto/producto-lente/lente-venta-virtual/lente-venta-virtual.component';
import { ComprobanteClienteService } from 'src/services/comprobanteCliente.service';


@Component({
  selector: 'app-factura-alta',
  templateUrl: './factura-alta.component.html',
  styleUrls: ['./factura-alta.component.css']
})
export class FacturaAltaComponent implements OnInit {
  modelCliente = <Cliente>{};
  plazoActual = 0;
  private id: number = 0;
  panelOpenState = false;
  comprobantesItems: ComprobanteItem[] = [];
  ventasVirtuales: VentaVirtual[] = [];
  // displayedColumnsFooter: string[]= ['Subtotal']
  displayedColumns: string[] = ['Cantidad', 'Sobre', 'Descripcion', 'Esferico', 'Cilindrico', 'Recargo', 'Importe', 'Borrar'];
  productos: string[] = ['Lentes (F1)', 'Varios (F3)', 'Servicios (F4)', 'Libres (F5)', 'Descuento (F6)', 'Totales (F7)'];
  dataSource = new MatTableDataSource<any>();
  key;
  modelComprobante = <ComprobanteCliente>{};

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    switch (this.key) {
      case "F1": { //lentes
        this.dialog.closeAll();
        const dialogRef = this.dialog.open(ProductoLenteComponent, {
          disableClose: true,
          data: { idCliente: this.id, utilizaSobre: this.modelCliente.UtilizaSobre },
          width: '965px',
          height: '625px'
        })
        dialogRef.afterClosed().subscribe(result => {
          if (result != undefined && result != false) {
            this.cargarLente(result);
          }
        });
        event.preventDefault();
        break;
      }
      case "F3": { //varios
        this.dialog.closeAll();
        this.comprobantesItems = [];
        this.ventasVirtuales = [];
        const dialogRef = this.dialog.open(ProductoArticuloComponent, {
          disableClose: true,
          data: { idCliente: this.id, utilizaSobre: this.modelCliente.UtilizaSobre, comprobantesItems: this.comprobantesItems, ventasVirtuales: this.ventasVirtuales },
          width: '800px',
          height: '500px'
        })
        dialogRef.afterClosed().subscribe(result => {
          if (result != undefined && result != false) {
            this.cargarArticuloServicio();
          }
        });
        event.preventDefault();
        break;
      }
      case "F4": { //servicios
        this.dialog.closeAll();
        this.comprobantesItems = [];
        this.ventasVirtuales = [];
        const dialogRef = this.dialog.open(ProductoServicioComponent, {
          disableClose: true,
          data: { idCliente: this.id, utilizaSobre: this.modelCliente.UtilizaSobre, comprobantesItems: this.comprobantesItems, ventasVirtuales: this.ventasVirtuales },
          width: '800px',
          height: '500px'
        })
        dialogRef.afterClosed().subscribe(result => {
          if (result != undefined && result != false) {
            this.cargarArticuloServicio();
          }
        });
        event.preventDefault();
        break;
      }
      case "F5": { //libres
        this.dialog.closeAll();
        const dialogRef = this.dialog.open(ProductoLibreComponent, {
          disableClose: true,
          data: { idCliente: this.id, utilizaSobre: this.modelCliente.UtilizaSobre },
          width: '500px',
          height: '375px'
        })
        dialogRef.afterClosed().subscribe(result => {
          if (result != undefined && result != false) {
            this.cargarLibre(result);
          }
        });
        event.preventDefault();
        break;
      }
      case "F6": { //descuento
        this.dialog.closeAll();
        const dialogRef = this.dialog.open(ProductoDescuentoComponent, {
          disableClose: true,
          data: { idCliente: this.id },
          width: '500px',
          height: '375px'
        })
        dialogRef.afterClosed().subscribe(result => {
          if (result != undefined && result != false) {
            this.cargarDescuento(result);
          }
        });
        event.preventDefault();
        break;
      }
      case "F7": { //totales
        this.dialog.closeAll();
        const dialogRef = this.dialog.open(ProductoTotalesComponent, {
          disableClose: true,
          data: { idCliente: this.id, utilizaSobre: this.modelCliente.UtilizaSobre },
          width: '500px',
          // height:'350px'
        })
        event.preventDefault();
        break;
      }
      case "F9": { //venta virtual lente
          this.dialog.closeAll();
          const dialogRef = this.dialog.open(LenteVentaVirtualComponent, {
          disableClose: true,
          data: { idCliente: this.id, utilizaSobre: this.modelCliente.UtilizaSobre },
          width: '700px',
          // height:'350px'
        })
        dialogRef.afterClosed().subscribe(result => {
          if (result != undefined && result != false) {
            this.cargarVentaVirtual(result);
          }
        });
        event.preventDefault();
        break;
      }
      default:
        break;
    }
  }

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private clienteService: ClienteService,
    private segment: ActivatedRoute,
    private dialog: MatDialog,
    private changeDetector: ChangeDetectorRef,
    private loadingSpinnerService: LoadingSpinnerService,
    private comprobanteClienteService: ComprobanteClienteService
  ) {
    this.segment.queryParams.subscribe((params: Params) => {
      this.id = +params['id']; // (+) converts string 'id' to a number;
    });
    if (this.id) {
      this.loadingSpinnerService.show();
      combineLatest(
        this.clienteService.getById(this.id),
        this.clienteService.getDiasPlazo(this.id)
      )
        .subscribe(result => {
          this.modelCliente = result[0];
          this.modelComprobante.IdCliente = this.id;
          this.modelComprobante.ComprobanteItem = [];
          this.modelComprobante.VentaVirtual = [];
          this.modelComprobante.IdTipoComprobante = 1;
          this.modelComprobante.IdUsuario = +this.sessionService.getPayload()['idUser'];

          if (this.modelCliente.IdCategoriaIva == 2) {
            this.modelComprobante.Letra = 'B'
          } else {
            this.modelComprobante.Letra = 'A'
          }
          this.plazoActual = +result[1];
          this.loadingSpinnerService.hide();
        });
    }
  }

  ngOnInit() {
    this.loadingSpinnerService.show();
    this.dataSource = new MatTableDataSource([]);
    this.loadingSpinnerService.hide();
  }

  cancelar() {
    this.router.navigateByUrl('/Home')
  }


  cargarLente(producto) {
    let item = <ComprobanteItem>{};
    item.ComprobanteItemLente = [];
    item.Cantidad = 0;
    item.Monto = 0;
    item.NumeroSobre = producto[0].Sobre;
    item.Descripcion = producto[0].IdLenteNavigation.DescripcionFactura;
    producto.forEach(p => {
      let itemLente = <ComprobanteItemLente>{};
      itemLente.IdLente = p.IdLente;
      itemLente.Precio = p.Precio;
      item.Cantidad = item.Cantidad + p.Cantidad;
      item.Monto = item.Monto + (p.Cantidad * p.Precio);
      itemLente.Cantidad = p.Cantidad;
      itemLente.MedidaCilindrico = p.MedidaCilindrico;
      itemLente.MedidaEsferico = p.MedidaEsferico;
      item.ComprobanteItemLente.push(itemLente);
    })
    this.dataSource.data = this.dataSource.data.concat(item);
    this.modelComprobante.ComprobanteItem.push(item);
    this.sessionService.showSuccess("Los productos se agregaron correctamente")
  }
  
  cargarVentaVirtual(venta){
    let item = <VentaVirtual>{};
    item = venta;
    item.IdUsuario = +this.sessionService.getPayload()['idUser'];
    item.CantidadEntregada = 0;
    item.Descripcion = venta.IdLenteNavigation.Nombre + ' V. VIRTUAL';
    item.IdLenteNavigation = null;
    item.Monto = +item.Monto * +item.CantidadVendida;
    // item.Descripcion = venta.IdLenteNavigation.DescripcionFactura;
    this.dataSource.data = this.dataSource.data.concat(item);
    this.modelComprobante.VentaVirtual.push(item);
  }


  getSubTotales() {
    if (this.dataSource.data.length > 0) {
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
      return (this.modelComprobante.MontoTotal = +this.getSubtotalConDescuento() * 1.21).toFixed(2);
  }

  cargarArticuloServicio() {
    this.comprobantesItems.forEach(p => {
      let venta = this.ventasVirtuales.filter(v => (v.IdArticulo != undefined && v.IdArticulo == p.IdArticulo) || (v.IdServicio != undefined && v.IdServicio == p.IdServicio))[0];
      if (venta.Monto != undefined) {
        venta.CantidadVendida = p.Cantidad;
        venta.Monto = Math.round((+venta.Monto * +p.Cantidad) * 100) / 100;
        venta.Descripcion = p.Descripcion + ' V. VIRTUAL';
        venta.IdUsuario = +this.sessionService.getPayload()['idUser'];
        this.modelComprobante.VentaVirtual.push(venta);
        this.dataSource.data = this.dataSource.data.concat(venta);  
      } else {
        p.Monto = Math.round((p.Monto * +p.Cantidad) * 100) / 100;
        this.modelComprobante.ComprobanteItem.push(p);
        this.dataSource.data = this.dataSource.data.concat(p);
      }
      this.changeDetector.detectChanges();
    });
    this.sessionService.showSuccess("Los productos se agregaron correctamente");
  }


  cargarLibre(producto) {
    producto.Monto = ((producto.Monto * +producto.Cantidad) * 100) / 100;
    if (this.modelCliente.IdCategoriaIvaNavigation.Discrimina == false) {
      producto.Monto = (producto.Monto * 1.21).toFixed(2);
    }
    this.dataSource.data = this.dataSource.data.concat(producto);
    this.modelComprobante.ComprobanteItem.push(producto);
    this.sessionService.showSuccess("Los productos se agregaron correctamente");
  }

  cargarDescuento(producto) {
    producto.Monto = -(((producto.Monto * +producto.Cantidad) * 100) / 100);
    if (this.modelCliente.IdCategoriaIvaNavigation.Discrimina == false) {
      producto.Monto = (producto.Monto * 1.21).toFixed(2);
    }
    this.dataSource.data = this.dataSource.data.concat(producto);
    this.modelComprobante.ComprobanteItem.push(producto);
    this.sessionService.showSuccess("Los productos se agregaron correctamente");
  }

  rowBorrarProductos(row: any): void {
    this.dataSource.data = this.dataSource.data.filter(p => p != row);
  }

  abrirFicha() {
    const dialogRef = this.dialog.open(FacturaFichaComponent, {
      disableClose: true,
      data: { ficha: this.modelCliente.Ficha },
      width: '700px',
      height: '600px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        let modelFicha = <Ficha>{};
        modelFicha.Descripcion = result.Descripcion;
        modelFicha.Fecha = result.Fecha;
        modelFicha.IdCliente = this.modelCliente.Id;
        this.clienteService.saveFicha(modelFicha)
          .subscribe(
            data => {
              this.sessionService.showSuccess("La ficha se actualizó correctamente")
              this.modelCliente.Ficha.push(modelFicha)
            },
            error => {
              this.sessionService.showError("La ficha no se actualizó.");
            }
          );
      }
    });
  }


  altaComprobanteCliente(){
    this.comprobanteClienteService.saveOrUpdateComprobanteCliente(this.modelComprobante).subscribe(
      data => {
        this.sessionService.showSuccess("La factura se agregó correctamente.");
      },
      error => {
        this.sessionService.showError("La factura no se agregó.");
      }
    );
  }
}
