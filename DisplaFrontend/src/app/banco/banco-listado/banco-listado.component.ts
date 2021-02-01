import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { Banco } from 'src/app/model/Banco';
import { BancoAltaComponent } from '../banco-alta/banco-alta.component';
import { BancoBajaComponent } from '../banco-baja/banco-baja.component';
import { BancoModificacionComponent } from '../banco-modificacion/banco-modificacion.component';
import { BancoService } from 'src/services/banco.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';


@Component({
  selector: 'app-banco-listado',
  templateUrl: './banco-listado.component.html',
  styleUrls: ['./banco-listado.component.css']
})
export class BancoListadoComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Cuit', 'Direccion', 'Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<Banco>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private bancoService: BancoService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadBancoPage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cambiarListado() {
    this.traerVigentes = !this.traerVigentes;
    this.loadBancoPage();
  }

  loadBancoPage() {
    this.loadingSpinnerService.show()
    if (this.traerVigentes == true) {
      this.bancoService.getBancosVigentesList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
    } else {
      this.bancoService.getBancosList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
    }
  }
  agregarBanco(): void {
    let banco = <Banco>{};
    const dialogRef = this.dialog.open(BancoAltaComponent, {
      width: '550px',
      data: { modelBanco: banco }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.bancoService.saveOrUpdateBanco(banco).subscribe(
          data => {
            this.sessionService.showSuccess("El banco se ha agregado correctamente.");
            this.loadBancoPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El banco no se agregó.");
          }
        );
      }
    });
  }


  eliminarBanco(Banco: Banco): void {
    const dialogRef = this.dialog.open(BancoBajaComponent, {
      data: { modelBanco: Banco }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        this.bancoService.deleteBanco(result).subscribe(
          data => {
            this.loadBancoPage()
            this.sessionService.showSuccess("El banco se ha borrado correctamente");
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El banco no se borró.");
          }
        );
      }
    })
  }

  modificarBanco(event: any) {
    let bancoViejo = JSON.parse(JSON.stringify(event));
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(BancoModificacionComponent, {
      width: '550px',
      data: { modelBanco: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.bancoService.saveOrUpdateBanco(event).subscribe(
          data => {
            this.sessionService.showSuccess("El banco se ha modificado correctamente");
            this.loadBancoPage();

          },
          error => {
            // console.log(error)
            this.sessionService.showError("El banco no se modificó.");
          }
        );
      }
    });
  }
}
