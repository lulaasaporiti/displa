import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteBajaComponent } from '../cliente-baja/cliente-baja.component';
import { ClienteService } from 'src/services/cliente.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';
import { Observable, merge } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { CdkAccordion } from '@angular/cdk/accordion';


@Component({
  selector: 'app-cliente-bloqueado-listado',
  templateUrl: './cliente-bloqueado-listado.component.html',
  styleUrls: ['./cliente-bloqueado-listado.component.css']
})
export class ClienteBloqueadoListadoComponent implements OnInit {
  idUser: number;
  displayedColumns: string[] = ['Optica', 'Saldo', 'MontoExcedido', 'Credito', 'DiasExcedido', 'Plazo',  'Fecha', 'Motivo', 'Estado', 'Opciones'];
  traerVigentes: boolean = true;


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

  cambiarListado() {
    this.traerActivos = !this.traerActivos;
    this.loadClientePage();
  }
  

  loadClientePage() {
    this.loadingSpinnerService.show()
      this.clienteService.getClientesBloqueados()
        .subscribe(r => {
          this.dataSource.data = r;
          console.log(this.dataSource.data)
          this.loadingSpinnerService.hide();
        })
  }

}
