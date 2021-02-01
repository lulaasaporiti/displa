import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { LimiteGrilla } from 'src/app/model/limiteGrilla';
import { LimiteGrillaAltaComponent } from '../limite-grilla-alta/limite-grilla-alta.component';
import { LimiteGrillaBajaComponent } from '../limite-grilla-baja/limite-grilla-baja.component';
import { LimiteGrillaModificacionComponent } from '../limite-grilla-modificacion/limite-grilla-modificacion.component';
import { LimitesGrillaService } from 'src/services/limites.grilla.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-limite-grilla-listado',
  templateUrl: './limite-grilla-listado.component.html',
  styleUrls: ['./limite-grilla-listado.component.css']
})
export class LimiteGrillaListadoComponent implements OnInit {
  displayedColumns: string[] = ['Combinacion', 'LimiteInferiorEsferico', 'LimiteSuperiorEsferico', 'LimiteInferiorCilindrico', 'LimiteSuperiorCilindrico', 'Opciones'];
  dataSource = new MatTableDataSource<LimiteGrilla>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;
  
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private limitegrillaService: LimitesGrillaService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadLimiteGrillaPage();
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadLimiteGrillaPage() {
    this.loadingSpinnerService.show()
    this.limitegrillaService.getLimitesGrillaList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
  }


  agregarLimiteGrilla(): void {
    let limitegrilla = <LimiteGrilla>{};
    const dialogRef = this.dialog.open(LimiteGrillaAltaComponent, {
      width: '550px',
      data: { modelLimiteGrilla: limitegrilla }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.limitegrillaService.saveOrUpdateLimitesGrilla(limitegrilla).subscribe(
          data => {
            this.sessionService.showSuccess("El límitede la grilla se ha agregado correctamente.");
            this.loadLimiteGrillaPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El límitede la grilla no se agregó.");
          }
        );
      }
    });
  }


  eliminarLimiteGrilla(limitegrilla: LimiteGrilla): void {
    const dialogRef = this.dialog.open(LimiteGrillaBajaComponent, {
      data: { modelLimiteGrilla: limitegrilla }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.limitegrillaService.deleteLimitesGrilla(result).subscribe(
          data => {
            this.sessionService.showSuccess("El límitede la grilla se ha borrado correctamente");
            this.loadLimiteGrillaPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El límitede la grilla no se borró.");
          }
        );
      }
    })
  }

  modificarLimiteGrilla(event: any) {
    let limitegrillaViejo = JSON.parse(JSON.stringify(event));
    event = JSON.parse(JSON.stringify(event));
    const dialogRef = this.dialog.open(LimiteGrillaModificacionComponent, {
      width: '550px',
      data: { modelLimiteGrilla: event }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.limitegrillaService.saveOrUpdateLimitesGrilla(event).subscribe(
          data => {
            this.sessionService.showSuccess("El límitede la grilla se ha modificado correctamente");
            this.loadLimiteGrillaPage();
          },
          error => {
            // console.log(error)
            this.sessionService.showError("El límitede la grilla no se modificó.");
          }
        );
      }
    });
  }
}
