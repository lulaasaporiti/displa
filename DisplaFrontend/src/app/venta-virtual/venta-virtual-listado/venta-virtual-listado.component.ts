import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from 'src/services/cliente.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { merge, Observable } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { startWith, map } from 'rxjs/operators';
import { VentaVirtualService } from 'src/services/venta.virtual.service';


@Component({
  selector: 'app-venta-virtual-listado',
  templateUrl: './venta-virtual-listado.component.html',
  styleUrls: ['./venta-virtual-listado.component.css']
})
export class VentaVirtualListadoComponent implements OnInit {
  panelOpenState = false;
  original: any[] = [];
  displayedColumns = [ ]
  clientes: Cliente[];
  clientesControl = new FormControl();
  filteredClientes: Observable<Cliente[]>;
  dataSource = new MatTableDataSource<any>();
  todo: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private clienteService: ClienteService,
    private sessionService: SessionService,
    private ventaVirtualService: VentaVirtualService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.todo = true;
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
      this.todo = event.checked;
      this.dataSource.data = this.original;
    } else {
      this.todo =  event.checked;
      this.dataSource.data = [];
    }
  }

  applyFilterAvanzados(filtro: number, campo: string){
    console.log(filtro)
    if (campo == 'diferencia'){
      this.dataSource.data = this.dataSource.data.filter(d => d.Saldo >= filtro)   
    }
    if (campo == 'dias'){
      this.dataSource.data = this.dataSource.data.filter(d => d.DiasExcedido >= filtro)   
    }
    if (filtro.toString() == ""){
      this.dataSource.data = this.original;

    }
  }

  getDisplayedColumns() {
    return this.displayedColumns.filter(cd => cd.hide).map(cd => cd.def);
  }

  ngAfterViewInit() {
   
  }

}
