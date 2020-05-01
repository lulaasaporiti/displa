import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Servicio } from 'src/app/model/servicio';
import { ServicioAltaComponent } from '../servicio-alta/servicio-alta.component';
import { ServicioBajaComponent } from '../servicio-baja/servicio-baja.component';
import { ServicioModificacionComponent } from '../servicio-modificacion/servicio-modificacion.component';
import { ServicioService } from 'src/services/servicio.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-servicio-listado',
  templateUrl: './servicio-listado.component.html',
  styleUrls: ['./servicio-listado.component.css']
})
export class ServicioListadoComponent implements OnInit {
  
  displayedColumns: string[] = ['Nombre', 'TipoServicio', 'Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<Servicio>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;
  
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private servicioService: ServicioService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadServicioPage();
    this.searchElement.nativeElement.focus();
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cambiarListado() {
    this.traerVigentes = !this.traerVigentes;
    this.loadServicioPage();
  }

  loadServicioPage() {
    this.loadingSpinnerService.show();
    if (this.traerVigentes == true) {
      this.servicioService.getServiciosVigentesList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    } else {
    this.servicioService.getServiciosList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    }
  }

  getMovimientosServicio(idServicio){
    this.router.navigateByUrl('/MovimientoServicio/Listado?idServicio='+idServicio);
  }

  agregarServicio(): void {
    let servicio = <Servicio>{};
    servicio.PrecioServicio = [];
    const dialogRef = this.dialog.open(ServicioAltaComponent, {
      width: '550px',
      data: { modelServicio: servicio }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.servicioService.saveOrUpdateServicio(servicio).subscribe(
          data => {
            this.sessionService.showSuccess("El servicio se ha agregado correctamente.");
            this.loadServicioPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El servicio no se agregó.");
          }
        );
      }
    });
  }


  eliminarServicio(servicio: Servicio): void {
    const dialogRef = this.dialog.open(ServicioBajaComponent, {
      data: { modelServicio: servicio }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.servicioService.deleteServicio(result).subscribe(
          data => {
            this.sessionService.showSuccess("El servicio se ha borrado correctamente");
            this.loadServicioPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El servicio no se borró.");
          }
        );
      }
    })
  }

  modificarServicio(event: any) {
    let servicioViejo = JSON.parse(JSON.stringify(event));
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(ServicioModificacionComponent, {
      width: '550px',
      data: { modelServicio: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.servicioService.saveOrUpdateServicio(event).subscribe(
          data => {
            this.sessionService.showSuccess("El servicio se ha modificado correctamente");
            this.loadServicioPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El servicio no se modificó.");
          }
        );
      }
    });
  }
}
