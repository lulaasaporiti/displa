import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RemitoService } from 'src/services/remito.service';
import { Cliente } from 'src/app/model/Cliente';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/services/cliente.service';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-consulta-remito',
  templateUrl: './consulta-remito.component.html',
  styleUrls: ['./consulta-remito.component.css']
})
export class ConsultaRemitoComponent implements OnInit {
  today = new Date();
  since = new Date();
  defaultSort: MatSort
  displayedColumns = ['Cliente', 'Numero', 'Fecha', 'Estado', 'FechaFacturado'];
  dataSource = new MatTableDataSource<any>();
  clientes: Cliente[];
  clientesControl = new FormControl();
  filteredClientes: Observable<Cliente[]>;
  busquedaNumero = true;
  clienteId: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;

  constructor(
    public dialog: MatDialog,
    private remitoService: RemitoService,
    private clienteService: ClienteService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.loadingSpinnerService.hide();

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
    //   this.defaultSort: MatSort = {
    //     id: 'defColumnName',
    //     start: 'asc',
    //     disableClear: true
    // };
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayCliente(c?: Cliente): string | undefined {
    return c ? c.Id + ' - ' + c.Optica + ' - ' + c.Responsable : undefined;
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

  asignarCliente(event){
    this.clienteId = event.source.value.Id;
    this.traerRemitos();
  }

  traerRemitos() {
    this.loadingSpinnerService.show();
    this.remitoService.buscarRemito(this.clienteId, this.since.toDateString(), this.today.toDateString()).subscribe(r => {
      this.dataSource.data = r;
      console.table(this.dataSource.data)
      this.loadingSpinnerService.hide();
    })
  }

  verComprobante(id: number) {
    let url = `Remito/Detalle?id=${id}`
    window.open(url, '_blank');
  }
}