import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Cliente } from 'src/app/model/Cliente';
import { ClienteBajaComponent } from '../cliente-baja/cliente-baja.component';
import { ClienteService } from 'src/services/cliente.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';
import { Observable, merge } from 'rxjs';
import { combineLatest } from 'rxjs';
import { ExportacionService } from 'src/services/exportacion.service';
import { ArticuloVarioService } from 'src/services/articulo.vario.service';
import { ServicioService } from 'src/services/servicio.service';
import { LenteService } from 'src/services/lente.service';



@Component({
  selector: 'app-cliente-busqueda-lista',
  templateUrl: './cliente-busqueda-lista.component.html',
  styleUrls: ['./cliente-busqueda-lista.component.css']
})
export class ClienteBusquedaLista implements OnInit {

  dataSource = new MatTableDataSource<Cliente>();
  busquedaLentes: boolean = false;
  busquedaArticulos: boolean = false;
  busquedaServicios: boolean = false;
  cantListasArticulos: number
  cantListasServicios: number
  cantListasLentes: number

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private clienteService: ClienteService,
    private sessionService: SessionService,
    private exportacionService: ExportacionService,
    private loadingSpinnerService: LoadingSpinnerService,
    private articuloVarioService: ArticuloVarioService,
    private servicioService: ServicioService,
    private lenteService: LenteService) { }

  ngOnInit() {

    combineLatest([
      this.articuloVarioService.getCantidadListas(),
      this.servicioService.getCantidadListas(),
      this.lenteService.getCantidadListas()
    ])
      .subscribe(result => { 
        this.cantListasArticulos = result[0];
        this.cantListasServicios = result[1];;
        this.cantListasLentes = result[2]; 
    })

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
