import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { ClienteService } from 'src/services/cliente.service';
import { Cliente } from 'src/app/model/Cliente';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SessionService } from 'src/services/session.service';
import { ComprobanteCliente } from 'src/app/model/comprobanteCliente';
import { ComprobanteItem } from 'src/app/model/comprobanteItem';
import { ComprobanteItemLente } from 'src/app/model/comprobanteItemLente';
import { combineLatest } from 'rxjs';
import { Ficha } from 'src/app/model/ficha';
import { VentaVirtual } from 'src/app/model/ventaVirtual';
import { ComprobanteClienteService } from 'src/services/comprobanteCliente.service';
import { ParametroService } from 'src/services/parametro.service';
import { RemitoService } from 'src/services/remito.service';
import { Parametro } from 'src/app/model/parametro';
import { Remito } from 'src/app/model/remito';
import { VentaVirtualService } from 'src/services/venta.virtual.service';
import { FacturaFichaComponent } from 'src/app/factura/factura-ficha/factura-ficha.component';
import { ProductoLenteComponent } from 'src/app/factura/factura-producto/producto-lente/producto-lente.component';
import { ProductoArticuloComponent } from 'src/app/factura/factura-producto/producto-articulo/producto-articulo.component';
import { ProductoServicioComponent } from 'src/app/factura/factura-producto/producto-servicio/producto-servicio.component';
import { ProductoLibreComponent } from 'src/app/factura/factura-producto/producto-libre/producto-libre.component';
import { ProductoDescuentoComponent } from 'src/app/factura/factura-producto/producto-descuento/producto-descuento.component';
import { LenteVentaVirtualComponent } from 'src/app/factura/factura-producto/producto-lente/lente-venta-virtual/lente-venta-virtual.component';
import { NotaCreditoConfirmarComponent } from '../nota-credito-confirmar/nota-credito-confirmar.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-nota-credito-alta',
  templateUrl: './nota-credito-alta.component.html',
  styleUrls: ['./nota-credito-alta.component.css']
})
export class NotaCreditoComponent implements OnInit {
  modelCliente = <Cliente>{};
  parametro = <Parametro>{};
  // remitos: Remito [] = [];
  totalRemitos;
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
  bloquearF = false;
  modelComprobante = <ComprobanteCliente>{};

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    switch (this.key) {
      case "F1": { //lentes
        this.dialog.closeAll();
        if (this.bloquearF != true) {
          let item = <ComprobanteItem>{};
          item.ComprobanteItemLente = [];
          const dialogRef = this.dialog.open(ProductoLenteComponent, {
            disableClose: true,
            data: { idCliente: this.id, utilizaSobre: this.modelCliente.UtilizaSobre, item: item },
            width: '965px',
            height: '625px'
          })
          dialogRef.afterClosed().subscribe(result => {
            if (result != undefined && result != false) {
              this.cargarLente(item);
            }
          });
        }
        event.preventDefault();
        break;
      }
      case "F3": { //varios
        this.dialog.closeAll();
        if (this.bloquearF != true) {
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
        }
        event.preventDefault();
        break;
      }
      case "F4": { //servicios
        this.dialog.closeAll();
        if (this.bloquearF != true) {
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
        }
        event.preventDefault();
        break;
      }
      case "F5": { //libres
        this.dialog.closeAll();
        if (this.bloquearF != true) {
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
        }
        event.preventDefault();
        break;
      }
      case "F6": { //descuento
        this.dialog.closeAll();
        if (this.bloquearF != true) {
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
        }
        event.preventDefault();
        break;
      }
      case "F7": { //totales
        this.dialog.closeAll();
        if (this.modelComprobante.MontoTotal <= 0){
          this.sessionService.showWarning("El monto de la nota de crédito no puede ser 0 ni negativo")
          this.bloquearF = false;
        }
        else {
          this.bloquearF = true;
          this.parametroService.getObservaciones()
          .subscribe(result => {
            this.modelComprobante.Observaciones = result;
            document.getElementById("finalizar").focus();
          });
        }
        event.preventDefault();
        break;
      }
      case "F9": { //venta virtual lente
        this.dialog.closeAll();
        if (this.bloquearF != true) {
          const dialogRef = this.dialog.open(LenteVentaVirtualComponent, {
            disableClose: true,
            data: { idCliente: this.id, utilizaSobre: this.modelCliente.UtilizaSobre, limite: this.parametro.LimiteVentaVirtual },
            width: '700px',
            // height:'350px'
          })
          dialogRef.afterClosed().subscribe(result => {
            if (result != undefined && result != false) {
              this.cargarVentaVirtual(result);
            }
          });
        }
        event.preventDefault();
        break;
      }
      default:
        break;
    }
  }

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private segment: ActivatedRoute,
    // private remitoService: RemitoService,
    private sessionService: SessionService,
    private clienteService: ClienteService,
    private changeDetector: ChangeDetectorRef,
    private parametroService: ParametroService,
    private ventaVirtualService: VentaVirtualService,
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
        this.clienteService.getDiasPlazo(this.id),
        this.parametroService.getParametro(),
        // this.remitoService.getRemitosPendientesCliente(this.id)
      )
        .subscribe(result => {
          this.modelCliente = result[0];
          this.parametro = result[2];
          // this.remitos = result[3];
          this.modelComprobante.IdCliente = this.id;
          this.modelComprobante.ComprobanteItem = [];
          this.modelComprobante.VentaVirtual = [];
          this.modelComprobante.IdTipoComprobante = 2;
          this.modelComprobante.IdUsuario = +this.sessionService.getPayload()['idUser'];
          if (this.modelCliente.IdCategoriaIva == 2) {
            this.modelComprobante.Letra = 'B'
            this.modelComprobante.Numero = this.parametro.NumeroNotaCreditoB;
            this.parametro.NumeroNotaCreditoB++;
          } else {
            this.modelComprobante.Letra = 'A'
            this.modelComprobante.Numero = this.parametro.NumeroNotaCreditoA;
            this.parametro.NumeroNotaCreditoA++;

          }
          this.plazoActual = +result[1];
          this.loadingSpinnerService.hide();
        });
    }
  }

  ngOnInit() {
    this.loadingSpinnerService.show();
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.loadingSpinnerService.hide();
  }

  cancelar() {
    this.router.navigateByUrl('/Home')
  }


  cargarLente(producto) {
    let item = <ComprobanteItem>{};
    let montoLentes = 0;
    item.ComprobanteItemLente = [];
    item.ComprobanteItemRecargo = producto.ComprobanteItemRecargo;
    item.ComprobanteItemServicio = producto.ComprobanteItemServicio;
    item.Cantidad = 0;
    item.Monto = 0;
    item.NumeroSobre = producto.ComprobanteItemLente[0].Sobre;
    item.Descripcion = producto.ComprobanteItemLente[0].IdLenteNavigation.DescripcionFactura;
    ////remplazar por venta virtual
    this.ventaVirtualService.getLentesConVentaVirtual(this.id, producto.ComprobanteItemLente[0].IdLente)
      .subscribe(vl => {
        producto.ComprobanteItemLente.forEach(p => {
          let itemLente = <ComprobanteItemLente>{};
          itemLente.IdLente = p.IdLente;
          itemLente.Precio = p.Precio;
          item.Cantidad = +item.Cantidad + +p.Cantidad;
          if (vl == 0) 
            item.Monto = +item.Monto + (p.Cantidad * p.Precio);
          itemLente.Cantidad = p.Cantidad;
          itemLente.MedidaCilindrico = p.MedidaCilindrico;
          itemLente.MedidaEsferico = p.MedidaEsferico;
          item.ComprobanteItemLente.push(itemLente);
        })
        if (vl > 0) { //si el cliente tiene algun venta virtual
          item.Monto = 0;
          item.EntregaVentaVirtual = true;
          let ventasVirtuales = this.dataSource.data.filter(v => v.EntregaVentaVirtual == true 
            && (v.ComprobanteItemLente != [] && v.ComprobanteItemLente.find(cl => cl.IdLente == producto.ComprobanteItemLente[0].IdLente)))
          let cantidadResta = item.Cantidad;
          ventasVirtuales.forEach(v => {
            cantidadResta = cantidadResta + v.Cantidad;
          });
          item.Descripcion = producto.ComprobanteItemLente[0].IdLenteNavigation.DescripcionFactura + ' (V.Virt +' + (vl - +cantidadResta) + ')';
        }
        montoLentes = item.Monto;
        if (producto.ComprobanteItemRecargo != undefined) {/////recargos lente
          producto.ComprobanteItemRecargo.forEach(r => {
            item.Monto = item.Monto + (montoLentes * (r.IdRecargoNavigation.Porcentaje / 100));
            r.Monto = (montoLentes * (r.IdRecargoNavigation.Porcentaje / 100));
          })
        }
        producto.ComprobanteItemServicio.forEach(s => {////servicios lente
          s.Monto = s.IdServicioNavigation.PrecioServicio[0].Precio;
        })
        this.dataSource.data = this.dataSource.data.concat(item);
        this.modelComprobante.ComprobanteItem.push(item);
        if (item.Monto > this.parametro.MontoMaximoProductosDiferentes)
          this.sessionService.showWarning("El producto agregado supera el monto máximo permitido");
        else if (this.dataSource.data.length > this.parametro.CantidadProductoDiferentes) {
          this.sessionService.showWarning("Se alcanzó el limite de productos permitidos")
        }
        else {
          this.sessionService.showSuccess("Los productos se agregaron correctamente");
        }
      });
  }

  cargarVentaVirtual(venta) {
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


  getSubtotales() {
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

  // getTotalRemito() {
  //   let totalAux = 0;
  //   if (this.remitos != undefined && this.remitos.length > 0) {
  //     this.remitos.forEach(r => {
  //       r.ComprobanteItem.forEach(co => {
  //         totalAux = totalAux + co.Monto;
  //       });
  //     });
  //   }
  //   this.totalRemitos = totalAux;
  //   return this.totalRemitos.toFixed(2);
  // }

  // getCantidadProductos() {
  //   let cantidadAux = 0;
  //   if (this.remitos != undefined && this.remitos.length > 0) {
  //     this.remitos.forEach(r => {
  //       cantidadAux = cantidadAux + r.ComprobanteItem.length;
  //     });
  //     return cantidadAux;
  //   }
  // }

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
        if (venta.Monto > this.parametro.MontoMaximoProductosDiferentes)
        this.sessionService.showWarning("El producto agregado supera el monto máximo permitido");
        else
        this.sessionService.showSuccess("Los productos se agregaron correctamente");
      } else {
        p.Monto = Math.round((p.Monto * +p.Cantidad) * 100) / 100;
        this.modelComprobante.ComprobanteItem.push(p);
        this.dataSource.data = this.dataSource.data.concat(p);
        if (p.Monto > this.parametro.MontoMaximoProductosDiferentes)
        this.sessionService.showWarning("El producto agregado supera el monto máximo permitido");
        else {
        this.sessionService.showSuccess("Los productos se agregaron correctamente");
        }
      }
      this.changeDetector.detectChanges();
    });
  }


  cargarLibre(producto) {
    producto.Monto = ((producto.Monto * +producto.Cantidad) * 100) / 100;
    if (this.modelCliente.IdCategoriaIvaNavigation.Discrimina == false) {
      producto.Monto = (producto.Monto * 1.21).toFixed(2);
    }
    this.dataSource.data = this.dataSource.data.concat(producto);
    this.modelComprobante.ComprobanteItem.push(producto);
    if (producto.Monto > this.parametro.MontoMaximoProductosDiferentes)
      this.sessionService.showWarning("El producto agregado supera el monto máximo permitido");
    else if (this.dataSource.data.length > this.parametro.CantidadProductoDiferentes) {
      this.sessionService.showWarning("Se alcanzó el limite de productos permitidos")   
    }
    else {
      this.sessionService.showSuccess("Los productos se agregaron correctamente");
    }
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


  altaComprobanteCliente() {
    const dialogRef = this.dialog.open(NotaCreditoConfirmarComponent, {
      disableClose: true,
      data: {},
      width: '700px',
      // height:'350px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false)  {
        this.comprobanteClienteService.saveOrUpdateComprobanteCliente(this.modelComprobante).subscribe(
          data => {
            this.parametroService.saveOrUpdateParametro(this.parametro).subscribe();
            this.router.navigateByUrl('/Home');
            this.sessionService.showSuccess("La nota de crédito se agregó correctamente.");
          },
          error => {
            this.sessionService.showError("La nota de crédito no se agregó.");
          }
        );
      }
    })
  }
}
