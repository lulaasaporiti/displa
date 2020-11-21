import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { PrecioLenteClienteService } from 'src/services/precio.lente.cliente.service';
import { LenteService } from 'src/services/lente.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from 'src/services/cliente.service';
import { PrecioLenteCliente } from 'src/app/model/precioLenteCliente';
import { combineLatest } from 'rxjs';
import { PrecioLente } from 'src/app/model/precioLente';


@Component({
  selector: 'app-precio-lente-cliente-listado',
  templateUrl: './precio-lente-listado.component.html',
  styleUrls: ['./precio-lente-listado.component.css']
})
export class PrecioLenteListadoComponent implements OnInit {

  displayedColumns: string[] = ['Nombre'];
  columns = [];
  idCliente: number = 0;

  dataSource = new MatTableDataSource<any>();
  preciosSeleccionados: PrecioLenteCliente[] = [];
  // checkboxChecked: boolean[] = [];
  // checkboxIndeterminate: boolean[] = [];
  recargaPagina = false;
  habilitarGuardar = true;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private precioLenteClienteService: PrecioLenteClienteService,
    private lenteService: LenteService,
    private segment: ActivatedRoute,
    private clienteService: ClienteService,
    private sessionService: SessionService,
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

  cancelar() {
    this.router.navigateByUrl('Cliente/Listado')
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadPrecioLentePage() {
    this.loadingSpinnerService.show()
    combineLatest(
      this.lenteService.getLentesVigentesAgrupadosList(),
      this.clienteService.getPreciosLentesCliente(this.idCliente)
    )
      .subscribe(r => {
        this.dataSource.data = r[0];
        this.preciosSeleccionados = r[1];
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
            } else 
              this.habilitarGuardar = false;
          });
        });
        for (let i = 1; i <= maxCantPrecio; i++) {
          if (this.recargaPagina == false) {
            this.displayedColumns.push('Precio' + i);
            this.columns.push({ columnDef: 'Precio' + i, header: 'PRECIO ' + i, cell: (precio: any) => `${precio}` });
            if (i == maxCantPrecio) {
              this.displayedColumns.push('PrecioEspecial');
              this.displayedColumns.push('Descuento');
            }
          }
        }
      this.loadingSpinnerService.hide();
    });
  }

  onClickedTodos(event) {
    let checkbox = +event.source.name.split("checkbox")[1];
    let mostrarMensaje = false;
    if (event.checked) {
      this.dataSource.data.forEach(lente => {
        if (lente.PrecioLente != null) {
          lente.PrecioLente.forEach(precio => {
            let precioLenteCliente = <PrecioLenteCliente>{};
            precioLenteCliente.IdPrecioLenteNavigation = <PrecioLente>{};
            precioLenteCliente.IdCliente = this.idCliente;
            if (precio.Precio[checkbox] != null) {
              let tieneOtro = this.preciosSeleccionados.some(p => p.IdPrecioLente != precio.Precio[checkbox].Id && p.IdPrecioLenteNavigation.IdLente == precio.IdLente && p.IdPrecioLenteNavigation.MedidaEsferico == precio.MedidaEsferico && p.IdPrecioLenteNavigation.MedidaCilindrico == precio.MedidaCilindrico && p.Especial != true);
              if (tieneOtro) {
                this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.Especial == true)
              }
              precioLenteCliente.IdPrecioLente = precio.Precio[checkbox].Id;
              precioLenteCliente.IdPrecioLenteNavigation.IdLente = precio.IdLente;
              precioLenteCliente.IdPrecioLenteNavigation.MedidaEsferico = precio.MedidaEsferico;
              precioLenteCliente.IdPrecioLenteNavigation.MedidaCilindrico = precio.MedidaCilindrico;
              this.preciosSeleccionados.push(precioLenteCliente);
            }
            else {
              let incluye = this.preciosSeleccionados.find(p => p.IdPrecioLente == precio.Precio[0].Id);
              if (!incluye) {
                mostrarMensaje = true;
                precioLenteCliente.IdPrecioLente = precio.Precio[0].Id;
                precioLenteCliente.IdPrecioLenteNavigation.IdLente = precio.IdLente;
                precioLenteCliente.IdPrecioLenteNavigation.MedidaEsferico = precio.MedidaEsferico;
                precioLenteCliente.IdPrecioLenteNavigation.MedidaCilindrico = precio.MedidaCilindrico;
                this.preciosSeleccionados.push(precioLenteCliente);
              }
            }
          });
        }
      });
    } else {
      this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.Especial == true)
    }
    if (event.checked && mostrarMensaje) {
      this.sessionService.showInfo("Existen lentes que no tienen este número de precio, se seleccionará el primero");
    }
    this.habilitarBotonGuardar();
  }

  onClicked(precioLente: any, checkbox) {
    let index = +checkbox.source.name.split("checkbox")[1];  //indice checkbox de la fila
    if (checkbox.checked) {
      let tieneOtro = this.preciosSeleccionados.findIndex(ps => ps.IdPrecioLente != precioLente.Precio[index].Id && ps.IdPrecioLenteNavigation.IdLente == precioLente.IdLente 
        && ps.IdPrecioLenteNavigation.MedidaEsferico == precioLente.MedidaEsferico && ps.IdPrecioLenteNavigation.MedidaCilindrico == precioLente.MedidaCilindrico);
      if (tieneOtro != -1)
        this.preciosSeleccionados.splice(tieneOtro, 1);
      let precioLenteCliente = <PrecioLenteCliente>{};
      precioLenteCliente.IdPrecioLenteNavigation = <PrecioLente>{};
      precioLenteCliente.IdCliente = this.idCliente;
      precioLenteCliente.IdPrecioLente = precioLente.Precio[index].Id;
      precioLenteCliente.IdPrecioLenteNavigation.IdLente = precioLente.IdLente;
      precioLenteCliente.IdPrecioLenteNavigation.MedidaEsferico = precioLente.MedidaEsferico;
      precioLenteCliente.IdPrecioLenteNavigation.MedidaCilindrico = precioLente.MedidaCilindrico;
      this.preciosSeleccionados.push(precioLenteCliente);
    } else {
      this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => p.IdPrecioLente == precioLente.Precio[index].Id), 1);
    }
    this.habilitarBotonGuardar();
  }

  _keyPress(event: any) {
    const pattern = /[0-9,.]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  chequear(idPrecio: any) {
    return this.preciosSeleccionados.find(element => element.IdPrecioLente == idPrecio);
  }

  habilitarDescuento(lente: any) {
    let cantidadPrecioLenteTotales = lente.PrecioLente.length;
    let cantidadPrecioLenteSeleccionados = this.preciosSeleccionados.filter(p => p.IdPrecioLenteNavigation.IdLente == lente.Id).length;
    return cantidadPrecioLenteSeleccionados == cantidadPrecioLenteTotales;
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

  descuentoLente(descuento, idLente: number) {
    this.preciosSeleccionados.forEach(p => {
    if (p.IdPrecioLenteNavigation.IdLente == idLente)
        p.Descuento = +descuento;
    });
  }

  precioEspecial(precio, idLente: number) {
    if (precio != "") {
      let precioEspecial = <PrecioLenteCliente>{};
      let i = this.preciosSeleccionados.findIndex(p => p.IdPrecioLenteNavigation != undefined && p.IdPrecioLenteNavigation.IdLente == idLente && p.Especial == true);
      if (i == 0 || i == -1) {
        precioEspecial.Especial = true;
        precioEspecial.IdPrecioLenteNavigation = <PrecioLente>{};
        precioEspecial.IdPrecioLenteNavigation.Precio = +precio;
        precioEspecial.IdPrecioLenteNavigation.IdLente = idLente;
        precioEspecial.IdCliente = this.idCliente;
        this.preciosSeleccionados.push(precioEspecial);
      } else {
        precioEspecial = this.preciosSeleccionados[i];
        precioEspecial.IdPrecioLenteNavigation.Precio = +precio;
        this.preciosSeleccionados[i] = precioEspecial;
      }
    } else {
      this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.IdPrecioLenteNavigation != undefined && p.IdPrecioLenteNavigation.IdLente != idLente);
    }
  }

  indeterminateCheckbox(i) {
    let cantidadPreciosTotales = 0;
    let cantidadSeleccionados = 0;
    this.dataSource.data.forEach(l => {
      if (l.PrecioLente != null) {
        l.PrecioLente.forEach(pl => {
          if (pl.Precio[i] != undefined) {
            cantidadPreciosTotales = cantidadPreciosTotales + 1;
            if (this.preciosSeleccionados.some(p => p.IdPrecioLente == pl.Precio[i].Id && p.IdPrecioLenteNavigation.IdLente == pl.IdLente && p.IdPrecioLenteNavigation.MedidaEsferico == pl.MedidaEsferico
              && p.IdPrecioLenteNavigation.MedidaCilindrico == pl.MedidaCilindrico && p.Especial != true)) {
              cantidadSeleccionados = cantidadSeleccionados + 1;
            }
          }
        })
      }
    });
    return cantidadSeleccionados < cantidadPreciosTotales && cantidadSeleccionados > 0;
  }

  checkedCheckbox(i) {
    let cantidadPreciosTotales = 0;
    let cantidadSeleccionados = 0;
    this.dataSource.data.forEach(l => {
      if (l.PrecioLente != null) {
        l.PrecioLente.forEach(pl => {
          if (pl.Precio[i] != undefined) {
          cantidadPreciosTotales = cantidadPreciosTotales + 1;
            if (this.preciosSeleccionados.some(p => p.IdPrecioLente == pl.Precio[i].Id && p.IdPrecioLenteNavigation.IdLente == pl.IdLente && p.IdPrecioLenteNavigation.MedidaEsferico == pl.MedidaEsferico
              && p.IdPrecioLenteNavigation.MedidaCilindrico == pl.MedidaCilindrico && p.Especial != true)) {
              cantidadSeleccionados = cantidadSeleccionados + 1;
            }
          }
        });
      }
    });
    return cantidadSeleccionados == cantidadPreciosTotales && cantidadSeleccionados > 0;
  }

  habilitarBotonGuardar(){
    let cantidadPreciosTotales = 0;
    let seleccionadosFiltrados = this.preciosSeleccionados.filter(p => p.Especial != true).length;
    this.dataSource.data.forEach(l => {
      if (l.PrecioLente != null) {
        l.PrecioLente.forEach(pl => {
          if (pl.Precio[0] != undefined) {
          cantidadPreciosTotales = cantidadPreciosTotales + 1;
          }
        });
      }
    });
    this.habilitarGuardar = seleccionadosFiltrados == cantidadPreciosTotales && seleccionadosFiltrados > 0;
  }

  guardarCliente() {
    this.recargaPagina = true;
    this.clienteService.savePreciosLentes(this.preciosSeleccionados).subscribe(result => {
      if (result) {
        this.loadPrecioLentePage();
        this.sessionService.showSuccess("Los precios se cargaron correctamente.");
      } else
        this.sessionService.showError("Los precios no se cargaron.");
    });
  }
}
