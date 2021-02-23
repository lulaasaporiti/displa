import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { CuentaBancaria } from 'src/app/model/cuentaBancaria';
import { CuentaBancariaService } from 'src/services/cuenta.bancaria.service';
import { CuentaBancariaBajaComponent } from '../cuenta-bancaria-baja/cuenta-bancaria-baja.component';
import { CuentaBancariaAltaComponent } from '../cuenta-bancaria-alta/cuenta-bancaria-alta.component';
import { CuentaBancariaModificacionComponent } from '../cuenta-bancaria-modificacion/cuenta-bancaria-modificacion.component';


@Component({
  selector: 'app-cuenta-bancaria-listado',
  templateUrl: './cuenta-bancaria-listado.component.html',
  styleUrls: ['./cuenta-bancaria-listado.component.css']
})
export class CuentaBancariaListadoComponent implements OnInit {

  displayedColumns: string[] = ['Numero', 'SaldoInicial', 'FechaApertura', 'Banco', 'Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<CuentaBancaria>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private sessionService: SessionService,
    private cuentaBancariaService: CuentaBancariaService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadCuentaBancariaPage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  cambiarListado() {
    this.traerVigentes = !this.traerVigentes;
    this.loadCuentaBancariaPage();
  }

  loadCuentaBancariaPage() {
    this.loadingSpinnerService.show()
    if (this.traerVigentes == true) {
      this.cuentaBancariaService.getCuentaBancariasVigentesList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
    } else {
      this.cuentaBancariaService.getCuentaBancariasList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
    }
  }

  agregarCuentaBancaria(): void {
    let cuenta = <CuentaBancaria>{};
    const dialogRef = this.dialog.open(CuentaBancariaAltaComponent, {
      width: '550px',
      data: { modelCuentaBancaria: cuenta }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.cuentaBancariaService.saveOrUpdateCuentaBancaria(cuenta).subscribe(
          data => {
            this.sessionService.showSuccess("El cuenta bancaria se ha agregado correctamente.");
            this.loadCuentaBancariaPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El cuenta bancaria no se agregó.");
          }
        );
      }
    });
  }


  eliminarCuentaBancaria(CuentaBancaria: CuentaBancaria): void {
    const dialogRef = this.dialog.open(CuentaBancariaBajaComponent, {
      data: { modelCuentaBancaria: CuentaBancaria }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        this.cuentaBancariaService.deleteCuentaBancaria(result).subscribe(
          data => {
            this.loadCuentaBancariaPage()
            this.sessionService.showSuccess("El cuenta bancaria se ha borrado correctamente");
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El cuenta bancaria no se borró.");
          }
        );
      }
    })
  }

  modificarCuentaBancaria(event: any) {
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(CuentaBancariaModificacionComponent, {
      width: '550px',
      data: { modelCuentaBancaria: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.cuentaBancariaService.saveOrUpdateCuentaBancaria(event).subscribe(
          data => {
            this.sessionService.showSuccess("El cuenta bancaria se ha modificado correctamente");
            this.loadCuentaBancariaPage();

          },
          error => {
            // console.log(error)
            this.sessionService.showError("El cuenta bancaria no se modificó.");
          }
        );
      }
    });
  }
}
