import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { CondicionVenta } from 'src/app/model/condicionVenta';
import { CondicionVentaAltaComponent } from '../condicion-venta-alta/condicion-venta-alta.component';
import { CondicionVentaBajaComponent } from '../condicion-venta-baja/condicion-venta-baja.component';
import { CondicionVentaModificacionComponent } from '../condicion-venta-modificacion/condicion-venta-modificacion.component';
import { CondicionVentaService } from 'src/services/condicion.venta.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-condicion-venta-listado',
  templateUrl: './condicion-venta-listado.component.html',
  styleUrls: ['./condicion-venta-listado.component.css']
})
export class CondicionVentaListadoComponent implements OnInit {

  displayedColumns: string[] = ['Descripcion', 'Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<CondicionVenta>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;

  constructor(
    public dialog: MatDialog,
    // private router: Router,
    private condicionVentaService: CondicionVentaService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadCondicionVentaPage();
    this.searchElement.nativeElement.focus();
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cambiarListado() {
    this.traerVigentes = !this.traerVigentes;
    this.loadCondicionVentaPage();
  }

  loadCondicionVentaPage() {
    this.loadingSpinnerService.show();
    if (this.traerVigentes == true) {
      this.condicionVentaService.getCondicionVentaVigentesList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
    } else {
      this.condicionVentaService.getCondicionVentaList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
    }
  }

  agregarCondicionVenta(): void {
    let condicionVenta = <CondicionVenta>{};
    const dialogRef = this.dialog.open(CondicionVentaAltaComponent, {
      width: '550px',
      data: { modelCondicionVenta: condicionVenta }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.condicionVentaService.saveOrUpdateCondicionVenta(condicionVenta).subscribe(
          data => {
            this.sessionService.showSuccess("La condición de venta se ha agregado correctamente.");
            this.loadCondicionVentaPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("La condición de venta no se agregó.");
          }
        );
      }
    });
  }


  eliminarCondicionVenta(condicionVenta: CondicionVenta): void {
    const dialogRef = this.dialog.open(CondicionVentaBajaComponent, {
      data: { modelCondicionVenta: condicionVenta }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.condicionVentaService.deleteCondicionVenta(result).subscribe(
          data => {
            this.sessionService.showSuccess("La condición de venta se ha borrado correctamente");
            this.loadCondicionVentaPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("La condición de venta no se borró.");
          }
        );
      }
    })
  }

  modificarCondicionVenta(event: any) {
    let condicionVentaViejo = JSON.parse(JSON.stringify(event));
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(CondicionVentaModificacionComponent, {
      width: '550px',
      data: { modelCondicionVenta: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.condicionVentaService.saveOrUpdateCondicionVenta(event).subscribe(
          data => {
            this.sessionService.showSuccess("La condición de venta se ha modificado correctamente");
            this.loadCondicionVentaPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("La condición de venta no se modificó.");
          }
        );
      }
    });
  }
}
