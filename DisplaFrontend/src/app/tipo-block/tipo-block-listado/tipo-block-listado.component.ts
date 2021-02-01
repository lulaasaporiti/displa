import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { TipoBlock } from 'src/app/model/tipoBlock';
import { TipoBlockAltaComponent } from '../tipo-block-alta/tipo-block-alta.component';
import { TipoBlockBajaComponent } from '../tipo-block-baja/tipo-block-baja.component';
import { TipoBlockModificacionComponent } from '../tipo-block-modificacion/tipo-block-modificacion.component';
import { TipoBlockService } from 'src/services/tipo.block.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';


@Component({
  selector: 'app-tipo-block-listado',
  templateUrl: './tipo-block-listado.component.html',
  styleUrls: ['./tipo-block-listado.component.css']
})
export class TipoBlockListadoComponent implements OnInit {
  
  displayedColumns: string[] = ['Nombre', 'Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<TipoBlock>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private tipoBlockService: TipoBlockService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadTipoBlockPage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cambiarListado() {
    this.traerVigentes = !this.traerVigentes;
    this.loadTipoBlockPage();
  }

  loadTipoBlockPage() {
    this.loadingSpinnerService.show();
    if (this.traerVigentes == true) {
      this.tipoBlockService.getTiposBlocksVigentesList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    } else {
      this.tipoBlockService.getTiposBlocksList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    }
  }

  agregarTipoBlock(): void {
    let tipoBlock = <TipoBlock>{};
    const dialogRef = this.dialog.open(TipoBlockAltaComponent, {
      width: '550px',
      data: { modelTipoBlock: tipoBlock }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.tipoBlockService.saveOrUpdateTipoBlock(tipoBlock).subscribe(
          data => {
            this.sessionService.showSuccess("El tipo de block se ha agregado correctamente.");
            this.loadTipoBlockPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El tipo de block no se agregó.");
          }
        );
      }
    });
  }


  eliminarTipoBlock(tipoBlock: TipoBlock): void {
    const dialogRef = this.dialog.open(TipoBlockBajaComponent, {
      data: { modelTipoBlock: tipoBlock }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        this.tipoBlockService.deleteTipoBlock(result).subscribe(
          data => {
            this.loadTipoBlockPage()
            this.sessionService.showSuccess("El tipo de block se ha borrado correctamente");
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El tipo de block no se borró.");
          }
        );
      }
    })
  }

  modificarTipoBlock(event: any) {
    let tipoBlockViejo = JSON.parse(JSON.stringify(event));
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(TipoBlockModificacionComponent, {
      width: '550px',
      data: { modelTipoBlock: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.tipoBlockService.saveOrUpdateTipoBlock(event).subscribe(
          data => {
            this.sessionService.showSuccess("El tipo de block se ha modificado correctamente");
            this.loadTipoBlockPage();

          },
          error => {
            // console.log(error)
            this.sessionService.showError("El tipo de block no se modificó.");
          }
        );
      }
    });
  }
}
