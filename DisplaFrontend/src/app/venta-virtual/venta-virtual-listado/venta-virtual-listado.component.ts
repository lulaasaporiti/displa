import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from 'src/services/cliente.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { startWith, map } from 'rxjs/operators';
// import { add, subtract } from 'add-subtract-date';
import { VentaVirtualService } from 'src/services/venta.virtual.service';
import { VentaVirtualModificacionComponent } from '../venta-virtual-modificacion/venta-virtual-modificacion.component';
import { ParametroService } from 'src/services/parametro.service';
import { Parametro } from 'src/app/model/parametro';
import { VentaVirtualMovimientos } from 'src/app/model/ventaVirtualMovimiento';
import { VentaVirtual } from 'src/app/model/ventaVirtual';


@Component({
  selector: 'app-venta-virtual-listado',
  templateUrl: './venta-virtual-listado.component.html',
  styleUrls: ['./venta-virtual-listado.component.css']
})
export class VentaVirtualListadoComponent implements OnInit {
  panelOpenState = false;
  today = new Date();
  since: Date;
  original: any[] = [];
  displayedColumns = ['Optica', 'Fecha', 'NumeroComprobante', 'TipoComprobante', 'Descripcion', 'CantidadVendida', 'CantidadEntregada', 'CantidadRestante', 'Opciones']
  clientes: Cliente[];
  clientesControl = new FormControl();
  filteredClientes: Observable<Cliente[]>;
  dataSource = new MatTableDataSource<any>();
  todo: boolean;
  pendientes: boolean;
  parametro = <Parametro>{};

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private clienteService: ClienteService,
    private sessionService: SessionService,
    private parametroService: ParametroService,
    private ventaVirtualService: VentaVirtualService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.since = new Date(this.today.getFullYear(), this.today.getMonth()-1, this.today.getDate());
    this.todo = true;
    this.pendientes = true;
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.parametroService.getParametro().subscribe(result => { 
      this.parametro = result;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayCliente(c?: Cliente): string | undefined {
    return c ? c.Id + ' - ' + c.Optica + ' - ' + c.Responsable : undefined;
  }

  traerVentasCliente(event) {
    this.ventaVirtualService.getVentasVirtualesCliente(event.source.value.Id)
      .subscribe(vc => {
        this.dataSource.data = vc.filter(v => new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) >= this.since && new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) <= this.today);
        this.original = vc;
      })
  }

  modificarCantidad(venta: VentaVirtual) {
    let cantidadVentaAnterior = venta.CantidadVendida;
    const dialogRef = this.dialog.open(VentaVirtualModificacionComponent, {
      width: '550px',
      data: { venta: venta, limite: this.parametro.LimiteVentaVirtual }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.ventaVirtualService.saveOrUpdateVentaVirtual(venta).subscribe(
          data => {
            let movimiento = <VentaVirtualMovimientos>{};
            movimiento.IdVentaVirtual = venta.Id;
            movimiento.Cantidad = +venta.CantidadVendida - cantidadVentaAnterior;
            movimiento.Entrega = false;
            movimiento.IdUsuario = +this.sessionService.getPayload()['idUser'];
            this.ventaVirtualService.saveOrUpdateVentaVirtualMovimiento(movimiento).subscribe(
              data => {
                this.sessionService.showSuccess("La venta virtual se ha modificado correctamente");
                // this.loadServicioPage();
              },  
              error => {
                // console.log(error)
                this.sessionService.showError("El movimiento de la venta virtual no se agregó.");
              }
            )
          },
          error => {
            // console.log(error)
            this.sessionService.showError("La venta virtual no se modificó.");
          }
        );
      }
    });
  }


  filterCliente(nombre: any): Cliente[] {
    if (nombre.length >= 0) {
      var s: string;
      try {
        s = nombre.toLowerCase();
      }
      catch (ex) {
        s = nombre.nombre.toLowerCase();
      }
      return this.clientes.filter(cliente =>
        cliente.Id.toString().indexOf(s) !== -1 || cliente.Optica.toLowerCase().indexOf(s.toLowerCase()) !== -1);
    } else {
      return [];
    }
  }

  traerTodos(event) {
    if (!event.checked) {
      this.ventaVirtualService.getVentasVirtualesList().subscribe(cv => {
        this.dataSource.data = cv.filter(v => new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) >= this.since && new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) <= this.today);
        this.original = cv;
      })
    } else {
      this.todo = event.checked;
      this.dataSource.data = [];
    }
  }

  entregasPendientes(event) {
    if (!event.checked) {
      this.ventaVirtualService.getEntregasPendientes().subscribe(cv => {
        this.dataSource.data = cv.filter(v => new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) >= this.since && new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) <= this.today);
        this.original = cv;
      })
    } else {
      this.pendientes = event.checked;
      this.original = [];
      this.dataSource.data = [];
    }
  }

  applyFilterAvanzados(event, campo: string) {
    if (campo == 'desde'){
      this.dataSource.data = this.original.filter(v => new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) >= this.since && new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) <= this.today);
    }
    if (campo == 'hasta'){
      this.dataSource.data = this.original.filter(v => new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) >= this.since && new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) <= this.today);
    }
    if (campo == 'pendientes'){
      this.entregasPendientes(event);
    }
    if (campo == 'todos'){
      this.traerTodos(event);
    }
    if (campo == 'cliente'){
      this.traerVentasCliente(event);
    }
    // if (filtro.toString() == ""){
    //   this.dataSource.data = this.original;
    // }
  }

  ngAfterViewInit() {

  }

}
