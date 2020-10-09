import { Component, HostListener, OnInit } from '@angular/core';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { ClienteService } from 'src/services/cliente.service';
import { Cliente } from 'src/app/model/Cliente';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SessionService } from 'src/services/session.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ProductoLenteComponent } from '../factura-producto/producto-lente/producto-lente.component';
import { ComprobanteCliente } from 'src/app/model/comprobanteCliente';
import { ComprobanteItem } from 'src/app/model/comprobanteItem';
import { ComprobanteItemLente } from 'src/app/model/comprobanteItemLente';
import { ProductoArticuloComponent } from '../factura-producto/producto-articulo/producto-articulo.component';
import { ProductoServicioComponent } from '../factura-producto/producto-servicio/producto-servicio.component';


@Component({
  selector: 'app-factura-alta',
  templateUrl: './factura-alta.component.html',
  styleUrls: ['./factura-alta.component.css']
})
export class FacturaAltaComponent implements OnInit {
  modelCliente = <Cliente>{};
  private id: number = 0;
  panelOpenState = false;
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
        const dialogRef = this.dialog.open(ProductoLenteComponent, {
          disableClose: true,
          data: { idCliente: this.id },
          width: '500px'
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
        const dialogRef = this.dialog.open(ProductoArticuloComponent, {
          disableClose: true,
          data: { idCliente: this.id },
          width: '500px'
        })
        dialogRef.afterClosed().subscribe(result => {
          if (result != undefined && result != false) {
            this.cargarArticuloServicio(result);
          }
        });
        event.preventDefault();
        break;
      }
      case "F4": { //servicios
        const dialogRef = this.dialog.open(ProductoServicioComponent, {
          disableClose: true,
          data: { idCliente: this.id },
          width: '500px'
        })
        dialogRef.afterClosed().subscribe(result => {
          if (result != undefined && result != false) {
            this.cargarArticuloServicio(result);
          }
        });
        event.preventDefault();
        break;
      }
      case "F5": { //libres
        event.preventDefault();
        break;
      }
      case "F6": { //descuento
        event.preventDefault();
        break;
      }
      case "F7": { //totales
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
    private loadingSpinnerService: LoadingSpinnerService,
  ) {
    this.segment.queryParams.subscribe((params: Params) => {
      this.id = +params['id']; // (+) converts string 'id' to a number;
    });
    if (this.id) {
      this.loadingSpinnerService.show()
      this.clienteService.getById(this.id)
        .subscribe(l => {
          this.modelCliente = l;
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
    this.router.navigateByUrl('Cliente/Listado')
  }


  cargarLente(producto) {
    let item = <ComprobanteItem>{};
    let itemLente = <ComprobanteItemLente>{};
    itemLente.IdLente = producto.IdLente;
    item.Descripcion = producto.IdLenteNavigation.DescripcionFactura;
    item.Cantidad = producto.Cantidad;
    item.NumeroSobre = producto.Sobre;
    item.Monto = item.Cantidad * producto.Precio;
    itemLente.Cantidad = item.Cantidad;
    itemLente.Cilindrico = producto.Cilindrico;
    itemLente.Esferico = producto.Esferico;
    itemLente.IdComprobanteItemNavigation = item;
    this.dataSource.data = this.dataSource.data.concat(itemLente);
    this.sessionService.showSuccess("El producto se agregó correctamente")
  }


  cargarArticuloServicio(producto) {
    let item = <ComprobanteItem>{};
    if (producto.IdArticulo != null) {
      item.IdArticulo = producto.IdArticulo;
      item.Descripcion = producto.IdArticuloNavigation.Nombre;
    }
    else {
      item.IdServicio = producto.IdServicio;
      item.Descripcion = producto.IdServicioNavigation.Nombre;
    }
    item.Cantidad = producto.Cantidad;
    item.NumeroSobre = producto.Sobre;
    item.Monto = item.Cantidad * producto.Monto;
    this.dataSource.data = this.dataSource.data.concat(item);
    this.sessionService.showSuccess("El producto se agregó correctamente")

  }


  // altaCliente(){
  //   this.clienteService.saveOrUpdateCliente(this.modelCliente).subscribe(
  //     data => {
  //       console.log(data)
  //       this.router.navigateByUrl('Cliente/Modificacion?id='+data)
  //       this.sessionService.showSuccess("El cliente se agregó correctamente.");
  //     },
  //     error => {
  //       this.sessionService.showError("El cliente no se agregó.");
  //     }
  //   );
  // }
}
