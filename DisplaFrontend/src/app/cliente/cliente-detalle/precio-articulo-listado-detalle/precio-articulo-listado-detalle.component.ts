import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { PrecioArticuloCliente } from 'src/app/model/precioArticuloCliente';
import { ArticuloVarioService } from 'src/services/articulo.vario.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ArticuloVario } from 'src/app/model/articuloVario';
import { PrecioArticulo } from 'src/app/model/precioArticulo';
import { ClienteService } from 'src/services/cliente.service';
import { combineLatest } from 'rxjs';
import { TipoArticulo } from 'src/app/model/tipoArticulo';
import { TipoArticuloService } from 'src/services/tipo.articulo.service';


@Component({
  selector: 'app-precio-articulo-cliente-listado-detalle',
  templateUrl: './precio-articulo-listado-detalle.component.html',
  styleUrls: ['./precio-articulo-listado-detalle.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PrecioArticuloListadoDetalleComponent implements OnInit {

  displayedColumns = ['Nombre'];
  displayedColumnsArticulo = ['NombreArticulo'];
  columns = [];
  idCliente: number = 0;
  dataSource = new MatTableDataSource<ArticuloVario>();
  dataSourceArticulo = new MatTableDataSource<ArticuloVario>();
  dataSourceTipo = new MatTableDataSource<TipoArticulo>();
  checkboxChecked: boolean[] = [];
  checkboxIndeterminate: boolean[] = [];
  disabledCheck = true;
  recargaPagina = false;
  preciosSeleccionados: PrecioArticuloCliente[] = [];
  expandedElement: ArticuloVario | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    private router: Router,
    private articuloService: ArticuloVarioService,
    private tipoArticuloService: TipoArticuloService,
    private sessionService: SessionService,
    private clienteService: ClienteService,
    private segment: ActivatedRoute,
    private loadingSpinnerService: LoadingSpinnerService) {
    this.segment.queryParams.subscribe((params: Params) => {
      this.idCliente = +params['id']; // (+) converts string 'id' to a number;
    });
  }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSourceTipo.paginator = this.paginator;
    this.dataSourceTipo.sort = this.sort;
    this.loadPrecioArticuloPage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSourceTipo.filter = filterValue.trim().toLowerCase();
  }

  loadPrecioArticuloPage() {
    this.loadingSpinnerService.show()
    combineLatest(
      this.articuloService.getArticulosVariosPrecios(),
      this.tipoArticuloService.getTiposArticuloConArticulosList(),
      this.clienteService.getPreciosArticulosCliente(this.idCliente)
    )
      .subscribe(r => {
        this.dataSource.data = r[0];
        this.dataSourceTipo.data = r[1];
        this.preciosSeleccionados = r[2];
        var maxCantPrecio = 0;
        var index = [];
        this.dataSource.data.forEach(a => {
          if (a.PrecioArticulo.length > maxCantPrecio && a.PrecioArticulo)
            maxCantPrecio = a.PrecioArticulo.length
          if (this.preciosSeleccionados.length > 0) {
            var i = a.PrecioArticulo.findIndex(pa => pa.Id == this.preciosSeleccionados.filter(p => p.IdPrecioArticuloNavigation.IdArticulo == a.Id)[0].IdPrecioArticuloNavigation.Id)
            if (!index.includes(i))
              index.push(i);
          }
        });

        for (let i = 1; i <= maxCantPrecio; i++) {
          this.checkboxChecked.push(false)
          this.checkboxIndeterminate.push(false);

          if (index.length == 1)
            this.checkboxChecked[index[0]] = true;
          else {
            for (let j = 0; j < index.length; j++) {
              this.checkboxIndeterminate[j] = true;
            }
          }
          if (this.recargaPagina == false) {
            this.displayedColumns.push('Precio' + i);
            this.displayedColumnsArticulo.push('Precio' + i);
            this.columns.push({ columnDef: 'Precio' + i, header: 'PRECIO ' + i, cell: (precio: any) => `${precio}` });
            if (i == maxCantPrecio) {
              this.displayedColumnsArticulo.push('PrecioEspecial');
              this.displayedColumns.push('Descuento');
              this.displayedColumnsArticulo.push('DescuentoArticulo');
            }
          }
        }
      });
    this.loadingSpinnerService.hide();
  }

  tablaArticulos(idTipoArticulo) {
    this.dataSourceArticulo.data = this.dataSource.data.filter(a => a.IdTipoArticulo == idTipoArticulo);
  }

  _keyPress(event: any) {
    const pattern = /[0-9,.]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  chequear(idPrecio: any) {
    return this.preciosSeleccionados.find(element => element.IdPrecioArticulo == idPrecio);
  }

  chequearTipo(event, idTipoArticulo: any) {
    let arrayIndex = [];
    if (this.preciosSeleccionados.length > 0) {
      let arrayPreciosArticulos = this.preciosSeleccionados.filter(element => element.IdPrecioArticuloNavigation != null && element.IdPrecioArticuloNavigation.IdArticuloNavigation.IdTipoArticulo == idTipoArticulo);
      let arrayArticulos = this.dataSource.data.filter(a => a.IdTipoArticulo == idTipoArticulo);
      if (arrayPreciosArticulos.length >= arrayArticulos.length) {
        arrayArticulos.forEach(a => {
          var i = a.PrecioArticulo.findIndex(pa => pa.Id == this.preciosSeleccionados.filter(p => p.IdPrecioArticuloNavigation != undefined && p.IdPrecioArticuloNavigation.IdArticulo == a.Id)[0].IdPrecioArticuloNavigation.Id)
          if (!arrayIndex.includes(i))
            arrayIndex.push(i);
        })
      }
    }
    return arrayIndex.length == 1 && +event == arrayIndex[0];
  }

  indeterminateTipo(event, idTipoArticulo: any) {
    let arrayIndex = [];
    let arrayPreciosArticulos = this.preciosSeleccionados.filter(element => element.IdPrecioArticuloNavigation != null && element.IdPrecioArticuloNavigation.IdArticuloNavigation.IdTipoArticulo == idTipoArticulo);
    let arrayArticulos = this.dataSource.data.filter(a => a.IdTipoArticulo == idTipoArticulo);
    if (this.preciosSeleccionados.length > 0) {
      if (arrayPreciosArticulos.length == arrayArticulos.length) {
        arrayArticulos.forEach(a => {
          var i = a.PrecioArticulo.findIndex(pa => pa.Id == this.preciosSeleccionados.filter(p => p.IdPrecioArticuloNavigation != undefined && p.IdPrecioArticuloNavigation.IdArticulo == a.Id)[0].IdPrecioArticuloNavigation.Id)
          if (!arrayIndex.includes(i))
            arrayIndex.push(i);
        })
      }
    }
    return arrayIndex.length > 1 && arrayIndex.includes(+event);
  }


  valorPrecioEspecial(idArticulo) {
    let precio = <PrecioArticuloCliente>{};
    precio = this.preciosSeleccionados.filter(p => p.IdPrecioArticuloNavigation != undefined && p.IdPrecioArticuloNavigation.IdArticulo == idArticulo && p.Especial == true)[0]
    if (precio != null)
      return precio.IdPrecioArticuloNavigation.Precio;
    else
      return "";
  }

  valorDescuento(idArticulo) {
    let precio = <PrecioArticuloCliente>{};
    precio = this.preciosSeleccionados.filter(p => p.IdPrecioArticuloNavigation != undefined && p.IdPrecioArticuloNavigation.IdArticulo == idArticulo && p.Descuento != null)[0]
    if (precio != null)
      return precio.Descuento;
    else
      return "";
  }

  valorDescuentoTipo(idTipoArticulo) {
    let arrayArticulos = this.dataSource.data.filter(a => a.IdTipoArticulo == idTipoArticulo);
    let arrayDescuento = this.preciosSeleccionados.filter(p => p.IdPrecioArticuloNavigation != undefined && p.IdPrecioArticuloNavigation.IdArticuloNavigation.IdTipoArticulo == idTipoArticulo && p.Descuento != null)
    if (arrayArticulos.length == arrayDescuento.length) {
      let descuento = arrayDescuento[0].Descuento;
      for (let i = 1; i <= arrayDescuento.length; i++) {
        if (i == arrayDescuento.length) {
          return descuento;
        }
        else {
          if (descuento != arrayDescuento[i++].Descuento)
            return "";
        }
      }
    }
    else
      return "";
  }


}
