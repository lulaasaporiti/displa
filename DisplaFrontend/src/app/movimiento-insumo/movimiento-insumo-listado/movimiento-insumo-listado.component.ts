import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MovimientoInsumo } from 'src/app/model/movimientoInsumo';
import { MovimientoInsumoAltaComponent } from '../movimiento-insumo-alta/movimiento-insumo-alta.component';
import { MovimientoInsumoService } from 'src/services/movimiento.insumo.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { ActivatedRoute, Params } from '@angular/router';
import { InsumoService } from 'src/services/insumo.service';
import { Insumo } from 'src/app/model/insumo';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-movimiento-insumo-listado',
  templateUrl: './movimiento-insumo-listado.component.html',
  styleUrls: ['./movimiento-insumo-listado.component.css']
})
export class MovimientoInsumoListadoComponent implements OnInit {
  
  displayedColumns: string[] = ['TipoMovimiento', 'Fecha', 'Cantidad', 'Usuario'];
  dataSource = new MatTableDataSource<MovimientoInsumo>();

  idInsumo: number;
  insumo = <Insumo>{};

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private segment: ActivatedRoute,
    private insumoService: InsumoService,
    private movimientoInsumoService: MovimientoInsumoService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { 

      this.segment.queryParams.subscribe((params: Params) => {
        this.idInsumo = params['idInsumo'];
        this.insumoService.getById(this.idInsumo).subscribe(r => {
          this.insumo = r;
        });
      });
    }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadMovimientoInsumoPage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadMovimientoInsumoPage() {
    this.loadingSpinnerService.show()
    combineLatest([
      this.movimientoInsumoService.getMovimientoInsumoList(this.idInsumo),
      this.insumoService.getById(this.idInsumo)
    ])
      .subscribe(r => {
        this.dataSource.data = r[0];
        this.insumo = r[1]
        this.loadingSpinnerService.hide();
      })
  }

  agregarMovimientoInsumo(): void {
    let movimientoInsumo = <MovimientoInsumo>{};
    movimientoInsumo.IdInsumo = this.idInsumo;
    // movimientoInsumo.IdInsumoNavigation = this.insumo;
    movimientoInsumo.IdUsuario = this.sessionService.getPayload()['idUser'];
    const dialogRef = this.dialog.open(MovimientoInsumoAltaComponent, {
      width: '550px',
      data: { modelMovimientoInsumo: movimientoInsumo }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.movimientoInsumoService.saveOrUpdateMovimientoInsumo(movimientoInsumo).subscribe(
          data => {
            this.sessionService.showSuccess("El tipo de insumo se ha agregado correctamente.");
            this.loadMovimientoInsumoPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El tipo de insumo no se agregó.");
          }
        );
      }
    });
  }
}
