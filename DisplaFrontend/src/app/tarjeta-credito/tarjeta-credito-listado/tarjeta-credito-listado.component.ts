import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { TarjetaCredito } from 'src/app/model/tarjetaCredito';
import { TarjetaCreditoAltaComponent } from '../tarjeta-credito-alta/tarjeta-credito-alta.component';
import { TarjetaCreditoBajaComponent } from '../tarjeta-credito-baja/tarjeta-credito-baja.component';
import { TarjetaCreditoModificacionComponent } from '../tarjeta-credito-modificacion/tarjeta-credito-modificacion.component';
import { TarjetaCreditoService } from 'src/services/tarjeta.credito.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tarjeta-credito-listado',
  templateUrl: './tarjeta-credito-listado.component.html',
  styleUrls: ['./tarjeta-credito-listado.component.css']
})
export class TarjetaCreditoListadoComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Banco', 'Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<TarjetaCredito>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private tarjetaCreditoService: TarjetaCreditoService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadTarjetaCreditoPage();
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cambiarListado() {
    this.traerVigentes = !this.traerVigentes;
    this.loadTarjetaCreditoPage();
  }

  loadTarjetaCreditoPage() {
    this.loadingSpinnerService.show();
    if (this.traerVigentes == true) {
      this.tarjetaCreditoService.getTarjetasCreditoVigentesList()
        .subscribe(r => {
          this.dataSource.data = r;
          console.log(this.dataSource.data)
          this.loadingSpinnerService.hide();
        })
    } else {
      this.tarjetaCreditoService.getTarjetasCreditoList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
    }
  }

  getMovimientosTarjetaCredito(idTarjetaCredito) {
    this.router.navigateByUrl('/MovimientoTarjetaCredito/Listado?idTarjetaCredito=' + idTarjetaCredito);
  }

  agregarTarjetaCredito(): void {
    let tarjetaCredito = <TarjetaCredito>{};
    const dialogRef = this.dialog.open(TarjetaCreditoAltaComponent, {
      width: '550px',
      data: { modelTarjetaCredito: tarjetaCredito }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.tarjetaCreditoService.saveOrUpdateTarjetaCredito(tarjetaCredito).subscribe(
          data => {
            this.sessionService.showSuccess("La tarjeta de crédito se ha agregado correctamente.");
            this.loadTarjetaCreditoPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("La tarjeta de crédito no se agregó.");
          }
        );
      }
    });
  }


  eliminarTarjetaCredito(tarjetaCredito: TarjetaCredito): void {
    const dialogRef = this.dialog.open(TarjetaCreditoBajaComponent, {
      data: { modelTarjetaCredito: tarjetaCredito }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.tarjetaCreditoService.deleteTarjetaCredito(result).subscribe(
          data => {
            this.sessionService.showSuccess("La tarjeta de crédito se ha borrado correctamente");
            this.loadTarjetaCreditoPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("La tarjeta de crédito no se borró.");
          }
        );
      }
    })
  }

  modificarTarjetaCredito(event: any) {
    let tarjetaCreditoViejo = JSON.parse(JSON.stringify(event));
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(TarjetaCreditoModificacionComponent, {
      width: '550px',
      data: { modelTarjetaCredito: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.tarjetaCreditoService.saveOrUpdateTarjetaCredito(event).subscribe(
          data => {
            this.sessionService.showSuccess("La tarjeta de crédito se ha modificado correctamente");
            this.loadTarjetaCreditoPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("La tarjeta de crédito no se modificó.");
          }
        );
      }
    });
  }
}
