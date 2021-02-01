import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { TipoComprobanteBajaComponent } from '../tipo-insumo-baja/tipo-comprobante-baja.component';
import { TipoInsumoService } from 'src/services/tipo.insumo.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { TipoComprobante } from 'src/app/model/tipoComprobante';
import { TipoComprobanteModificacionComponent } from '../tipo-comprobante-modificacion/tipo-comprobante-modificacion.component';
import { TipoComprobanteAltaComponent } from '../tipo-comprobante-alta/tipo-comprobante-alta.component';
import { TipoComprobanteService } from 'src/services/tipo.comprobante.service';


@Component({
  selector: 'app-tipo-comprobante-listado',
  templateUrl: './tipo-comprobante-listado.component.html',
  styleUrls: ['./tipo-comprobante-listado.component.css']
})
export class TipoComprobanteListadoComponent implements OnInit {
  
  displayedColumns: string[] = ['Codigo', 'Descripcion', 'Opciones'];
  dataSource = new MatTableDataSource<TipoComprobante>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private tipoComprobanteService: TipoComprobanteService,
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
      this.tipoComprobanteService.getTiposComprobantesList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
   
  }

  agregarTipoComprobante(): void {
    let tipoComprobante = <TipoComprobante>{};
    const dialogRef = this.dialog.open(TipoComprobanteAltaComponent, {
      width: '550px',
      data: { modelTipoComprobante: tipoComprobante }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.tipoComprobanteService.saveOrUpdateTipoComprobante(tipoComprobante).subscribe(
          data => {
            this.sessionService.showSuccess("El tipo de comprobante se ha agregado correctamente.");
            this.loadTipoInsumoPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El tipo de comprobante no se agregó.");
          }
        );
      }
    });
  }


  eliminarTipoComprobante(tipoComprobante: TipoComprobante): void {
    const dialogRef = this.dialog.open(TipoComprobanteBajaComponent, {
      data: { modelTipoComprobante: tipoComprobante }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        this.tipoComprobanteService.deleteTipoComprobante(result).subscribe(
          data => {
            this.loadTipoInsumoPage()
            this.sessionService.showSuccess("El tipo de comprobante se ha borrado correctamente");
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El tipo de comprobante no se borró.");
          }
        );
      }
    })
  }

  modificarTipoComprobante(event: any) {
    let tipoComprobanteViejo = JSON.parse(JSON.stringify(event));
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(TipoComprobanteModificacionComponent, {
      width: '550px',
      data: { modelTipoComprobante: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.tipoComprobanteService.saveOrUpdateTipoComprobante(event).subscribe(
          data => {
            this.sessionService.showSuccess("El tipo de comprobante se ha modificado correctamente");
            this.loadTipoInsumoPage();

          },
          error => {
            // console.log(error)
            this.sessionService.showError("El tipo de comprobante no se modificó.");
          }
        );
      }
    });
  }
}
