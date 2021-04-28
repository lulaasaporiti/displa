import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from 'src/services/cliente.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { startWith, map } from 'rxjs/operators';
import { VentaVirtualService } from 'src/services/venta.virtual.service';
import { VentaVirtualModificacionComponent } from '../venta-virtual-modificacion/venta-virtual-modificacion.component';
import { VentaVirtualMovimientosComponent } from '../venta-virtual-movimientos/venta-virtual-movimientos.component';
import { ParametroService } from 'src/services/parametro.service';
import { Parametro } from 'src/app/model/parametro';
import { VentaVirtualMovimientos } from 'src/app/model/ventaVirtualMovimiento';
import { VentaVirtual } from 'src/app/model/ventaVirtual';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-venta-virtual-listado',
  templateUrl: './venta-virtual-listado.component.html',
  styleUrls: ['./venta-virtual-listado.component.css']
})
export class VentaVirtualListadoComponent implements OnInit {
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
    private clienteService: ClienteService,
    private sessionService: SessionService,
    private parametroService: ParametroService,
    private ventaVirtualService: VentaVirtualService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.since = new Date(new Date().setDate(this.today.getDate()-30));
    // this.since = new Date(this.today.getFullYear(), this.today.getMonth()-1, this.today.getDate());
    this.todo = false;
    this.pendientes = true;
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.parametroService.getParametro().subscribe(result => { 
      this.parametro = result;
    });
    this.clienteService.getClientesVigentesList()
      .subscribe(r => {
        this.clientes = r;
        this.filteredClientes = this.clientesControl.valueChanges
          .pipe(
            startWith(''),
            map(val => this.filterCliente(val))
          );
        this.loadingSpinnerService.hide();
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayCliente(c?: Cliente): string | undefined {
    return c ? c.Id + ' - ' + c.Optica + ' - ' + c.Responsable : undefined;
  }

  modificarCantidad(venta: VentaVirtual, event) {
    event.stopPropagation();
    let cantidadVentaAnterior = venta.CantidadVendida;
    const dialogRef = this.dialog.open(VentaVirtualModificacionComponent, {
      width: '550px',
      data: { venta: venta, limite: this.parametro.LimiteVentaVirtual }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        venta.CantidadEntregada = venta.CantidadVendida - result;
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

  verMovimientos(idVenta, cliente, producto) {
    const dialogRef = this.dialog.open(VentaVirtualMovimientosComponent, {
      width: '600px',
      height: '600px',
      data: { idVenta: idVenta, cliente: cliente, producto: producto }
    })
    dialogRef.afterClosed().subscribe(result => { });
  }

  filterCliente(nombre: any): Cliente[] {
    if (nombre != undefined) {
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
    } else {
      return [];
    }
  }

  traerTodos(event) {
    this.loadingSpinnerService.show();
    if (!event.checked) {
      this.ventaVirtualService.getVentasVirtualesList().subscribe(vc => {
        if (this.pendientes)
          this.dataSource.data = vc.filter(v => new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) >= this.since && new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) <= this.today && v.CantidadVendida > v.CantidadEntregada);
        else {
          this.dataSource.data = vc.filter(v => new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) >= this.since && new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) <= this.today);
        }
        this.original = vc;
        console.log(this.original)
        this.loadingSpinnerService.hide();
      })
    } else {
      this.todo = event.checked;
      this.dataSource.data = [];
      this.loadingSpinnerService.hide();
    }
  }

  entregasPendientes(event) {
    this.loadingSpinnerService.show();
    if (!event.checked) {
      this.ventaVirtualService.getEntregasPendientes((this.clientesControl.value != undefined) ? this.clientesControl.value.Id : 0).subscribe(cv => {
        this.dataSource.data = cv.filter(v => new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) >= this.since && new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) <= this.today);
        this.loadingSpinnerService.hide();
      })
    } else {
      this.dataSource.data = this.original.filter(v => new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) >= this.since && new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) <= this.today);
      this.loadingSpinnerService.hide();
    }
  }

  traerVentasCliente(event) {
    this.loadingSpinnerService.show();
    this.ventaVirtualService.getVentasVirtualesCliente(event.source.value.Id)
      .subscribe(vc => {
        if (this.pendientes)
          this.dataSource.data = vc.filter(v => new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) >= this.since && new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) <= this.today && v.CantidadVendida > v.CantidadEntregada);
        else
          this.dataSource.data = vc.filter(v => new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) >= this.since && new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) <= this.today);
        this.original = vc;
        this.loadingSpinnerService.hide();
      })
  }

  applyFilterAvanzados(event, campo: string) {
    if (campo == 'desde'){
      if (this.pendientes) 
        this.dataSource.data = this.original.filter(v => new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) >= this.since && new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) <= this.today && v.CantidadVendida > v.CantidadEntregada);
      else 
        this.dataSource.data = this.original.filter(v => new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) >= this.since && new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) <= this.today);
    }
    if (campo == 'hasta'){
      if (this.pendientes) 
        this.dataSource.data = this.original.filter(v => new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) >= this.since && new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) <= this.today && v.CantidadVendida > v.CantidadEntregada);
      else
        this.dataSource.data = this.original.filter(v => new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) >= this.since && new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) <= this.today);
    }
    if (campo == 'pendientes'){
      this.pendientes = !event._checked;
      this.entregasPendientes(event);
    }
    if (campo == 'todos'){
      this.clientesControl.setValue(undefined);
      this.traerTodos(event);
    }
    if (campo == 'cliente'){
      this.todo = false;
      this.traerVentasCliente(event);
    }
    // if (filtro.toString() == ""){
    //   this.dataSource.data = this.original;
    // }
  }
}
