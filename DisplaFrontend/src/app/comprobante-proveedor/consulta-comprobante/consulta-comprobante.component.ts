import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from 'src/services/cliente.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { startWith, map } from 'rxjs/operators';
import { ComprobanteClienteService } from 'src/services/comprobanteCliente.service';
import { ParametroService } from 'src/services/parametro.service';
import { Parametro } from 'src/app/model/parametro';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RemitoService } from 'src/services/remito.service';
import { ReciboService } from 'src/services/recibo.service';
import { ReciboDetalleComponent } from 'src/app/recibo/recibo-detalle/recibo-detalle.component';
import { MovimientoInternoService } from 'src/services/movimiento.interno.service';
import { MovimientoInternoDetalleComponent } from 'src/app/movimiento-interno/movimiento-interno-detalle/movimiento-interno-detalle.component';
import { Proveedor } from 'src/app/model/Proveedor';
import { ProveedorService } from 'src/services/proveedor.service';


@Component({
  selector: 'app-consulta-comprobante',
  templateUrl: './consulta-comprobante.component.html',
  styleUrls: ['./consulta-comprobante.component.css']
})
export class ConsultaComprobanteProveedorComponent implements OnInit {
  today = new Date();
  since: Date;
  original: any[] = [];
  displayedColumns = ['Cliente', 'Tipo', 'Letra', 'Fecha', 'NumeroComprobante', 'Monto', 'Estado'];
  proveedores: Proveedor[];
  proveedoresControl = new FormControl();
  filteredProveedores: Observable<Proveedor[]>;
  dataSource = new MatTableDataSource<any>();
  todo: boolean;
  pendientes: boolean;
  anulado: boolean;
  valido: boolean;
  remito: boolean;
  recibo: boolean;
  parametro = <Parametro>{};
  proveedorId: number

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;

  constructor(
    public dialog: MatDialog,
    private remitoService: RemitoService,
    private reciboService: ReciboService,
    private parametroService: ParametroService,
    private proveedorService: ProveedorService,
    private movimientoService: MovimientoInternoService,
    private loadingSpinnerService: LoadingSpinnerService,
    private comprobanteClienteService: ComprobanteClienteService) { }

