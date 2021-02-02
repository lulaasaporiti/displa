import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Insumo } from 'src/app/model/insumo';
import { InsumoAltaComponent } from '../insumo-alta/insumo-alta.component';
import { InsumoBajaComponent } from '../insumo-baja/insumo-baja.component';
import { InsumoModificacionComponent } from '../insumo-modificacion/insumo-modificacion.component';
import { InsumoService } from 'src/services/insumo.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-insumo-listado',
  templateUrl: './insumo-listado.component.html',
  styleUrls: ['./insumo-listado.component.css']
})
export class InsumoListadoComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'TipoInsumo', 'StockMinimo', 'StockActual', 'Precio', 'Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<Insumo>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private insumoService: InsumoService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadInsumoPage();
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
    this.loadInsumoPage();
  }

  loadInsumoPage() {
    this.loadingSpinnerService.show();
    if (this.traerVigentes == true) {
      this.insumoService.getInsumosVigentesList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })

    } else {
      this.insumoService.getInsumosList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
    }
  }

  getMovimientosInsumo(idInsumo) {
    this.router.navigateByUrl('/MovimientoInsumo/Listado?idInsumo=' + idInsumo);
  }

  agregarInsumo(): void {
    let insumo = <Insumo>{};
    const dialogRef = this.dialog.open(InsumoAltaComponent, {
      width: '550px',
      data: { modelInsumo: insumo }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.insumoService.saveOrUpdateInsumo(insumo).subscribe(
          data => {
            this.sessionService.showSuccess("El insumo se ha agregado correctamente.");
            this.loadInsumoPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El insumo no se agregó.");
          }
        );
      }
    });
  }


  eliminarInsumo(insumo: Insumo): void {
    const dialogRef = this.dialog.open(InsumoBajaComponent, {
      data: { modelInsumo: insumo }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.insumoService.deleteInsumo(result).subscribe(
          data => {
            this.sessionService.showSuccess("El insumo se ha borrado correctamente");
            this.loadInsumoPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El insumo no se borró.");
          }
        );
      }
    })
  }

  modificarInsumo(event: any) {
    let insumoViejo = JSON.parse(JSON.stringify(event));
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(InsumoModificacionComponent, {
      width: '550px',
      data: { modelInsumo: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.insumoService.saveOrUpdateInsumo(event).subscribe(
          data => {
            this.sessionService.showSuccess("El insumo se ha modificado correctamente");
            this.loadInsumoPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El insumo no se modificó.");
          }
        );
      }
    });
  }
}
