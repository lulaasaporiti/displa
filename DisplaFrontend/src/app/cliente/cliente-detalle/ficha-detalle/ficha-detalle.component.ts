import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { Params, ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/services/cliente.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-ficha-detalle',
  templateUrl: './ficha-detalle.component.html',
  styleUrls: ['./ficha-detalle.component.css'],
})
export class FichaDetalleComponent implements OnInit {
  idCliente: number;

  
  displayedColumns: string[] = ['Fecha', 'Descripcion'];
  dataSource = new MatTableDataSource<any>();
  traerVigentes: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor(
    public dialog: MatDialog,
    private clienteService: ClienteService,
    private segment: ActivatedRoute,
    private loadingSpinnerService: LoadingSpinnerService) {
    this.segment.queryParams.subscribe((params: Params) => {
    this.idCliente = +params['id']; // (+) converts string 'id' to a number;
    });
    this.loadingSpinnerService.show();
    this.traerFicha();
  }

  ngOnInit() {
    
  }

  traerFicha(){
    this.clienteService.getFicha(this.idCliente).subscribe(r => {
      console.log(r)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.data = r;
      this.loadingSpinnerService.hide();
    })
  }

}
