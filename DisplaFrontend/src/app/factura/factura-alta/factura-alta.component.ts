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
// import { ProductoServicioComponent } from '../factura-producto/producto-servicio/producto-servicio.component';
import { ProductoLibreComponent } from '../factura-producto/producto-libre/producto-libre.component';
import { ProductoDescuentoComponent } from '../factura-producto/producto-descuento/producto-descuento.component';
import { ProductoTotalesComponent } from '../factura-producto/producto-totales/producto-totales.component';
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
  displayedColumnsFooter: string[]= ['Subtotal']
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
          data: { idCliente: this.id, utilizaSobre: this.modelCliente.UtilizaSobre },
          width: '900px',
          height:'600px'
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
          data: { idCliente: this.id, utilizaSobre: this.modelCliente.UtilizaSobre },
          width: '800px',
          height:'500px'
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
          data: { idCliente: this.id, utilizaSobre: this.modelCliente.UtilizaSobre },
          width: '800px',
          height:'500px'
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
        const dialogRef = this.dialog.open(ProductoLibreComponent, {
          disableClose: true,
          data: { idCliente: this.id, utilizaSobre: this.modelCliente.UtilizaSobre },
          width: '500px',
          height:'350px'
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
        const dialogRef = this.dialog.open(ProductoDescuentoComponent, {
          disableClose: true,
          data: { idCliente: this.id},
          width: '500px',
          height:'350px'
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
        const dialogRef = this.dialog.open(ProductoTotalesComponent, {
          disableClose: true,
          data: { idCliente: this.id, utilizaSobre: this.modelCliente.UtilizaSobre },
          width: '500px',
          // height:'350px'
        })
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
    this.router.navigateByUrl('/Home')
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
    this.sessionService.showSuccess("Los productos se agregaron correctamente")
  }


  getSubTotales() {
    if (this.dataSource.data.length > 0) {
      document.getElementById('footers').style.display='block';
      let subTotales = 0;
      this.dataSource.data.forEach(to => {
        subTotales = to.Monto + subTotales;
      })
      return subTotales;
    }
  }

  getTotales(){

  }
  
  cargarArticuloServicio(producto) {
    producto.forEach(p => {
      p.Monto = Math.round((p.Monto * +p.Cantidad) * 100) / 100;
      this.dataSource.data = this.dataSource.data.concat(p);
    });
    this.sessionService.showSuccess("Los productos se agregaron correctamente");
  }


  cargarLibre(producto) {
    producto.Monto = Math.round((producto.Monto * +producto.Cantidad) * 100) / 100;
    if (this.modelCliente.IdCategoriaIvaNavigation.Discrimina == false) {
      producto.Monto = producto.Monto*1.21;
    }
    this.dataSource.data = this.dataSource.data.concat(producto);
    this.sessionService.showSuccess("Los productos se agregaron correctamente");
  }

  cargarDescuento(producto) {
    producto.Monto = -(Math.round((producto.Monto * +producto.Cantidad) * 100) / 100);
    if (this.modelCliente.IdCategoriaIvaNavigation.Discrimina == false) {
      producto.Monto = producto.Monto*1.21;
    }
    this.dataSource.data = this.dataSource.data.concat(producto);
    this.sessionService.showSuccess("Los productos se agregaron correctamente");
  }

  rowBorrarProductos(row: any): void{
    this.dataSource.data = this.dataSource.data.filter(p =>  p != row);
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
