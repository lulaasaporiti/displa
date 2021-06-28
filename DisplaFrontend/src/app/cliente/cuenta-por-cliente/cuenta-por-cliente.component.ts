import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from 'src/services/cliente.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Cliente } from 'src/app/model/cliente';
import { ComprobanteClienteService } from 'src/services/comprobanteCliente.service';
import { ExportacionService } from 'src/services/exportacion.service';
// import { add, subtract } from 'add-subtract-date';


@Component({
  selector: 'app-cuenta-por-cliente',
  templateUrl: './cuenta-por-cliente.component.html',
  styleUrls: ['./cuenta-por-cliente.component.css']
})
export class CuentaPorClienteComponent implements OnInit {
  modelCliente = <Cliente>{};
  panelOpenState = false;
  today = new Date();
  since;
  displayedColumns = ['Fecha', 'Comprobante', 'Debe', 'Haber', 'Saldo']
  clientes: Cliente[];
  clientesControl = new FormControl();
  filteredClientes: Observable<Cliente[]>;
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;

  constructor(
    public dialog: MatDialog,
    private clienteService: ClienteService,
    private exportacionService: ExportacionService,
    private loadingSpinnerService: LoadingSpinnerService,
    private comprobanteService: ComprobanteClienteService) { }

  ngOnInit() {
    this.since = new Date(new Date().setDate(this.today.getDate() - 30));
    // this.since = new Date(this.today.getFullYear(), this.today.getMonth()-1, this.today.getDate());
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.clienteService.getClientesVigentesList()
      .subscribe(r => {
        this.clientes = r;
        this.filteredClientes = this.clientesControl.valueChanges
          .pipe(
            startWith(''),
            map(val => this.filterCliente(val))
          );
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayCliente(c?: Cliente): string | undefined {
    return c ? c.Id + ' - ' + c.Optica + ' - ' + c.Responsable : undefined;
  }

  traerCuentaCliente(event) {

    this.loadingSpinnerService.show();
    if (event != "desde")
      this.modelCliente = event;

    this.comprobanteService.getCuentaPorCliente(this.modelCliente.Id, this.since.toDateString())
      .subscribe(cc => {
        this.dataSource.data = cc;
        // this.dataSource.data = vc.filter(v => new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) >= this.since && new Date(Date.parse(v.IdComprobanteNavigation.Fecha.toString())) <= this.today);
        this.loadingSpinnerService.hide();
      })
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

  verComprobante(idComprobante: number, idTipoComprobante: number) {
    switch (idTipoComprobante) {
      case 1: {
        let url = `Factura/Detalle?id=${idComprobante}`
        window.open(url, '_blank');
        break;
      }
      case 3: {
        let url = `NotaDebito/Detalle?id=${idComprobante}`
        window.open(url, '_blank');
        break;
      }
      case 2: {
        let url = `NotaCredito/Detalle?id=${idComprobante}`
        window.open(url, '_blank');
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  public exportar(): void {
    this.loadingSpinnerService.show();
    let excel = JSON.parse(JSON.stringify(this.dataSource.data));
    excel.forEach(element => {
      element["Codigo"] = element.IdCliente;
      delete element.IdCliente;
      element["Fecha"] = new Date(Date.parse(element.Fecha.toString())).toLocaleDateString();
      element["Numero comprobante"] = element["Numero"];
      element["Tipo comprobante"] = element.IdTipoComprobanteNavigation.Descripcion;
      delete element.Id;
      delete element.ComprobanteItem;
      delete element.IdUsuario;
      delete element.Numero;
      delete element.VentaVirtual;
      delete element.VentaVirtualMovimientos;
      delete element.IdTipoComprobanteNavigation;
      delete element.Sucursal;
      element["Debe"] = (element.IdTipoComprobante == 1 || element.IdTipoComprobante == 3) ? element.MontoTotal  : '  ';
      element["Haber"] = (element.IdTipoComprobante == 2) ? element.MontoTotal  : '  ';
      element["Saldo"] = "";
      delete element.IdTipoComprobante;
      delete element.MontoTotal;
    });
    this.exportacionService.exportAsExcelFile(excel, "Cuenta del cliente " + this.modelCliente.Optica);
    this.loadingSpinnerService.hide();
}
}
