import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MovimientoBlock } from 'src/app/model/movimientoBlock';
import { MovimientoBlockAltaComponent } from '../movimiento-block-alta/movimiento-block-alta.component';
import { MovimientoBlockService } from 'src/services/movimiento.block.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-movimiento-block-listado',
  templateUrl: './movimiento-block-listado.component.html',
  styleUrls: ['./movimiento-block-listado.component.css']
})
export class MovimientoBlockListadoComponent implements OnInit {
  
  displayedColumns: string[] = ['tipoMovimiendo', 'fecha', 'cantidad', 'base', 'adicion', 'ubicacion', 'usuario', 'opciones'];
  dataSource = new MatTableDataSource<MovimientoBlock>();

  idBlock: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private segment: ActivatedRoute,
    private movimientoBlockService: MovimientoBlockService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { 

      this.segment.queryParams.subscribe((params: Params) => {
        this.idBlock = params['idBlock'];
      });
    }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadMovimientoBlockPage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadMovimientoBlockPage() {
    this.loadingSpinnerService.show()
    this.movimientoBlockService.getMovimientoBlockList(this.idBlock)
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
  }

  agregarMovimientoBlock(): void {
    let movimientoBlock = <MovimientoBlock>{};
    movimientoBlock.IdBlock = this.idBlock;
    movimientoBlock.IdUsuario = this.sessionService.getPayload()['idUser'];

    const dialogRef = this.dialog.open(MovimientoBlockAltaComponent, {
      width: '550px',
      data: { modelMovimientoBlock: movimientoBlock }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.movimientoBlockService.saveOrUpdateMovimientoBlock(movimientoBlock).subscribe(
          data => {
            this.sessionService.showSuccess("El tipo de block se ha agregado correctamente.");
            this.loadMovimientoBlockPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El tipo de block no se agregó.");
          }
        );
      }
    });
  }
}
