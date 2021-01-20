import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { TipoArticulo } from 'src/app/model/tipoArticulo';
import { TipoArticuloAltaComponent } from '../tipo-articulo-alta/tipo-articulo-alta.component';
import { TipoArticuloBajaComponent } from '../tipo-articulo-baja/tipo-articulo-baja.component';
import { TipoArticuloModificacionComponent } from '../tipo-articulo-modificacion/tipo-articulo-modificacion.component';
import { TipoArticuloService } from 'src/services/tipo.articulo.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';


@Component({
  selector: 'app-tipo-articulo-listado',
  templateUrl: './tipo-articulo-listado.component.html',
  styleUrls: ['./tipo-articulo-listado.component.css']
})
export class TipoArticuloListadoComponent implements OnInit {
  
  displayedColumns: string[] = ['Nombre', 'IngresosBrutos','IVA', 'Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<TipoArticulo>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private tipoArticuloService: TipoArticuloService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadTipoArticuloPage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cambiarListado() {
    this.traerVigentes = !this.traerVigentes;
    this.loadTipoArticuloPage();
  }

  loadTipoArticuloPage() {
    this.loadingSpinnerService.show();
    if (this.traerVigentes == true) {
      this.tipoArticuloService.getTiposArticulosVigentesList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    } else {
      this.tipoArticuloService.getTiposArticulosList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    }
  }

  agregarTipoArticulo(): void {
    let tipoArticulo = <TipoArticulo>{};
    const dialogRef = this.dialog.open(TipoArticuloAltaComponent, {
      width: '550px',
      data: { modelTipoArticulo: tipoArticulo }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.tipoArticuloService.saveOrUpdateTipoArticulo(tipoArticulo).subscribe(
          data => {
            this.sessionService.showSuccess("El tipo de articulo se ha agregado correctamente.");
            this.loadTipoArticuloPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El tipo de articulo no se agregó.");
          }
        );
      }
    });
  }


  eliminarTipoArticulo(tipoArticulo: TipoArticulo): void {
    const dialogRef = this.dialog.open(TipoArticuloBajaComponent, {
      data: { modelTipoArticulo: tipoArticulo }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        this.tipoArticuloService.deleteTipoArticulo(result).subscribe(
          data => {
            this.loadTipoArticuloPage()
            this.sessionService.showSuccess("El tipo de articulo se ha borrado correctamente");
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El tipo de articulo no se borró.");
          }
        );
      }
    })
  }

  modificarTipoArticulo(event: any) {
    let tipoArticuloViejo = JSON.parse(JSON.stringify(event));
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(TipoArticuloModificacionComponent, {
      width: '550px',
      data: { modelTipoArticulo: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.tipoArticuloService.saveOrUpdateTipoArticulo(event).subscribe(
          data => {
            this.sessionService.showSuccess("El tipo de articulo se ha modificado correctamente");
            this.loadTipoArticuloPage();

          },
          error => {
            // console.log(error)
            this.sessionService.showError("El tipo de articulo no se modificó.");
          }
        );
      }
    });
  }
}
