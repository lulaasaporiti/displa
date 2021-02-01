import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { TipoInsumo } from 'src/app/model/tipoInsumo';
import { TipoInsumoAltaComponent } from '../tipo-insumo-alta/tipo-insumo-alta.component';
import { TipoInsumoBajaComponent } from '../tipo-insumo-baja/tipo-insumo-baja.component';
import { TipoInsumoModificacionComponent } from '../tipo-insumo-modificacion/tipo-insumo-modificacion.component';
import { TipoInsumoService } from 'src/services/tipo.insumo.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';


@Component({
  selector: 'app-tipo-insumo-listado',
  templateUrl: './tipo-insumo-listado.component.html',
  styleUrls: ['./tipo-insumo-listado.component.css']
})
export class TipoInsumoListadoComponent implements OnInit {
  
  displayedColumns: string[] = ['Nombre', 'NotificaStockMinimo', 'Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<TipoInsumo>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private tipoInsumoService: TipoInsumoService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadTipoInsumoPage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cambiarListado() {
    this.traerVigentes = !this.traerVigentes;
    this.loadTipoInsumoPage();
  }

  loadTipoInsumoPage() {
    this.loadingSpinnerService.show();
    if (this.traerVigentes == true) {
      this.tipoInsumoService.getTiposInsumosVigentesList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    } else {
      this.tipoInsumoService.getTiposInsumosList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    }
  }

  agregarTipoInsumo(): void {
    let tipoInsumo = <TipoInsumo>{};
    const dialogRef = this.dialog.open(TipoInsumoAltaComponent, {
      width: '550px',
      data: { modelTipoInsumo: tipoInsumo }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.tipoInsumoService.saveOrUpdateTipoInsumo(tipoInsumo).subscribe(
          data => {
            this.sessionService.showSuccess("El tipo de insumo se ha agregado correctamente.");
            this.loadTipoInsumoPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El tipo de insumo no se agregó.");
          }
        );
      }
    });
  }


  eliminarTipoInsumo(tipoInsumo: TipoInsumo): void {
    const dialogRef = this.dialog.open(TipoInsumoBajaComponent, {
      data: { modelTipoInsumo: tipoInsumo }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        this.tipoInsumoService.deleteTipoInsumo(result).subscribe(
          data => {
            this.loadTipoInsumoPage()
            this.sessionService.showSuccess("El tipo de insumo se ha borrado correctamente");
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El tipo de insumo no se borró.");
          }
        );
      }
    })
  }

  modificarTipoInsumo(event: any) {
    let tipoInsumoViejo = JSON.parse(JSON.stringify(event));
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(TipoInsumoModificacionComponent, {
      width: '550px',
      data: { modelTipoInsumo: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.tipoInsumoService.saveOrUpdateTipoInsumo(event).subscribe(
          data => {
            this.sessionService.showSuccess("El tipo de insumo se ha modificado correctamente");
            this.loadTipoInsumoPage();

          },
          error => {
            // console.log(error)
            this.sessionService.showError("El tipo de insumo no se modificó.");
          }
        );
      }
    });
  }
}
