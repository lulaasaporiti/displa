import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Localidad } from 'src/app/model/localidad';
import { LocalidadAltaComponent } from '../localidad-alta/localidad-alta.component';
import { LocalidadBajaComponent } from '../localidad-baja/localidad-baja.component';
import { LocalidadModificacionComponent } from '../localidad-modificacion/localidad-modificacion.component';
import { LocalidadService } from 'src/services/localidad.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-localidad-listado',
  templateUrl: './localidad-listado.component.html',
  styleUrls: ['./localidad-listado.component.css']
})
export class LocalidadListadoComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Cp', 'Provincia', 'Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<Localidad>();
  traerVigentes: boolean = true;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private localidadService: LocalidadService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadLocalidadPage();
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cambiarListado() {
    this.traerVigentes = !this.traerVigentes;
    this.loadLocalidadPage();
  }

  loadLocalidadPage() {
    this.loadingSpinnerService.show();
    if (this.traerVigentes == true) {
      this.localidadService.getLocalidadesVigentesList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
    } else {
      this.localidadService.getLocalidadesList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
    }
  }


  agregarLocalidad(): void {
    let localidad = <Localidad>{};
    const dialogRef = this.dialog.open(LocalidadAltaComponent, {
      width: '550px',
      data: { modelLocalidad: localidad }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.localidadService.saveOrUpdateLocalidad(localidad).subscribe(
          data => {
            this.sessionService.showSuccess("La localidad se ha agregado correctamente.");
            this.loadLocalidadPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("La localidad no se agregó.");
          }
        );
      }
    });
  }


  eliminarLocalidad(localidad: Localidad): void {
    const dialogRef = this.dialog.open(LocalidadBajaComponent, {
      data: { modelLocalidad: localidad }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.localidadService.deleteLocalidad(result).subscribe(
          data => {
            this.sessionService.showSuccess("La localidad se ha borrado correctamente");
            this.loadLocalidadPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("La localidad no se borró.");
          }
        );
      }
    })
  }

  modificarLocalidad(event: any) {
    let localidadViejo = JSON.parse(JSON.stringify(event));
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(LocalidadModificacionComponent, {
      width: '550px',
      data: { modelLocalidad: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.localidadService.saveOrUpdateLocalidad(event).subscribe(
          data => {
            this.sessionService.showSuccess("La localidad se ha modificado correctamente");
            this.loadLocalidadPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("La localidad no se modificó.");
          }
        );
      }
    });
  }
}
