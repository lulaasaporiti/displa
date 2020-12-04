import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { TipoInsumo } from 'src/app/model/tipoInsumo';
import { TipoInsumoService } from 'src/services/tipo.insumo.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';


@Component({
  selector: 'app-sobre-consulta',
  templateUrl: './sobre-consulta.component.html',
  styleUrls: ['./sobre-consulta.component.css']
})
export class SobreConsultaComponent implements OnInit {
  
  displayedColumns: string[] = ['Nombre', 'NotificaStockMinimo', 'Borrado', 'Opciones'];
  dataSource = new MatTableDataSource<TipoInsumo>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private tipoInsumoService: TipoInsumoService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadTipoInsumoPage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cambiarListado() {
    this.traerVigentes = !this.traerVigentes;
    this.loadTipoInsumoPage();
  }

  loadTipoInsumoPage() {
    this.loadingSpinnerService.show();
    if (this.traerVigentes == true) {
      this.tipoInsumoService.getTiposInsumosVigentesList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    } else {
      this.tipoInsumoService.getTiposInsumosList()
      .subscribe(r => {
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      })
    }
  }

 
}
