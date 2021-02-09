import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { PrecioLenteClienteService } from 'src/services/precio.lente.cliente.service';
import { LenteService } from 'src/services/lente.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Lente } from 'src/app/model/lente';
import { ClienteService } from 'src/services/cliente.service';
import { PrecioLenteCliente } from 'src/app/model/precioLenteCliente';
import { combineLatest } from 'rxjs';



@Component({
  selector: 'app-precio-lente-cliente-listado-detalle',
  templateUrl: './precio-lente-listado-detalle.component.html',
  styleUrls: ['./precio-lente-listado-detalle.component.css']
})
export class PrecioLenteListadoDetalleComponent implements OnInit {

  displayedColumns: string[] = ['Nombre'];
  columns = [];
  idCliente: number = 0;

  dataSource = new MatTableDataSource<any>();
  preciosSeleccionados: PrecioLenteCliente[] = [];
  checkboxChecked: boolean[] = [];
  checkboxIndeterminate: boolean[] = [];
  recargaPagina = false;
  disabledCheck = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private lenteService: LenteService,
    private segment: ActivatedRoute,
    private clienteService: ClienteService,
    private loadingSpinnerService: LoadingSpinnerService) { 
      this.segment.queryParams.subscribe((params: Params) => {
        this.idCliente = +params['id']; // (+) converts string 'id' to a number;
        });
    }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadPrecioLentePage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadPrecioLentePage() {
    this.loadingSpinnerService.show()
    combineLatest([
      this.lenteService.getLentesVigentesAgrupadosList(),
      this.clienteService.getPreciosLentesCliente(this.idCliente)
    ])
      .subscribe(r => {
        this.dataSource.data = r[0];
        this.preciosSeleccionados = r[1];
        // console.log(this.preciosSeleccionados)
        var maxCantPrecio = 0;
        var index = [];
        this.dataSource.data.forEach(a => {
          a.PrecioLente.forEach(pl => {
            if (pl.Precio && pl.Precio.length > maxCantPrecio)
              maxCantPrecio = pl.Precio.length

            if (this.preciosSeleccionados.length > 0) {
              var arrayAux = this.preciosSeleccionados.filter(p => p.IdPrecioLenteNavigation.IdLente == a.Id);
              if (arrayAux.length > 0) {
                var i = a.PrecioLente.findIndex(pa => pa.Id == arrayAux[0].IdPrecioLenteNavigation.Id)
                if (!index.includes(i))
                  index.push(i);
              }
            }
          });
        });
        for (let i = 1; i <= maxCantPrecio; i++) {
          this.checkboxChecked.push(false)
          this.checkboxIndeterminate.push(false);

          if (index.length == 1 && this.preciosSeleccionados.length >= this.dataSource.data.length)
            this.checkboxChecked[index[0]] = true;
          else {
            for (let j = 0; j < index.length; j++) {
              this.checkboxIndeterminate[j] = true;
            }
          }

          if (this.recargaPagina == false) {
            this.displayedColumns.push('Precio' + i);
            this.columns.push({ columnDef: 'Precio' + i, header: 'PRECIO ' + i, cell: (precio: any) => `${precio}` });
            if (i == maxCantPrecio) {
              this.displayedColumns.push('PrecioEspecial');
              this.displayedColumns.push('Descuento');
            }
          }
        }

      });
    this.loadingSpinnerService.hide();
  }

  chequear(idPrecio: any) {
    return this.preciosSeleccionados.find(element => element.IdPrecioLente == idPrecio);
  }

  valorPrecioEspecial(idLente) {
    let precio = <PrecioLenteCliente>{};
    precio = this.preciosSeleccionados.filter(p => p.IdPrecioLenteNavigation != undefined && p.IdPrecioLenteNavigation.IdLente == idLente && p.Especial == true)[0]
    if (precio != null)
      return precio.IdPrecioLenteNavigation.Precio;
    else
      return "";
  }


  valorDescuento(idLente) {
    let precio = <PrecioLenteCliente>{};
    precio = this.preciosSeleccionados.filter(p => p.IdPrecioLenteNavigation != undefined && p.IdPrecioLenteNavigation.IdLente == idLente && p.Descuento != null)[0]
    if (precio != null)
      return precio.Descuento;
    else
      return "";
  }

}
