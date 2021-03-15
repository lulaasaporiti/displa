import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComprobanteClienteService } from 'src/services/comprobanteCliente.service';
import { RemitoService } from 'src/services/remito.service';
import { combineLatest } from 'rxjs';
import { LenteService } from 'src/services/lente.service';
import { ArticuloVarioService } from 'src/services/articulo.vario.service';


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
  desde;
  hasta;
  producto;
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') searchElement: ElementRef;

  constructor(
    private router: Router,
    private segment: ActivatedRoute,
    private lenteService: LenteService,
    private remitoService: RemitoService,
    private articuloService: ArticuloVarioService,
    private loadingSpinnerService: LoadingSpinnerService,
    private comprobanteService: ComprobanteClienteService) {
    this.segment.queryParams.subscribe((params: Params) => {
      this.idLente = +params['idLente'];
      this.idArticulo = +params['idArticulo'];
      this.libre = params['libre'];
      this.desde = params['desde'];
      this.hasta = params['hasta'];
    });
  }

  ngOnInit() {
    // this.searchElement.nativeElement.focus();
    this.loadingSpinnerService.show();
    if (this.idArticulo != 0)
      this.articuloService.getById(this.idArticulo).subscribe(result => {
        this.producto = result.Nombre;
      })
    if (this.idLente != 0)
      this.lenteService.getById(this.idLente).subscribe(result => {
        this.producto = result.Nombre;
      })
    if (this.libre != "") {
      this.producto = this.libre;
    }
    combineLatest([
      this.comprobanteService.buscarItemComprobante(this.idLente, this.idArticulo, this.libre, this.desde, this.hasta),
      this.remitoService.buscarItemRemito(this.idLente, this.idArticulo, this.libre, this.desde, this.hasta),

    ])
      .subscribe(r => {
        this.dataSource.data = r[0];
        this.dataSource.data = this.dataSource.data.concat(r[1]);
        // this.producto = this.dataSource?.data[0]?.Producto;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        const sortState: Sort = { active: 'Fecha', direction: 'asc' };
        this.sort.active = sortState.active;
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
        this.loadingSpinnerService.hide();
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  verComprobante(id: number, idTipoComprobante: number, idComprobanteItem: number) {
    switch (idTipoComprobante) {
      case 1: {
        let url = `Factura/Detalle?id=${id}&idItem=${idComprobanteItem}`
        window.open(url, '_blank');
        break;
      }
      case 3: {
        let url = `NotaDebito/Detalle?id=${id}&idItem=${idComprobanteItem}`
        window.open(url, '_blank');
        break;
      }
      case 2: {
        let url = `NotaCredito/Detalle?id=${id}&idItem=${idComprobanteItem}`
        window.open(url, '_blank');
        break;
      }
      case undefined: {
        let url = `Remito/Detalle?id=${id}&idItem=${idComprobanteItem}`
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
