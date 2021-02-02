import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Block } from 'src/app/model/block';
import { BlockAltaComponent } from '../block-alta/block-alta.component';
import { BlockBajaComponent } from '../block-baja/block-baja.component';
import { BlockModificacionComponent } from '../block-modificacion/block-modificacion.component';
import { BlockService } from 'src/services/block.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-block-listado',
  templateUrl: './block-listado.component.html',
  styleUrls: ['./block-listado.component.css']
})
export class BlockListadoComponent implements OnInit {
  
  displayedColumns: string[] = ['Nombre', 'TipoBlock', 'StockMinimo', 'StockActual', 'Precio', 'Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<Block>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;
  
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private blockService: BlockService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadBlockPage();
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cambiarListado() {
    this.traerVigentes = !this.traerVigentes;
    this.loadBlockPage();
  }

  loadBlockPage() {
    this.loadingSpinnerService.show()
    if (this.traerVigentes == true) {
    this.blockService.getBlocksVigentesList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    } else {
      this.blockService.getBlocksList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    }
  }

  getMovimientosBlock(idBlock){
    this.router.navigateByUrl('/MovimientoBlock/Listado?idBlock='+idBlock);
  }

  agregarBlock(): void {
    let block = <Block>{};
    const dialogRef = this.dialog.open(BlockAltaComponent, {
      width: '550px',
      data: { modelBlock: block }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.blockService.saveOrUpdateBlock(block).subscribe(
          data => {
            this.sessionService.showSuccess("El block se ha agregado correctamente.");
            this.loadBlockPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El block no se agregó.");
          }
        );
      }
    });
  }


  eliminarBlock(block: Block): void {
    const dialogRef = this.dialog.open(BlockBajaComponent, {
      data: { modelBlock: block }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.blockService.deleteBlock(result).subscribe(
          data => {
            this.sessionService.showSuccess("El block se ha borrado correctamente");
            this.loadBlockPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El block no se borró.");
          }
        );
      }
    })
  }

  modificarBlock(event: any) {
    let blockViejo = JSON.parse(JSON.stringify(event));
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(BlockModificacionComponent, {
      width: '550px',
      data: { modelBlock: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.blockService.saveOrUpdateBlock(event).subscribe(
          data => {
            this.sessionService.showSuccess("El block se ha modificado correctamente");
            this.loadBlockPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El block no se modificó.");
          }
        );
      }
    });
  }
}
