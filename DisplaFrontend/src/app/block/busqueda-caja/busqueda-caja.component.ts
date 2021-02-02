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
import { Caja } from 'src/app/model/caja';
import { TipoBlock } from 'src/app/model/tipoBlock';
import { TipoBlockService } from 'src/services/tipo.block.service';
import { Ubicacion } from 'src/app/model/Ubicacion';
import { UbicacionService } from 'src/services/ubicacion.service';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-busqueda-caja',
  templateUrl: './busqueda-caja.component.html',
  styleUrls: ['./busqueda-caja.component.css']
})
export class BusquedaCajaComponent implements OnInit {
  
  displayedColumns: string[] = ['Nombre', 'Base/ADD', 'NumeroCajaGrande', 'NumeroCajaChica', 'Cantidad', 'Fecha'];
  dataSource = new MatTableDataSource<Caja>();
  tiposBlock: TipoBlock[];
  ubicaciones: Ubicacion[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;
  
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private blockService: BlockService,
    private sessionService: SessionService,
    private ubicacionService: UbicacionService,
    private tipoBlockService: TipoBlockService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    combineLatest(
      this.ubicacionService.getUbicacionesVigentesList(),
      this.tipoBlockService.getTiposBlocksVigentesList()
    ).subscribe(r => {
      this.ubicaciones = r[0];
      this.tiposBlock = r[1];
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadBlockPage();
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadBlockPage() {
    this.loadingSpinnerService.show()
    // if (this.traerVigentes == true) {
    this.blockService.getBlocksVigentesList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    // } else {
    //   this.blockService.getBlocksList()
    //   .subscribe(r => {
    //     this.dataSource.data = r;
        this.loadingSpinnerService.hide();
    //   })
    // }
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
