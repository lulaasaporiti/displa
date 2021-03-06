import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { ArticuloVario } from 'src/app/model/articuloVario';
import { ArticuloVarioBajaComponent } from '../articulo-vario-baja/articulo-vario-baja.component';
import { ArticuloVarioService } from 'src/services/articulo.vario.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-articulo-vario-listado',
  templateUrl: './articulo-vario-listado.component.html',
  styleUrls: ['./articulo-vario-listado.component.css']
})
export class ArticuloVarioListadoComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'TipoArticulo', 'StockMinimo', 'StockActual', 'PrecioCosto', 'PorcentajeUtilidad', 'Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<ArticuloVario>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private articuloService: ArticuloVarioService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadArticuloVarioPage();
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
    this.loadArticuloVarioPage();
  }

  loadArticuloVarioPage() {
    this.loadingSpinnerService.show()
    if (this.traerVigentes == true) {
      this.articuloService.getArticulosVariosVigentesList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
    } else {
      this.articuloService.getArticulosVariosList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
    }
  }

  getMovimientosArticuloVario(idArticuloVario) {
    this.router.navigateByUrl('/MovimientoArticuloVario/Listado?idArticuloVario=' + idArticuloVario);
  }

  // agregarArticuloVario(): void {
  //   let articulo = <ArticuloVario>{};
  //   articulo.PrecioArticulo = [];
  //   const dialogRef = this.dialog.open(ArticuloVarioAltaComponent, {
  //     width: '550px',
  //     data: { modelArticuloVario: articulo }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result != undefined && result != false) {
  //       this.articuloService.saveOrUpdateArticuloVario(articulo).subscribe(
  //         data => {
  //           this.sessionService.showSuccess("El articulo se ha agregado correctamente.");
  //           this.loadArticuloVarioPage();
  //         },
  //         error => {
  //           // console.log(error)
  //           this.sessionService.showError("El articulo no se agregó.");
  //         }
  //       );
  //     }
  //   });
  // }

  agregarArticuloVario(){
    this.router.navigateByUrl('ArticuloVario/Alta')
  }


  eliminarArticuloVario(articulo: ArticuloVario): void {
    const dialogRef = this.dialog.open(ArticuloVarioBajaComponent, {
      data: { modelArticuloVario: articulo }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.articuloService.deleteArticuloVario(result).subscribe(
          data => {
            this.sessionService.showSuccess("El articulo se ha borrado correctamente");
            this.loadArticuloVarioPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El articulo no se borró.");
          }
        );
      }
    })
  }

  // modificarArticuloVario(event: any) {
  //   let articuloViejo = JSON.parse(JSON.stringify(event));
  //   event = JSON.parse(JSON.stringify(event));
  //   const dialogRef = this.dialog.open(ArticuloVarioModificacionComponent, {
  //     width: '550px',
  //     data: { modelArticuloVario: event }
  //   })
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result != undefined && result != false) {
  //       this.articuloService.saveOrUpdateArticuloVario(event).subscribe(
  //         data => {
  //           this.sessionService.showSuccess("El articulo se ha modificado correctamente");
  //           this.loadArticuloVarioPage();
  //         },
  //         error => {
  //           // console.log(error)
  //           this.sessionService.showError("El articulo no se modificó.");
  //         }
  //       );
  //     }
  //   });
  // }

  modificarArticuloVario(id: any){
    console.log(id)
    this.router.navigateByUrl('ArticuloVario/Modificacion?id=' + id);
  }
}
