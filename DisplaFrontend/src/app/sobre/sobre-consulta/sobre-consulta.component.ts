import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { SobreService } from 'src/services/sobre.service';
import { Cliente } from 'src/app/model/cliente';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Sobre } from 'src/app/model/sobre';
import { ClienteService } from 'src/services/cliente.service';
import { startWith, map } from 'rxjs/operators';



@Component({
  selector: 'app-sobre-consulta',
  templateUrl: './sobre-consulta.component.html',
  styleUrls: ['./sobre-consulta.component.css']
})
export class SobreConsultaComponent implements OnInit {
  today = new Date();
  original: any[] = [];
  since: Date;
  cliente;
  todo: boolean = true;
  displayedColumns: string[] = ['Optica','Sobre','Entrada', 'Salida', 'NumeroComprobante','Observaciones'];
  dataSource = new MatTableDataSource<Sobre>();
  clientes: Cliente[];
  clientesControl = new FormControl();
  filteredClientes: Observable<Cliente[]>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private sobreService: SobreService,
    private sessionService: SessionService,
    private clienteService: ClienteService,
    private changeDetector: ChangeDetectorRef,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.since = new Date(new Date().setDate(this.today.getDate()-10));
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
          this.loadingSpinnerService.hide();
      });
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  buscarSobres() {
    this.loadingSpinnerService.show();
    this.sobreService.getSobresConsulta((this.cliente != undefined) ? this.cliente.Id : 0, this.since.toDateString(), this.today.toDateString())
      .subscribe(r => {
        this.dataSource.data = r;
        this.original = r;
        // this.todo = true;
        this.loadingSpinnerService.hide();
      })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  displayCliente(c): string | undefined {
    return c ? c.Id + ' - ' + c.Optica + ' - ' + c.Responsable : '';
  }


  applyFilterAvanzados(event, campo: string) {
    if (campo == 'todos'){
      this.clientesControl.setValue("");
      this.cliente = undefined;
      this.todo = event.checked;
      // this.traerTodos(event);
      this.buscarSobres()
    }
    if (campo == 'desde'){
      this.buscarSobres()
    }
    if (campo == 'hasta'){
      this.buscarSobres()
    }
    if (campo == 'sobre'){
      this.dataSource.data = this.original.filter(s => s.Numero == +event);
    }
    if (campo == 'cliente'){
      this.todo = (this.cliente == "");
      this.cliente = event.source.value;
      this.changeDetector.detectChanges();
      this.buscarSobres()
      // this.buscarSobresCliente(event)
      // this.dataSource.data = this.original.filter(s => s.IdCliente == event.value.Id);
    }
    if (event.toString() == ""){
      this.dataSource.data = this.original;
    }
  }

 
}
