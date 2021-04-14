import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { TipoDescuento } from 'src/app/model/tipoDescuento';
import { TipoDescuentoAltaComponent } from '../tipo-descuento-alta/tipo-descuento-alta.component';
import { TipoDescuentoBajaComponent } from '../tipo-descuento-baja/tipo-descuento-baja.component';
import { TipoDescuentoModificacionComponent } from '../tipo-descuento-modificacion/tipo-descuento-modificacion.component';
import { TipoDescuentoService } from 'src/services/tipo.descuento.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-tipo-descuento-listado',
  templateUrl: './tipo-descuento-listado.component.html',
  styleUrls: ['./tipo-descuento-listado.component.css']
})
export class TipoDescuentoListadoComponent implements OnInit {
  
  displayedColumns: string[] = ['Descripcion', 'Porcentaje', 'Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<TipoDescuento>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private tipoDescuentoService: TipoDescuentoService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadTipoDescuentoPage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cambiarListado() {
    this.traerVigentes = !this.traerVigentes;
    this.loadTipoDescuentoPage();
  }

  loadTipoDescuentoPage() {
    this.loadingSpinnerService.show()
    if (this.traerVigentes == true) {
      this.tipoDescuentoService.getTiposDescuentosVigentesList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    } else {
      this.tipoDescuentoService.getTiposDescuentosList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    }
  }

  agregarTipoDescuento(): void {
    let tipoDescuento = <TipoDescuento>{};
    const dialogRef = this.dialog.open(TipoDescuentoAltaComponent, {
      width: '550px',
      data: { modelTipoDescuento: tipoDescuento }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.tipoDescuentoService.saveOrUpdateTipoDescuento(tipoDescuento).subscribe(
          data => {
            this.sessionService.showSuccess("El tipo de descuento se ha agregado correctamente.");
            this.loadTipoDescuentoPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El tipo de descuento no se agregó.");
          }
        );
      }
    });
  }


  eliminarTipoDescuento(tipoDescuento: TipoDescuento): void {
    const dialogRef = this.dialog.open(TipoDescuentoBajaComponent, {
      data: { modelTipoDescuento: tipoDescuento }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        this.tipoDescuentoService.deleteTipoDescuento(result).subscribe(
          data => {
            this.loadTipoDescuentoPage()
            this.sessionService.showSuccess("El tipo de descuento se ha borrado correctamente");
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El tipo de descuento no se borró.");
          }
        );
      }
    })
  }

  modificarTipoDescuento(event: any) {
    let tipoDescuentoViejo = JSON.parse(JSON.stringify(event));
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(TipoDescuentoModificacionComponent, {
      width: '550px',
      data: { modelTipoDescuento: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.tipoDescuentoService.saveOrUpdateTipoDescuento(event).subscribe(
          data => {
            this.sessionService.showSuccess("El tipo de descuento se ha modificado correctamente");
            this.loadTipoDescuentoPage();

          },
          error => {
            // console.log(error)
            this.sessionService.showError("El tipo de descuento no se modificó.");
          }
        );
      }
    });
  }
}
