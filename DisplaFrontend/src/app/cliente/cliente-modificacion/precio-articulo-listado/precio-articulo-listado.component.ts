import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
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
  selector: 'app-precio-articulo-cliente-listado',
  templateUrl: './precio-articulo-listado.component.html',
  styleUrls: ['./precio-articulo-listado.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PrecioArticuloListadoComponent implements OnInit {

  displayedColumns = ['Nombre'];
  displayedColumnsArticulo = ['NombreArticulo'];
  columns = [];
  idCliente: number = 0;
  dataSource = new MatTableDataSource<ArticuloVario>();
  dataSourceArticulo = new MatTableDataSource<ArticuloVario>();
  dataSourceTipo = new MatTableDataSource<TipoArticulo>();
  originalTipo: TipoArticulo[] = [];
  // checkboxChecked: boolean[] = [];
  // checkboxIndeterminate: boolean[] = [];
  recargaPagina = false;
  habilitarGuardar = true;
  preciosSeleccionados: PrecioArticuloCliente[] = [];
  expandedElement: TipoArticulo | null;

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
    this.loadPrecioArticuloPage();
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  cancelar() {
    this.router.navigateByUrl('Cliente/Listado')
  }


  applyFilter(filterValue: string) {
    if (filterValue != "") {
      let tiposArticulos: TipoArticulo[] = [];
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      // this.dataSourceTipo.filter = filterValue;
      var nombreFilter = this.dataSource.data.filter(i => i.Nombre.toLowerCase().includes(filterValue) || i.IdTipoArticulo.toString().toLowerCase().includes(filterValue) 
      || i.Id.toString().toLowerCase().includes(filterValue));
      if (nombreFilter != undefined) {
        nombreFilter.forEach(a => {
          if (tiposArticulos.findIndex(t => t.Id == a.IdTipoArticulo) == -1)
            tiposArticulos.push(a.IdTipoArticuloNavigation)
        });
        this.dataSourceTipo.data = tiposArticulos;
        // this.tablaArticulos(nombreFilter[0].IdTipoArticulo, filterValue)
      }
    } else {
      this.dataSourceTipo.data = this.originalTipo;
    }
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
        this.originalTipo = JSON.parse(JSON.stringify(r[1]))
        this.preciosSeleccionados = r[2];
        var maxCantPrecio = 0;
        var index = [];
        this.dataSource.data.forEach(a => {
          if (a.PrecioArticulo.length > maxCantPrecio && a.PrecioArticulo)
            maxCantPrecio = a.PrecioArticulo.length
          if (this.preciosSeleccionados.length > 0) {
            var arrayAux = this.preciosSeleccionados.filter(p => p.IdPrecioArticuloNavigation.IdArticulo == a.Id);
            if (arrayAux.length > 0) {
              var i = a.PrecioArticulo.findIndex(pa => pa.Id == arrayAux[0].IdPrecioArticuloNavigation.Id)
              if (!index.includes(i))
                index.push(i);
            }
          } else 
            this.habilitarGuardar = false;
        });

        for (let i = 1; i <= maxCantPrecio; i++) {
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
      this.loadingSpinnerService.hide();
      });
  }

  tablaArticulos(idTipoArticulo, nombreArticulo) {
    if(nombreArticulo != '') { 
      this.dataSourceArticulo.data = this.dataSource.data.filter(na => na.IdTipoArticulo == idTipoArticulo && na.Nombre.toLowerCase().includes(nombreArticulo));
    }
    else 
      this.dataSourceArticulo.data = this.dataSource.data.filter(a => a.IdTipoArticulo == idTipoArticulo);
  }

  _keyPress(event: any) {
    const pattern = /[0-9,.]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onClickedTodos(event) {
    let checkbox = +event.source.name.split("checkbox")[1];
    let mostrarMensaje = false;
    if (event.checked) {
      this.dataSource.data.forEach(e => {
        let precioArticuloCliente = <PrecioArticuloCliente>{};
        precioArticuloCliente.IdPrecioArticuloNavigation = <PrecioArticulo>{};
        precioArticuloCliente.IdCliente = this.idCliente;
        if (e.PrecioArticulo[checkbox] != null) {
          let tieneOtro = this.preciosSeleccionados.some(p => p.IdPrecioArticulo != e.PrecioArticulo[checkbox].Id && p.IdPrecioArticuloNavigation.IdArticulo == e.Id && p.Especial != true);
          if (tieneOtro) {
            this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.Especial == true)
          }
          precioArticuloCliente.IdPrecioArticulo = e.PrecioArticulo[checkbox].Id;
          precioArticuloCliente.IdPrecioArticuloNavigation = e.PrecioArticulo[checkbox];
          this.preciosSeleccionados.push(precioArticuloCliente);
        }
        else {
          let incluye = this.preciosSeleccionados.find(p => p.IdPrecioArticulo == e.PrecioArticulo[0].Id);
          if (!incluye) {
            mostrarMensaje = true;
            precioArticuloCliente.IdPrecioArticulo = e.PrecioArticulo[0].Id;
            precioArticuloCliente.IdPrecioArticuloNavigation = e.PrecioArticulo[0];
            this.preciosSeleccionados.push(precioArticuloCliente);
          }
        }
      });
    } else {
      this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.Especial == true);
    }
    if (event.checked && mostrarMensaje) {
      this.sessionService.showInfo("Existen artículos que no tienen este número de precio, se seleccionará el primero");
    }
    this.habilitarBotonGuardar();
  }

  onClickedTodosTipo(event, idTipoArticulo) {
    let checkbox = +event.source.name.split("checkbox")[1];
    let mostrarMensaje = false;
    if (event.checked) {
      let arrayArticulos = this.dataSource.data.filter(a => a.IdTipoArticulo == idTipoArticulo);
      arrayArticulos.forEach(a => {
        let precioArticuloCliente = <PrecioArticuloCliente>{};
        precioArticuloCliente.IdPrecioArticuloNavigation = <PrecioArticulo>{};
        precioArticuloCliente.IdCliente = this.idCliente;
        if (a.PrecioArticulo[checkbox] != null) {
          let tieneOtro = this.preciosSeleccionados.some(p => p.IdPrecioArticulo != a.PrecioArticulo[checkbox].Id && p.IdPrecioArticuloNavigation.IdArticulo == a.Id && p.Especial != true);
          if (tieneOtro) {
            this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.IdPrecioArticuloNavigation != undefined && p.IdPrecioArticuloNavigation.IdArticuloNavigation.IdTipoArticulo != idTipoArticulo && p.IdPrecioArticulo != a.PrecioArticulo[checkbox].Id && p.Especial != true);
          }
          precioArticuloCliente.IdPrecioArticulo = a.PrecioArticulo[checkbox].Id;
          precioArticuloCliente.IdPrecioArticuloNavigation = a.PrecioArticulo[checkbox];
          this.preciosSeleccionados.push(precioArticuloCliente);
        } else {
          let incluye = this.preciosSeleccionados.find(p => p.IdPrecioArticulo == a.PrecioArticulo[0].Id);
          if (!incluye) {
            mostrarMensaje = true;
            precioArticuloCliente.IdPrecioArticulo = a.PrecioArticulo[0].Id;
            precioArticuloCliente.IdPrecioArticuloNavigation = a.PrecioArticulo[0];
            this.preciosSeleccionados.push(precioArticuloCliente);
          }
        }
      });
    } else {
      this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.IdPrecioArticuloNavigation != undefined && p.IdPrecioArticuloNavigation.IdArticuloNavigation.IdTipoArticulo != idTipoArticulo && p.Especial != true)
    }
    if (event.checked && mostrarMensaje) {
      this.sessionService.showInfo("Existen artículos que no tienen este número de precio, se seleccionará el primero");
    }
    var index = [];
    this.dataSource.data.forEach(a => {
      if (this.preciosSeleccionados.length > 0) {
        var precio = this.preciosSeleccionados.filter(p => p.IdPrecioArticuloNavigation != null && p.IdPrecioArticuloNavigation.IdArticulo == a.Id);
        if (precio.length > 0) {
          var i = a.PrecioArticulo.findIndex(pa => pa.Id == precio[0].IdPrecioArticuloNavigation.Id)
          if (!index.includes(i))
            index.push(i);
        }
      }
    });
    this.habilitarBotonGuardar();
  }

  chequear(idPrecio: any) {
    return this.preciosSeleccionados.find(element => element.IdPrecioArticulo == idPrecio);
  }
  
  chequearTipo(event, idTipoArticulo: any) {
    let cantidadPreciosTotales = 0;
    let cantidadSeleccionados = 0;
    let arrayTipoArticulo = this.dataSource.data.filter(ar => ar.IdTipoArticulo == idTipoArticulo)
    arrayTipoArticulo.forEach(a => {
      if (a.PrecioArticulo != null) {      
            if (a.PrecioArticulo[event] != undefined) { 
            cantidadPreciosTotales = cantidadPreciosTotales + 1;
            if (this.preciosSeleccionados.some(p => p.IdPrecioArticulo == a.PrecioArticulo[event].Id && p.IdPrecioArticuloNavigation.IdArticulo == a.Id && p.Especial != true)) {
              cantidadSeleccionados = cantidadSeleccionados + 1;
            }
          }
      }
    });
    return cantidadSeleccionados == cantidadPreciosTotales && cantidadSeleccionados > 0;
  }

  indeterminateTipo(event, idTipoArticulo: any) {
    let cantidadPreciosTotales = 0;
    let cantidadSeleccionados = 0;
    let arrayTipoArticulo = this.dataSource.data.filter(ar => ar.IdTipoArticulo == idTipoArticulo)
    arrayTipoArticulo.forEach(a => {
      if (a.PrecioArticulo != null) {      
            if (a.PrecioArticulo[event] != undefined) { 
            cantidadPreciosTotales = cantidadPreciosTotales + 1;
            if (this.preciosSeleccionados.some(p => p.IdPrecioArticulo == a.PrecioArticulo[event].Id && p.IdPrecioArticuloNavigation.IdArticulo == a.Id && p.Especial != true)) {
              cantidadSeleccionados = cantidadSeleccionados + 1;
            }
          }
      }
    });
    return cantidadSeleccionados < cantidadPreciosTotales && cantidadSeleccionados > 0;
  }

  habilitarDescuento(articulo: ArticuloVario) {
    return this.preciosSeleccionados.some(p => articulo.PrecioArticulo.some(part => part.Id == p.IdPrecioArticulo));
  }

  habilitarDescuentoTipo(idTipoArticulo: number) {
    let arrayPreciosArticulos = this.preciosSeleccionados.filter(element => element.IdPrecioArticuloNavigation != null && element.IdPrecioArticuloNavigation.IdArticuloNavigation != undefined && element.IdPrecioArticuloNavigation.IdArticuloNavigation.IdTipoArticulo == idTipoArticulo);
    let arrayArticulos = this.dataSource.data.filter(a => a.IdTipoArticulo == idTipoArticulo);
    return arrayPreciosArticulos.length >= arrayArticulos.length;
  }

  onClicked(articulo: ArticuloVario, checkbox) {
    let index = +checkbox.source.name.split("checkbox")[1];  //indice checkbox de la fila
    // if (checkbox.checked) {
    let incluye = this.preciosSeleccionados.findIndex(p => p.IdPrecioArticulo == articulo.PrecioArticulo[index].Id);
    if (incluye == -1) { //si no incluye el precio en los seleccionados, lo agrega
      if (this.preciosSeleccionados.length > 0 &&
        this.preciosSeleccionados.findIndex(p => p.IdPrecioArticuloNavigation.IdArticulo == articulo.Id && p.IdPrecioArticulo != articulo.PrecioArticulo[index].Id && p.Especial != true) != -1) {
        //borra el precio que ya estaba seleccionado en la fila (mismo articulo distinto precio)
        this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => p.IdPrecioArticuloNavigation.IdArticulo == articulo.Id && p.IdPrecioArticulo != articulo.PrecioArticulo[index].Id), 1);;
      }
      let precioArticuloCliente = <PrecioArticuloCliente>{};
      precioArticuloCliente.IdCliente = this.idCliente;
      precioArticuloCliente.IdPrecioArticulo = articulo.PrecioArticulo[index].Id;
      precioArticuloCliente.IdPrecioArticuloNavigation = articulo.PrecioArticulo[index];
      this.preciosSeleccionados.push(precioArticuloCliente);
      // }
    } else {
      this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.IdPrecioArticulo != articulo.PrecioArticulo[index].Id);
    }
    this.habilitarBotonGuardar();
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
    if (precio != undefined)
      return precio.Descuento;
    else
      return "";
  }

  valorDescuentoTipo(idTipoArticulo) {
    let arrayArticulos = this.dataSource.data.filter(a => a.IdTipoArticulo == idTipoArticulo);
    let arrayDescuento = this.preciosSeleccionados.filter(p => p.IdPrecioArticuloNavigation != undefined && p.IdPrecioArticuloNavigation.IdArticuloNavigation != undefined && p.IdPrecioArticuloNavigation.IdArticuloNavigation.IdTipoArticulo == idTipoArticulo && p.Descuento != null)
    if (arrayArticulos.length == arrayDescuento.length) {
      let descuento = arrayDescuento[0].Descuento;
      if (arrayDescuento.some(p => p.Descuento != descuento))
        return "";
      else
        return descuento;
    }
    else
      return "";
  }

  precioEspecial(precio, idArticulo: number) {
    if (precio != "") {
      let precioEspecial = <PrecioArticuloCliente>{};
      let i = this.preciosSeleccionados.findIndex(p => p => p.IdPrecioArticuloNavigation != undefined && p.IdPrecioArticuloNavigation.IdArticulo == idArticulo && p.Especial == true);
      // console.log(i)
      if (i == 0 || i == -1) {
        precioEspecial.Especial = true;
        precioEspecial.IdPrecioArticuloNavigation = <PrecioArticulo>{};
        precioEspecial.IdPrecioArticuloNavigation.Precio = +precio;
        precioEspecial.IdPrecioArticuloNavigation.IdArticulo = idArticulo;
        precioEspecial.IdCliente = this.idCliente;
        // console.log(precioEspecial)
        this.preciosSeleccionados.push(precioEspecial);
      } else {
        precioEspecial = this.preciosSeleccionados[i];
        precioEspecial.IdPrecioArticuloNavigation.Precio = +precio;
        this.preciosSeleccionados[i] = precioEspecial;
      }
    } else {
      this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p => p.IdPrecioArticuloNavigation != undefined && p.IdPrecioArticuloNavigation.IdArticulo != idArticulo);
    }
    // console.log(this.preciosSeleccionados)
  }

  descuentoTipoArticulo(descuento, idTipoArticulo: number) {
    if (descuento != "") {
      let arrayDescuento = this.preciosSeleccionados.filter(p => p.IdPrecioArticuloNavigation != undefined && p.IdPrecioArticuloNavigation.IdArticuloNavigation != undefined && p.IdPrecioArticuloNavigation.IdArticuloNavigation.IdTipoArticulo == idTipoArticulo && p.Especial != true);
      let arrayIndex = [];
      let precioArticulo: PrecioArticuloCliente;
      arrayDescuento.forEach(i => {
        arrayIndex.push(this.preciosSeleccionados.indexOf(i));
      });
      arrayIndex.forEach(i => {
        this.preciosSeleccionados[i].Descuento = +descuento;
        // console.log(i);
      });
    }
  }


  descuentoArticulo(descuento, idArticulo: number) {
    let precioServicio = this.preciosSeleccionados.filter(p => p.IdPrecioArticuloNavigation != undefined && p.IdPrecioArticuloNavigation.IdArticulo == idArticulo)[0]
    let i = this.preciosSeleccionados.findIndex(p => p.Id == precioServicio.Id);
    precioServicio.Descuento = +descuento;
    this.preciosSeleccionados[i] = precioServicio;
  }

  indeterminateCheckbox(i) {
    let cantidadPreciosTotales = 0;
    let cantidadSeleccionados = 0;
    this.dataSource.data.forEach(a => {
      if (a.PrecioArticulo != null) {      
            if (a.PrecioArticulo[i] != undefined) { 
            cantidadPreciosTotales = cantidadPreciosTotales + 1;
            if (this.preciosSeleccionados.some(p => p.IdPrecioArticulo == a.PrecioArticulo[i].Id && p.IdPrecioArticuloNavigation.IdArticulo == a.Id && p.Especial != true)) {
              cantidadSeleccionados = cantidadSeleccionados + 1;
            }
          }
      }
    });
    return cantidadSeleccionados < cantidadPreciosTotales && cantidadSeleccionados > 0;
  }

  checkedCheckbox(i) {
    let cantidadPreciosTotales = 0;
    let cantidadSeleccionados = 0;
    this.dataSource.data.forEach(a => {
      if (a.PrecioArticulo != null) {    
            if (a.PrecioArticulo[i] != undefined) {  
            cantidadPreciosTotales = cantidadPreciosTotales + 1;
            if (this.preciosSeleccionados.some(p => p.IdPrecioArticulo == a.PrecioArticulo[i].Id && p.IdPrecioArticuloNavigation.IdArticulo == a.Id && p.Especial != true)) {
              cantidadSeleccionados = cantidadSeleccionados + 1;
            }
          }
      }
    });
    return cantidadSeleccionados == cantidadPreciosTotales && cantidadSeleccionados > 0;
  }

  habilitarBotonGuardar(){
    let cantidadPreciosTotales = 0;
    let seleccionadosFiltrados = this.preciosSeleccionados.filter(p => p.Especial != true).length;
    this.dataSource.data.forEach(a => {
      if (a.PrecioArticulo != null) {
        if (a.PrecioArticulo[0] != undefined) {
          cantidadPreciosTotales = cantidadPreciosTotales + 1;
        }
      }
    });
    this.habilitarGuardar = seleccionadosFiltrados == cantidadPreciosTotales && seleccionadosFiltrados > 0;
  }

  guardarCliente() {
    this.recargaPagina = true;
    this.clienteService.savePreciosArticulos(this.preciosSeleccionados).subscribe(result => {
      if (result) {
        this.loadPrecioArticuloPage();
        this.sessionService.showSuccess("Los precios se cargaron correctamente.");
      } else
        this.sessionService.showError("Los precios no se cargaron.");
    }
    );
  }
}
