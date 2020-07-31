import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Gasto } from 'src/app/model/Gasto';
import { GastoAltaComponent } from '../gasto-alta/gasto-alta.component';
import { GastoBajaComponent } from '../gasto-baja/gasto-baja.component';
import { GastoModificacionComponent } from '../gasto-modificacion/gasto-modificacion.component';
import { GastoService } from 'src/services/gasto.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';


@Component({
  selector: 'app-gasto-listado',
  templateUrl: './gasto-listado.component.html',
  styleUrls: ['./gasto-listado.component.css']
})
export class GastoListadoComponent implements OnInit {
  
  displayedColumns: string[] = ['Nombre', 'Opciones'];
  dataSource = new MatTableDataSource<Gasto>();
  // traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private gastoService: GastoService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadGastoPage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // cambiarListado() {
  //   this.traerVigentes = !this.traerVigentes;
  //   this.loadGastoPage();
  // }

  loadGastoPage() {
    this.loadingSpinnerService.show();
    // if (this.traerVigentes == true) {
      this.gastoService.getGastosList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    // } else {
    //   this.gastoService.getGastosList()
    //   .subscribe(r => {
    //     this.dataSource.data = r;
    //     this.loadingSpinnerService.hide();
    //   })
    // }
  }

  agregarGasto(): void {
    let gasto = <Gasto>{};
    const dialogRef = this.dialog.open(GastoAltaComponent, {
      width: '550px',
      data: { modelGasto: gasto }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.gastoService.saveOrUpdateGasto(gasto).subscribe(
          data => {
            this.sessionService.showSuccess("La ubicación se ha agregado correctamente.");
            this.loadGastoPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("La ubicación no se agregó.");
          }
        );
      }
    });
  }


  eliminarGasto(Gasto: Gasto): void {
    const dialogRef = this.dialog.open(GastoBajaComponent, {
      data: { modelGasto: Gasto }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        this.gastoService.deleteGasto(result).subscribe(
          data => {
            this.loadGastoPage()
            this.sessionService.showSuccess("La ubicación se ha borrado correctamente");
          },
          error => {
            // console.log(error)
            this.sessionService.showError("La ubicación no se borró.");
          }
        );
      }
    })
  }

  modificarGasto(event: any) {
    let gastoViejo = JSON.parse(JSON.stringify(event));
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(GastoModificacionComponent, {
      width: '550px',
      data: { modelGasto: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.gastoService.saveOrUpdateGasto(event).subscribe(
          data => {
            this.sessionService.showSuccess("La ubicación se ha modificado correctamente");
            this.loadGastoPage();

          },
          error => {
            // console.log(error)
            this.sessionService.showError("La ubicación no se modificó.");
          }
        );
      }
    });
  }
}
