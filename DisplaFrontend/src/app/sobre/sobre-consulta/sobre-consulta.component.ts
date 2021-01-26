import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
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
  panelOpenState = false;
  today = new Date();
  original: any[] = [];
  since: Date;
  cliente = <Cliente>{};
  todo: boolean;
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
    private sessionService: SessionService,
    private clienteService: ClienteService,
    private sobreService: SobreService,
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
      });
    this.loadSobrePage();
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }


  loadSobrePage() {
    this.loadingSpinnerService.show();
   
  }

  buscarSobres() {
  this.sobreService.getSobresConsulta(this.cliente.Id, this.since.toDateString(), this.today.toDateString())
  .subscribe(r => {
    this.dataSource.data = r;
    console.log(r)
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

  displayCliente(c?: Cliente): string | undefined {
    console.log(c)
    console.log(c == null || c == undefined)
    return (c != null || c == undefined) ? '' : c.Id + ' - ' + c.Optica + ' - ' + c.Responsable;
  }

  traerTodos(event) {
    if (!event.checked) {
         this.dataSource.data = this.original;
    } else {
      this.todo = event.checked;
      this.dataSource.data = [];
    }
  }


  applyFilterAvanzados(event, campo: string) {
    if (campo == 'desde'){
      this.dataSource.data = this.original.filter(v => new Date(Date.parse(v.Fecha.toString())) >= this.since && new Date(Date.parse(v.Fecha.toString())) <= this.today);
    }
    if (campo == 'hasta'){
      this.dataSource.data = this.original.filter(v => new Date(Date.parse(v.Fecha.toString())) >= this.since && new Date(Date.parse(v.Fecha.toString())) <= this.today);
    }
    if (campo == 'todos'){
      this.traerTodos(event);
    }
    if (campo == 'sobre'){
      this.dataSource.data = this.original.filter(s => s.Numero == +event);
    }
    if (campo == 'cliente'){
      this.todo = false;
      this.dataSource.data = this.original.filter(s => s.IdCliente == event);
    }
    if (event.toString() == ""){
    this.dataSource.data = this.original;
    }
  }

 
}