  ngOnInit() {
    this.since = new Date(new Date().setDate(this.today.getDate() - 30));
    // this.since = new Date(this.today.getFullYear(), this.today.getMonth()-1, this.today.getDate());
    this.todo = false;
    this.anulado = false;
    this.valido = false;
    this.remito = false;
    this.recibo = false;
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.parametroService.getParametro().subscribe(result => {
      this.parametro = result;
    });
    this.proveedorService.getProveedoresVigentesList()
      .subscribe(r => {
        this.proveedores = r;
        this.filteredProveedores = this.proveedoresControl.valueChanges
          .pipe(
            startWith(''),
            map(val => this.filterProveedor(val))
          );
        this.loadingSpinnerService.hide();
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayProvedor(p?: Proveedor): string | undefined {
    return p ? p.Id + ' - ' + p.Nombre : undefined;
  }

  filterProveedor(nombre: any): Proveedor[] {
    if (nombre != undefined && nombre.length >= 0) {
      var s: string;
      try {
        s = nombre.toLowerCase();
      }
      catch (ex) {
        s = nombre.nombre.toLowerCase();
      }
      return this.proveedores.filter(proveedor =>
        proveedor.Id.toString().indexOf(s) !== -1 || proveedor.Nombre.toLowerCase().indexOf(s.toLowerCase()) !== -1);
    } else {
      return [];
    }
  }

  traerTodos() {
    this.loadingSpinnerService.show();
    if (!this.todo) {
      combineLatest([
        this.comprobanteClienteService.getBusquedaComprobante(0, this.since.toDateString(), this.today.toDateString()),
        this.reciboService.buscarRecibo(0, this.since.toDateString(), this.today.toDateString()),
        this.remitoService.buscarRemito(0, this.since.toDateString(), this.today.toDateString()),
        this.movimientoService.getBusquedaMovimiento(0, this.since.toDateString(), this.today.toDateString())
      ]).subscribe(vc => {
        this.original = ((vc[0].concat(vc[1])).concat(vc[2])).concat(vc[3]);
        this.dataSource.data = this.original
        this.loadingSpinnerService.hide();
      })
    } else {
      this.dataSource.data = [];
      this.loadingSpinnerService.hide();
    }
  }

  traerCliente() {
    this.loadingSpinnerService.show();
    this.todo = false;
    if (this.proveedorId == null || this.proveedorId == undefined) {
      this.todo = true
    }
    combineLatest([
      this.comprobanteClienteService.getBusquedaComprobante(this.proveedorId, this.since.toDateString(), this.today.toDateString()),
      this.reciboService.buscarRecibo(this.proveedorId, this.since.toDateString(), this.today.toDateString()),
      this.movimientoService.getBusquedaMovimiento(0, this.since.toDateString(), this.today.toDateString())
    ]).subscribe(vc => {
      this.original = (vc[0].concat(vc[1])).concat(vc[2]);
      this.dataSource.data = this.original
      this.loadingSpinnerService.hide();
    })
  }

  applyFilterAvanzados(event, campo: string) {
    if (campo == 'desde') {
      if (this.todo) {
        this.traerTodos()
      }
      else
        this.traerCliente()
    }
    if (campo == 'hasta') {
      if (this.todo)
        this.traerTodos()
      else
        this.traerCliente()
    }
    if (campo == 'todos') {
      this.proveedoresControl.setValue(undefined);
      this.proveedorId = undefined;
      this.traerTodos();
    }
    if (campo == 'cliente') {
      this.proveedorId = event.source.value.Id
      this.traerCliente();
    }
    if (campo == 'anulados') {
      if (!this.anulado)
        this.dataSource.data = this.dataSource.data.filter(d => d.FechaAnulado != undefined)
      else
        this.dataSource.data = this.original

      if (this.recibo && this.remito)
        this.dataSource.data = this.dataSource.data.filter(d => d.IdTipoComprobanteNavigation == 'Remito' && d.FechaFactura != undefined && d.IdTipoComprobanteNavigation == 'Recibo')
      else if (this.recibo)
        this.dataSource.data = this.dataSource.data.filter(d => d.IdTipoComprobanteNavigation == 'Recibo')
      else if (this.remito)
        this.dataSource.data = this.dataSource.data.filter(d => d.IdTipoComprobanteNavigation == 'Remito' && d.FechaFactura != undefined)

    }
    if (campo == 'validos') {
      if (!this.valido)
        this.dataSource.data = this.dataSource.data.filter(d => d.FechaAnulado == undefined)
      else
        this.dataSource.data = this.original

      if (this.recibo && this.remito)
        this.dataSource.data = this.dataSource.data.filter(d => d.IdTipoComprobanteNavigation == 'Remito' && d.FechaFactura != undefined && d.IdTipoComprobanteNavigation == 'Recibo')
      else if (this.recibo)
        this.dataSource.data = this.dataSource.data.filter(d => d.IdTipoComprobanteNavigation == 'Recibo')
      else if (this.remito)
        this.dataSource.data = this.dataSource.data.filter(d => d.IdTipoComprobanteNavigation == 'Remito' && d.FechaFactura != undefined)
    }
    if (campo == 'remitos') {
      if (!this.remito)
        this.dataSource.data = this.dataSource.data.filter(d => d.IdTipoComprobanteNavigation == 'Remito' && d.FechaFactura != undefined)
      else
        this.dataSource.data = this.original

      if (this.recibo && this.valido)
        this.dataSource.data = this.dataSource.data.filter(d => d.IdTipoComprobanteNavigation == 'Recibo' && d.FechaAnulado == undefined)
      else if (this.recibo && this.anulado)
        this.dataSource.data = this.dataSource.data.filter(d => d.IdTipoComprobanteNavigation == 'Recibo' && d.FechaAnulado != undefined)
      else if (this.recibo)
        this.dataSource.data = this.dataSource.data.filter(d => d.IdTipoComprobanteNavigation == 'Recibo')
      else if (this.valido)
        this.dataSource.data = this.dataSource.data.filter(d => d.FechaAnulado == undefined)
      else if (this.anulado)
        this.dataSource.data = this.dataSource.data.filter(d => d.FechaAnulado != undefined)
    }
    if (campo == 'recibos') {
      if (!this.recibo)
        this.dataSource.data = this.dataSource.data.filter(d => d.IdTipoComprobanteNavigation == 'Recibo')
      else
        this.dataSource.data = this.original

      if (this.remito && this.valido)
        this.dataSource.data = this.dataSource.data.filter(d => d.IdTipoComprobanteNavigation == 'Remito' && d.FechaFactura != undefined && d.FechaAnulado == undefined)
      else if (this.remito && this.anulado)
        this.dataSource.data = this.dataSource.data.filter(d => d.IdTipoComprobanteNavigation == 'Remito' && d.FechaFactura != undefined && d.FechaAnulado != undefined)
      else if (this.remito)
        this.dataSource.data = this.dataSource.data.filter(d => d.IdTipoComprobanteNavigation == 'Remito' && d.FechaFactura != undefined)
      else if (this.valido)
        this.dataSource.data = this.dataSource.data.filter(d => d.FechaAnulado == undefined)
      else if (this.anulado)
        this.dataSource.data = this.dataSource.data.filter(d => d.FechaAnulado != undefined)
    }
  }

  verComprobante(id: number, idTipoComprobante: string) {
    console.log(idTipoComprobante, "id comprobante")
    switch (idTipoComprobante) {
      case 'Factura': {
        let url = `Factura/Detalle?id=${id}`
        window.open(url, '_blank');
        break;
      }
      case 'Nota débito': {
        let url = `NotaDebito/Detalle?id=${id}`
        window.open(url, '_blank');
        break;
      }
      case 'Nota crédito': {
        let url = `NotaCredito/Detalle?id=${id}`
        window.open(url, '_blank');
        break;
      }
      case 'Remito': {
        let url = `Remito/Detalle?id=${id}`
        window.open(url, '_blank');
        break;
      }
      case 'Recibo': {
        const dialogRef = this.dialog.open(ReciboDetalleComponent, {
          data: { idRecibo: id },
          width: '550px',
          height: '580px',
          autoFocus: false
        })
        dialogRef.afterClosed().subscribe(result => {
          if (result != undefined && result != false) {
            this.traerCliente()
            this.resetFilters()
          }
        })
        break;
      }
      
      case 'Débito interno': case 'Crédito interno': {
        console.log('entra movimiento interno')
        const dialogRef = this.dialog.open(MovimientoInternoDetalleComponent, {
          data: { idMovimiento: id, tipo: 'cliente' },
          width: '650px'
        })
        dialogRef.afterClosed().subscribe(result => {
          if (result != undefined && result != false) {
            this.traerCliente()
            this.resetFilters()
          }
        })
        break;
      }

      default: {
        //statements; 
        break;
      }
    }
  }

  resetFilters() {
    this.recibo = false
    this.remito = false
    this.anulado = false
    this.valido = false
  }
}