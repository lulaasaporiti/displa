import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Ubicacion } from 'src/app/model/Ubicacion';
import { UbicacionAltaComponent } from '../ubicacion-alta/ubicacion-alta.component';
import { UbicacionBajaComponent } from '../ubicacion-baja/ubicacion-baja.component';
import { UbicacionModificacionComponent } from '../ubicacion-modificacion/ubicacion-modificacion.component';
import { UbicacionService } from 'src/services/ubicacion.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-ubicacion-listado',
  templateUrl: './ubicacion-listado.component.html',
  styleUrls: ['./ubicacion-listado.component.css']
})
export class UbicacionListadoComponent implements OnInit {
  
  displayedColumns: string[] = ['Nombre', 'Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<Ubicacion>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private ubicacionService: UbicacionService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadUbicacionPage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cambiarListado() {
    this.traerVigentes = !this.traerVigentes;
    this.loadUbicacionPage();
  }

  loadUbicacionPage() {
    this.loadingSpinnerService.show();
    if (this.traerVigentes == true) {
      this.ubicacionService.getUbicacionesVigentesList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    } else {
      this.ubicacionService.getUbicacionesList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    }
  }

  agregarUbicacion(): void {
    let ubicacion = <Ubicacion>{};
    const dialogRef = this.dialog.open(UbicacionAltaComponent, {
      width: '550px',
      data: { modelUbicacion: ubicacion }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.ubicacionService.saveOrUpdateUbicacion(ubicacion).subscribe(
          data => {
            this.sessionService.showSuccess("La ubicación se ha agregado correctamente.");
            this.loadUbicacionPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("La ubicación no se agregó.");
          }
        );
      }
    });
  }


  eliminarUbicacion(Ubicacion: Ubicacion): void {
    const dialogRef = this.dialog.open(UbicacionBajaComponent, {
      data: { modelUbicacion: Ubicacion }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        this.ubicacionService.deleteUbicacion(result).subscribe(
          data => {
            this.loadUbicacionPage()
            this.sessionService.showSuccess("La ubicación se ha borrado correctamente");
          },
          error => {
            // console.log(error)
            this.sessionService.showError("La ubicación no se borró.");
          }
        );
      }
    })
  }

  modificarUbicacion(event: any) {
    let ubicacionViejo = JSON.parse(JSON.stringify(event));
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(UbicacionModificacionComponent, {
      width: '550px',
      data: { modelUbicacion: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.ubicacionService.saveOrUpdateUbicacion(event).subscribe(
          data => {
            this.sessionService.showSuccess("La ubicación se ha modificado correctamente");
            this.loadUbicacionPage();

          },
          error => {
            // console.log(error)
            this.sessionService.showError("La ubicación no se modificó.");
          }
        );
      }
    });
  }
}
