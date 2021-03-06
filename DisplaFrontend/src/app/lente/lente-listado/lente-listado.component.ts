import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Lente } from 'src/app/model/lente';
import { LenteBajaComponent } from '../lente-baja/lente-baja.component';
import { LenteService } from 'src/services/lente.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-lente-listado',
  templateUrl: './lente-listado.component.html',
  styleUrls: ['./lente-listado.component.css']
})
export class LenteListadoComponent implements OnInit {
  
  displayedColumns: string[] = ['Id', 'Nombre','IVA','Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<Lente>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;
  
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private lenteService: LenteService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.loadLentePage();
    this.searchElement.nativeElement.focus();
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
