import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from 'src/services/cliente.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cliente-cuenta-listado',
  templateUrl: './cliente-cuenta-listado.component.html',
  styleUrls: ['./cliente-cuenta-listado.component.css']
})
export class ClienteCuentaListadoComponent implements OnInit {
  displayedColumns: string[] = ['Optica', 'Saldo', 'MontoExcedido', 'Credito', 'DiasExcedido', 'Plazo',  'Fecha', 'Motivo', 'Estado', 'Opciones'];
  panelOpenState = false;


  dataSource = new MatTableDataSource<any>();
  traerActivos: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private clienteService: ClienteService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadClientePage()
  }



  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

  loadClientePage() {
    this.loadingSpinnerService.show()
      this.clienteService.getCuentasClientes()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
  }

}
