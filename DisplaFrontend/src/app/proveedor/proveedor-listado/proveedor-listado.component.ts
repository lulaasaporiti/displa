import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Proveedor } from 'src/app/model/Proveedor';
import { ProveedorAltaComponent } from '../proveedor-alta/proveedor-alta.component';
import { ProveedorBajaComponent } from '../proveedor-baja/proveedor-baja.component';
import { ProveedorModificacionComponent } from '../proveedor-modificacion/proveedor-modificacion.component';
import { ProveedorService } from 'src/services/proveedor.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';


@Component({
  selector: 'app-proveedor-listado',
  templateUrl: './proveedor-listado.component.html',
  styleUrls: ['./proveedor-listado.component.css']
})
export class ProveedorListadoComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Domicilio', 'Telefonos', 'Mail', 'UtilizaIibb', 'Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<Proveedor>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private proveedorService: ProveedorService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadProveedorPage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cambiarListado() {
    this.traerVigentes = !this.traerVigentes;
    this.loadProveedorPage();
  }

  loadProveedorPage() {
    this.loadingSpinnerService.show()
    if (this.traerVigentes == true) {
      this.proveedorService.getProveedoresVigentesList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
    } else {
      this.proveedorService.getProveedoresList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
    }
  }

  agregarProveedor(): void {
    let Proveedor = <Proveedor>{};
    const dialogRef = this.dialog.open(ProveedorAltaComponent, {
      width: '550px',
      data: { modelProveedor: Proveedor }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        Proveedor.IdLocalidad = Proveedor.IdLocalidadNavigation.Id;
        Proveedor.IdLocalidadNavigation = null;
        console.log(Proveedor)

        this.proveedorService.saveOrUpdateProveedor(Proveedor).subscribe(
          data => {
            this.sessionService.showSuccess("El proveedor se ha agregado correctamente.");
            this.loadProveedorPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El proveedor no se agregó.");
          }
        );
      }
    });
  }


  eliminarProveedor(Proveedor: Proveedor): void {
    const dialogRef = this.dialog.open(ProveedorBajaComponent, {
      data: { modelProveedor: Proveedor }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        console.log(result)
        this.proveedorService.deleteProveedor(result).subscribe(
          data => {
            this.loadProveedorPage()
            this.sessionService.showSuccess("El proveedor se ha borrado correctamente");
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El proveedor no se borró.");
          }
        );
      }
    })
  }

  modificarProveedor(event: any) {
    let ProveedorViejo = JSON.parse(JSON.stringify(event));
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(ProveedorModificacionComponent, {
      width: '550px',
      data: { modelProveedor: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.proveedorService.saveOrUpdateProveedor(event).subscribe(
          data => {
            this.sessionService.showSuccess("El proveedor se ha modificado correctamente");
            this.loadProveedorPage();

          },
          error => {
            // console.log(error)
            this.sessionService.showError("El proveedor no se modificó.");
          }
        );
      }
    });
  }
}
