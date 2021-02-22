import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ChequeAltaComponent } from '../cheque-alta/cheque-alta.component';
import { ChequeBajaComponent } from '../cheque-baja/cheque-baja.component';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Cheque } from 'src/app/model/cheque';
import { ChequeService } from 'src/services/cheque.service';


@Component({
  selector: 'app-cheque-cartera',
  templateUrl: './cheque-cartera.component.html',
  styleUrls: ['./cheque-cartera.component.css']
})
export class ChequeCarteraComponent implements OnInit {

  displayedColumns: string[] = ['Banco', 'Numero', 'Librador', 'Fecha', 'Importe', 'Opciones'];
  dataSource = new MatTableDataSource<Cheque>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;

  constructor(
    public dialog: MatDialog,
    // private router: Router,
    private chequeService: ChequeService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadChequePage();
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
    this.loadChequePage();
  }

  loadChequePage() {
    this.loadingSpinnerService.show()
    this.chequeService.getChequesCartera()
      .subscribe(r => {
        this.dataSource.data = r;
        console.log(this.dataSource.data)
        this.loadingSpinnerService.hide();
      })
  }

  agregarCheque(): void {
    let cheque = <Cheque>{};
    const dialogRef = this.dialog.open(ChequeAltaComponent, {
      width: '550px',
      data: { modelCheque: cheque }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(cheque)
      if (result != undefined && result != false) {
        this.chequeService.saveOrUpdateCheque(cheque).subscribe(
          data => {
            this.sessionService.showSuccess("El cheque se ha agregado correctamente.");
            this.loadChequePage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El cheque no se agregó.");
          }
        );
      }
    });
  }


  eliminarCheque(cheque: Cheque): void {
    const dialogRef = this.dialog.open(ChequeBajaComponent, {
      data: { modelCategoriaIva: cheque }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.chequeService.deleteCheque(result).subscribe(
          data => {
            this.sessionService.showSuccess("La categoría IVA se ha borrado correctamente");
            this.loadChequePage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("La categoría IVA no se borró.");
          }
        );
      }
    })
  }

 
}
