import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RemitoService } from 'src/services/remito.service';


@Component({
  selector: 'app-anulacion-remito',
  templateUrl: './anulacion-remito.component.html',
  styleUrls: ['./anulacion-remito.component.css']
})
export class AnulacionRemitoComponent implements OnInit {
  today = new Date();
  since = new Date();
  original: any[] = [];
  defaultSort: MatSort
  displayedColumns = ['Cliente', 'NumeroComprobante', 'Fecha', 'FechaAnulado', 'Monto'];
  dataSource = new MatTableDataSource<any>();
  todo: boolean;
  generacion: boolean;
  anulacion: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;

  constructor(
    public dialog: MatDialog,
    private remitoService: RemitoService,
    private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.loadingSpinnerService.hide();

    //   this.defaultSort: MatSort = {
    //     id: 'defColumnName',
    //     start: 'asc',
    //     disableClear: true
    // };
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  traerRemitos() {
    this.loadingSpinnerService.show();
    this.remitoService.buscarRemitosAnulados(this.since.toDateString(), this.today.toDateString()).subscribe(r => {
      this.original = r
      this.dataSource.data = this.original
      console.log(this.original)
      this.loadingSpinnerService.hide();
    })
  }

  verComprobante(id: number) {
    let url = `Remito/Detalle?id=${id}`
    window.open(url, '_blank');
  }

  applyFilterGeneracion() {
    if (this.generacion) {
      // this.generacion = false
      // this.dataSource.data = this.original
      this.dataSource.data = this.original.sort((a: any, b: any) => {
        if (a.Id > b.Id) {
          return -1;
        } else if (a.Id < b.Id) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    else {
      this.anulacion = false
      this.dataSource.data = this.dataSource.data.sort((a: any, b: any) => {
        if (a.Fecha < b.Fecha) {
          return -1;
        } else if (a.Fecha > b.Fecha) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  applyFilterAnulacion() {
    if (this.anulacion) {
      // this.anulacion = false
      // this.dataSource.data = this.original
      this.dataSource.data = this.original.sort((a: any, b: any) => {
        if (a.Id > b.Id) {
          return -1;
        } else if (a.Id < b.Id) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    else {
      this.generacion = false
      this.dataSource.data = this.dataSource.data.sort((a: any, b: any) => {
        if (a.FechaAnulado < b.FechaAnulado) {
          return -1;
        } else if (a.FechaAnulado > b.FechaAnulado) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }
}