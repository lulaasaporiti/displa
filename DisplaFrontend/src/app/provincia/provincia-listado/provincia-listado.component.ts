import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Provincia } from 'src/app/model/Provincia';
import { ProvinciaAltaComponent } from '../provincia-alta/provincia-alta.component';
import { ProvinciaBajaComponent } from '../provincia-baja/provincia-baja.component';
import { ProvinciaModificacionComponent } from '../provincia-modificacion/provincia-modificacion.component';
import { ProvinciaService } from 'src/services/provincia.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-provincia-listado',
  templateUrl: './provincia-listado.component.html',
  styleUrls: ['./provincia-listado.component.css']
})
export class ProvinciaListadoComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<Provincia>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private provinciaService: ProvinciaService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadProvinciaPage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cambiarListado() {
    this.traerVigentes = !this.traerVigentes;
    this.loadProvinciaPage();
  }

  loadProvinciaPage() {
    this.loadingSpinnerService.show();
    if (this.traerVigentes == true) {
      this.provinciaService.getProvinciasVigentesList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
    } else {
      this.provinciaService.getProvinciasList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
    }
  }

  agregarProvincia(): void {
    let provincia = <Provincia>{};
    const dialogRef = this.dialog.open(ProvinciaAltaComponent, {
      width: '550px',
      data: { modelProvincia: provincia }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.provinciaService.saveOrUpdateProvincia(provincia).subscribe(
          data => {
            this.sessionService.showSuccess("La provincia se ha agregado correctamente.");
            this.loadProvinciaPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("La provincia no se agregó.");
          }
        );
      }
    });
  }


  eliminarProvincia(Provincia: Provincia): void {
    const dialogRef = this.dialog.open(ProvinciaBajaComponent, {
      data: { modelProvincia: Provincia }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        this.provinciaService.deleteProvincia(result).subscribe(
          data => {
            this.loadProvinciaPage()
            this.sessionService.showSuccess("La provincia se ha borrado correctamente");
          },
          error => {
            // console.log(error)
            this.sessionService.showError("La provincia no se borró.");
          }
        );
      }
    })
  }

  modificarProvincia(event: any) {
    let provinciaViejo = JSON.parse(JSON.stringify(event));
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(ProvinciaModificacionComponent, {
      width: '550px',
      data: { modelProvincia: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.provinciaService.saveOrUpdateProvincia(event).subscribe(
          data => {
            this.sessionService.showSuccess("La provincia se ha modificado correctamente");
            this.loadProvinciaPage();

          },
          error => {
            // console.log(error)
            this.sessionService.showError("La provincia no se modificó.");
          }
        );
      }
    });
  }
}
