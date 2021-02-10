import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComprobanteClienteService } from 'src/services/comprobanteCliente.service';


@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.css']
})
export class ResultadoBusquedaComponent implements OnInit {
  displayedColumns = ['Tipo', 'Letra', 'Fecha', 'NumeroComprobante', 'Cliente', 'Observaciones'];
  idLente;
  idArticulo;
  libre;
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') searchElement: ElementRef;

  constructor(
    private router: Router,
    private segment: ActivatedRoute,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService,
    private comprobanteService: ComprobanteClienteService) {
      this.segment.queryParams.subscribe((params: Params) => {
        this.idLente = +params['idLente']; 
        this.idArticulo = +params['idArticulo']; 
        this.libre = params['libre']; 
      });
    }

  ngOnInit() {
    // this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadingSpinnerService.show();
    this.comprobanteService.buscarItemComprobante(this.idLente, this.idArticulo, this.libre)
      .subscribe(r => {
        console.log(r)
        this.dataSource.data = r;
        this.loadingSpinnerService.hide();
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  verComprobante(idComprobante: number, idTipoComprobante: number) {
    switch (idTipoComprobante) {
      case 1: {
        let url = `Factura/Detalle?id=${idComprobante}`
        window.open(url, '_blank');
        break;
      }
      case 3: {
        let url = `NotaDebito/Detalle?id=${idComprobante}`
        window.open(url, '_blank');
        break;
      }
      case 2: {
        let url = `NotaCredito/Detalle?id=${idComprobante}`
        window.open(url, '_blank');
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }
}
