import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { CategoriaIVA } from 'src/app/model/categoriaIva';
import { CategoriaIVAAltaComponent } from '../categoria-iva-alta/categoria-iva-alta.component';
import { CategoriaIVABajaComponent } from '../categoria-iva-baja/categoria-iva-baja.component';
import { CategoriaIVAModificacionComponent } from '../categoria-iva-modificacion/categoria-iva-modificacion.component';
import { CategoriaIVAService } from 'src/services/categoria.iva.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categoria-iva-listado',
  templateUrl: './categoria-iva-listado.component.html',
  styleUrls: ['./categoria-iva-listado.component.css']
})
export class CategoriaIVAListadoComponent implements OnInit {

  displayedColumns: string[] = ['Descripcion', 'Tasa', 'SobreTasa', 'Discrimina', 'Recateg', 'CodigoRece', 'Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<CategoriaIVA>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;

  constructor(
    public dialog: MatDialog,
    // private router: Router,
    private categoriaIVAService: CategoriaIVAService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadCategoriaIVAPage();
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
    this.loadCategoriaIVAPage();
  }

  loadCategoriaIVAPage() {
    this.loadingSpinnerService.show()
    if (this.traerVigentes == true) {
      this.categoriaIVAService.getCategoriaIVAVigentesList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
    } else {
      this.categoriaIVAService.getCategoriaIVAList()
        .subscribe(r => {
          this.dataSource.data = r;
          console.log(this.dataSource.data)
          this.loadingSpinnerService.hide();
        })
    }
  }

  agregarCategoriaIVA(): void {
    let categoriaIVA = <CategoriaIVA>{};
    const dialogRef = this.dialog.open(CategoriaIVAAltaComponent, {
      width: '550px',
      data: { modelCategoriaIva: categoriaIVA }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.categoriaIVAService.saveOrUpdateCategoriaIVA(categoriaIVA).subscribe(
          data => {
            this.sessionService.showSuccess("La categoría IVA se ha agregado correctamente.");
            this.loadCategoriaIVAPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("La categoría IVA no se agregó.");
          }
        );
      }
    });
  }


  eliminarCategoriaIVA(categoriaIVA: CategoriaIVA): void {
    const dialogRef = this.dialog.open(CategoriaIVABajaComponent, {
      data: { modelCategoriaIva: categoriaIVA }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.categoriaIVAService.deleteCategoriaIVA(result).subscribe(
          data => {
            this.sessionService.showSuccess("La categoría IVA se ha borrado correctamente");
            this.loadCategoriaIVAPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("La categoría IVA no se borró.");
          }
        );
      }
    })
  }

  modificarCategoriaIVA(event: any) {
    let categoriaIVAViejo = JSON.parse(JSON.stringify(event));
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(CategoriaIVAModificacionComponent, {
      width: '550px',
      data: { modelCategoriaIva: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.categoriaIVAService.saveOrUpdateCategoriaIVA(event).subscribe(
          data => {
            this.sessionService.showSuccess("La categoría IVA se ha modificado correctamente");
            this.loadCategoriaIVAPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("La categoría IVA no se modificó.");
          }
        );
      }
    });
  }
}
