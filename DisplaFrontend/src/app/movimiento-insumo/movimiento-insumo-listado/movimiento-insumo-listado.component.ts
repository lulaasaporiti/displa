import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MovimientoInsumo } from 'src/app/model/movimientoInsumo';
import { MovimientoInsumoAltaComponent } from '../movimiento-insumo-alta/movimiento-insumo-alta.component';
import { MovimientoInsumoService } from 'src/services/movimiento.insumo.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-movimiento-insumo-listado',
  templateUrl: './movimiento-insumo-listado.component.html',
  styleUrls: ['./movimiento-insumo-listado.component.css']
})
export class MovimientoInsumoListadoComponent implements OnInit {
  
  displayedColumns: string[] = ['tipoMovimiendo', 'fecha', 'cantidad', 'usuario', 'opciones'];
  dataSource = new MatTableDataSource<MovimientoInsumo>();

  idInsumo: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private segment: ActivatedRoute,
    private movimientoInsumoService: MovimientoInsumoService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { 

      this.segment.queryParams.subscribe((params: Params) => {
        this.idInsumo = params['idInsumo'];
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
    this.movimientoInsumoService.getMovimientoInsumoList(this.idInsumo)
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
  }

  agregarMovimientoInsumo(): void {
    let movimientoInsumo = <MovimientoInsumo>{};
    movimientoInsumo.idInsumo = this.idInsumo;
    movimientoInsumo.idUsuario = this.sessionService.getPayload()['idUser'];

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
