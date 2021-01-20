import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Lente } from 'src/app/model/lente';
import { LenteBajaComponent } from '../lente-baja/lente-baja.component';
import { LenteService } from 'src/services/lente.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lente-listado',
  templateUrl: './lente-listado.component.html',
  styleUrls: ['./lente-listado.component.css']
})
export class LenteListadoComponent implements OnInit {
  
  displayedColumns: string[] = ['Id', 'Nombre','IVA','Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<Lente>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;
  
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private lenteService: LenteService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadLentePage();
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
    this.loadLentePage();
  }

  loadLentePage() {
    this.loadingSpinnerService.show();
    if (this.traerVigentes == true) {
      this.lenteService.getLentesVigentesList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    } else {
      this.lenteService.getLentesList()
        .subscribe(r => {
          this.dataSource.data = r;
          this.loadingSpinnerService.hide();
        })
    }
  }

  getMovimientosLente(idLente){
    this.router.navigateByUrl('/MovimientoLente/Listado?idLente='+idLente);
  }

  agregarLente(): void {
    this.router.navigateByUrl('/Lente/Alta')
  }

  modificarLente(id: number) {
    this.router.navigateByUrl('Lente/Modificacion?id=' + id);
  }

  detalleLente(id: number) {
    this.router.navigateByUrl('Lente/Detalle?id=' + id);
  }

  verStockLente(id: number) {
    this.router.navigateByUrl('Lente/Stock?id=' + id);
  }

  eliminarLente(lente: Lente): void {
    const dialogRef = this.dialog.open(LenteBajaComponent, {
      data: { modelLente: lente }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.lenteService.deleteLente(result).subscribe(
          data => {
            this.sessionService.showSuccess("El lente se ha borrado correctamente");
            this.loadLentePage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El lente no se borró.");
          }
        );
      }
    })
  }

}
