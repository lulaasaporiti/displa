import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { TipoServicio } from 'src/app/model/tipoServicio';
import { TipoServicioAltaComponent } from '../tipo-servicio-alta/tipo-servicio-alta.component';
import { TipoServicioBajaComponent } from '../tipo-servicio-baja/tipo-servicio-baja.component';
import { TipoServicioModificacionComponent } from '../tipo-servicio-modificacion/tipo-servicio-modificacion.component';
import { TipoServicioService } from 'src/services/tipo.servicio.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';


@Component({
  selector: 'app-tipo-servicio-listado',
  templateUrl: './tipo-servicio-listado.component.html',
  styleUrls: ['./tipo-servicio-listado.component.css']
})
export class TipoServicioListadoComponent implements OnInit {
  
  displayedColumns: string[] = ['Nombre', 'IngresosBrutos', 'Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<TipoServicio>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private tipoServicioService: TipoServicioService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadTipoServicioPage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadTipoServicioPage() {
    this.loadingSpinnerService.show()
    this.tipoServicioService.getTiposServiciosList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
  }

  agregarTipoServicio(): void {
    let tipoServicio = <TipoServicio>{};
    const dialogRef = this.dialog.open(TipoServicioAltaComponent, {
      width: '550px',
      data: { modelTipoServicio: tipoServicio }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.tipoServicioService.saveOrUpdateTipoServicio(tipoServicio).subscribe(
          data => {
            this.sessionService.showSuccess("El tipo de servicio se ha agregado correctamente.");
            this.loadTipoServicioPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El tipo de servicio no se agregó.");
          }
        );
      }
    });
  }


  eliminarTipoServicio(tipoServicio: TipoServicio): void {
    const dialogRef = this.dialog.open(TipoServicioBajaComponent, {
      data: { modelTipoServicio: tipoServicio }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        this.tipoServicioService.deleteTipoServicio(result).subscribe(
          data => {
            this.loadTipoServicioPage()
            this.sessionService.showSuccess("El tipo de servicio se ha borrado correctamente");
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El tipo de servicio no se borró.");
          }
        );
      }
    })
  }

  modificarTipoServicio(event: any) {
    let tipoServicioViejo = JSON.parse(JSON.stringify(event));
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(TipoServicioModificacionComponent, {
      width: '550px',
      data: { modelTipoServicio: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.tipoServicioService.saveOrUpdateTipoServicio(event).subscribe(
          data => {
            this.sessionService.showSuccess("El tipo de servicio se ha modificado correctamente");
            this.loadTipoServicioPage();

          },
          error => {
            // console.log(error)
            this.sessionService.showError("El tipo de servicio no se modificó.");
          }
        );
      }
    });
  }
}
