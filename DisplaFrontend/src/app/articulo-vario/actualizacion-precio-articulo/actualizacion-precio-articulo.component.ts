import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { PrecioArticuloCliente } from 'src/app/model/precioArticuloCliente';
import { ArticuloVarioService } from 'src/services/articulo.vario.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { ArticuloVario } from 'src/app/model/articuloVario';
import { combineLatest } from 'rxjs';
import { TipoArticulo } from 'src/app/model/tipoArticulo';
import { TipoArticuloService } from 'src/services/tipo.articulo.service';
import { PrecioArticulo } from 'src/app/model/precioArticulo';


@Component({
  selector: 'app-actualizacion-precio-articulo',
  templateUrl: './actualizacion-precio-articulo.component.html',
  styleUrls: ['./actualizacion-precio-articulo.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ActualizacionPrecioArticuloComponent implements OnInit {

  displayedColumns = ['Nombre'];
  displayedColumnsArticulo = ['NombreArticulo'];
  columns = [];
  dataSource = new MatTableDataSource<ArticuloVario>();
  dataSourceArticulo = new MatTableDataSource<ArticuloVario>();
  dataSourceTipo = new MatTableDataSource<TipoArticulo>();
  preciosSeleccionados: PrecioArticulo[] = [];
  originalTipo: TipoArticulo[] = [];
  checkboxChecked: boolean[] = [];
  checkboxIndeterminate: boolean[] = [];
  recargaPagina = false;
  expandedElement: TipoArticulo | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    private articuloService: ArticuloVarioService,
    private tipoArticuloService: TipoArticuloService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) {
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

  applyFilter(filterValue: string) {
    if (filterValue != "") {
      let tiposArticulos: TipoArticulo[] = [];
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      // this.dataSourceTipo.filter = filterValue;
      var nombreFilter = this.dataSource.data.filter(i => i.Nombre.toLowerCase().includes(filterValue));
      if (nombreFilter != undefined) {
        nombreFilter.forEach(a => {
          if (tiposArticulos.findIndex(t => t.Id == a.IdTipoArticulo) == -1)
            tiposArticulos.push(a.IdTipoArticuloNavigation)
        });
        this.dataSourceTipo.data = tiposArticulos;
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
    )
      .subscribe(r => {
        this.dataSource.data = r[0];
        this.dataSourceTipo.data = r[1];
        this.originalTipo = JSON.parse(JSON.stringify(r[1]))
        var maxCantPrecio = 0;
        var index = [];
        this.dataSource.data.forEach(a => {
          if (a.PrecioArticulo.length > maxCantPrecio && a.PrecioArticulo)
            maxCantPrecio = a.PrecioArticulo.length
        });

        for (let i = 1; i <= maxCantPrecio; i++) {
          this.checkboxChecked.push(false)
          this.checkboxIndeterminate.push(false);

          if (this.recargaPagina == false) {
            this.displayedColumns.push('Precio' + i);
            this.displayedColumnsArticulo.push('Precio' + i);
            this.columns.push({ columnDef: 'Precio' + i, header: 'PRECIO ' + i, cell: (precio: any) => `${precio}` });
            if (i == maxCantPrecio) {
              this.displayedColumns.push('Porcentaje');
              this.displayedColumnsArticulo.push('PorcentajeArticulo');
            }
          }
        }
      });
    this.loadingSpinnerService.hide();
  }

  tablaArticulos(idTipoArticulo, nombreArticulo) {
    if(nombreArticulo != '') { 
      this.dataSourceArticulo.data = this.dataSource.data.filter(na => na.IdTipoArticulo == idTipoArticulo && na.Nombre.toLowerCase().includes(nombreArticulo));
      console.log(this.dataSourceArticulo.data)
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
    for (let i = 0; i < this.checkboxChecked.length; i++) {
      if (i == checkbox && event.checked) {
        this.checkboxChecked[i] = true;
        this.checkboxIndeterminate[i] = false;
      }
      else {
        this.checkboxChecked[i] = false;
        this.checkboxIndeterminate[i] = false;
      }
    }

    if (event.checked) {
      this.dataSource.data.forEach(e => {
        let precioArticulo = <PrecioArticulo>{};
        if (e.PrecioArticulo[checkbox] != null) {
          let tieneOtro = this.preciosSeleccionados.some(p => p.Id != e.PrecioArticulo[checkbox].Id && p.IdArticulo == e.Id);
          // if (tieneOtro) {
          //   this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.Especial == true)
          // }
          precioArticulo.Id = e.PrecioArticulo[checkbox].Id;
          precioArticulo.IdArticulo = e.PrecioArticulo[checkbox].IdArticulo;
          precioArticulo.IdArticuloNavigation = e.PrecioArticulo[checkbox].IdArticuloNavigation;
          this.preciosSeleccionados.push(precioArticulo);
        }
        else {
          this.checkboxIndeterminate[checkbox] = true;
          let incluye = this.preciosSeleccionados.find(p => p.Id == e.PrecioArticulo[0].Id);
          if (!incluye) {
            precioArticulo.Id = e.PrecioArticulo[0].Id;
            precioArticulo.IdArticulo = e.PrecioArticulo[0].IdArticulo;
            precioArticulo.IdArticuloNavigation = e.PrecioArticulo[0].IdArticuloNavigation;
            this.preciosSeleccionados.push(precioArticulo);
          }
        }
      });
    } 
    // else {
      // this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.Especial == true)
    // }
    if (this.checkboxIndeterminate.includes(true) && event.checked) {
      this.checkboxIndeterminate[0] = true;
      this.sessionService.showInfo("Existen artículos que no tienen este número de precio, se seleccionará el primero");
    }
  }

  onClickedTodosTipo(event, idTipoArticulo) {
    let checkbox = +event.source.name.split("checkbox")[1];
    let mostrarMensaje = false;
    if (event.checked) {
      let arrayArticulos = this.dataSource.data.filter(a => a.IdTipoArticulo == idTipoArticulo);
      arrayArticulos.forEach(a => {
        let precioArticulo = <PrecioArticulo>{};
        if (a.PrecioArticulo[checkbox] != null) {
          let tieneOtro = this.preciosSeleccionados.some(p => p.Id != a.PrecioArticulo[checkbox].Id && p.IdArticulo == a.Id);
          if (tieneOtro) {
            this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.IdArticuloNavigation.IdTipoArticulo != idTipoArticulo && p.Id != a.PrecioArticulo[checkbox].Id)
          }
          precioArticulo.Id = a.PrecioArticulo[checkbox].Id;
          precioArticulo.IdArticulo = a.PrecioArticulo[checkbox].IdArticulo;
          precioArticulo.IdArticuloNavigation = a.PrecioArticulo[checkbox].IdArticuloNavigation;
          this.preciosSeleccionados.push(precioArticulo);
        } else {
          this.checkboxIndeterminate[checkbox] = true;
          this.checkboxIndeterminate[0] = true;
          let incluye = this.preciosSeleccionados.find(p => p.Id == a.PrecioArticulo[0].Id);
          if (!incluye) {
            mostrarMensaje = true;
            precioArticulo.Id = a.PrecioArticulo[0].Id;
            precioArticulo.IdArticulo = a.PrecioArticulo[0].IdArticulo;
            precioArticulo.IdArticuloNavigation = a.PrecioArticulo[0].IdArticuloNavigation;
            this.preciosSeleccionados.push(precioArticulo);
          }
        }
      });
    } else {
      this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.IdArticuloNavigation.IdTipoArticulo != idTipoArticulo)
    }
    if (this.checkboxIndeterminate[0] == true && event.checked && mostrarMensaje) {
      this.sessionService.showInfo("Existen artículos que no tienen este número de precio, se seleccionará el primero");
    }
    var index = [];
    this.checkboxChecked
    this.checkboxIndeterminate
    this.dataSource.data.forEach(a => {
      if (this.preciosSeleccionados.length > 0) {
        var precio = this.preciosSeleccionados.filter(p => p.IdArticulo == a.Id);
        if (precio.length > 0) {
          var i = a.PrecioArticulo.findIndex(pa => pa.Id == precio[0].Id)
          if (!index.includes(i))
            index.push(i);
        }
      }
    });
    if (index.length == 1) {
      this.checkboxChecked[index[0]] = true;
      for (let j = 0; j < this.checkboxIndeterminate.length; j++) {
        this.checkboxIndeterminate[j] = false;
      }
    } else {
      for (let j = 0; j < this.checkboxIndeterminate.length; j++) {
        if (index.includes(j))
          this.checkboxIndeterminate[j] = true;
        else
          this.checkboxIndeterminate[j] = false;
      }
    }
  }

  chequear(idPrecio: any) {
    return this.preciosSeleccionados.find(element => element.Id == idPrecio);
  }

  chequearTipo(event, idTipoArticulo: any) {
    let arrayIndex = [];
    if (this.preciosSeleccionados.length > 0) {
      let arrayPreciosArticulos = this.preciosSeleccionados.filter(element => element.IdArticuloNavigation != undefined && element.IdArticuloNavigation.IdTipoArticulo == idTipoArticulo);
      let arrayArticulos = this.dataSource.data.filter(a => a.IdTipoArticulo == idTipoArticulo);
      if (arrayPreciosArticulos.length >= arrayArticulos.length) {
        arrayArticulos.forEach(a => {
          var i = a.PrecioArticulo.findIndex(pa => pa.Id == arrayPreciosArticulos.filter(p => p.IdArticulo == a.Id)[0].Id)
          if (!arrayIndex.includes(i) && i != -1)
            arrayIndex.push(i);
        })
      }
    }
    return arrayIndex.length == 1 && +event == arrayIndex[0];
  }

  indeterminateTipo(event, idTipoArticulo: any) {
    let arrayIndex = [];
    let arrayPreciosArticulos = this.preciosSeleccionados.filter(element => element.IdArticuloNavigation != undefined && element.IdArticuloNavigation.IdTipoArticulo == idTipoArticulo);
    let arrayArticulos = this.dataSource.data.filter(a => a.IdTipoArticulo == idTipoArticulo);
    if (this.preciosSeleccionados.length > 0) {
      if (arrayPreciosArticulos.length == arrayArticulos.length) {
        arrayArticulos.forEach(a => {
          var i = a.PrecioArticulo.findIndex(pa => pa.Id == this.preciosSeleccionados.filter(p => p.IdArticulo == a.Id)[0].Id)
          if (!arrayIndex.includes(i) && i != -1)
            arrayIndex.push(i);
        })
      }
    }
    return arrayIndex.length > 1 && arrayIndex.includes(+event);
  }

  habilitarPorcentaje(articulo: ArticuloVario) {
    return this.preciosSeleccionados.some(p => articulo.PrecioArticulo.some(part => part.Id == p.Id));
  }

  habilitarPorcentajeTipo(idTipoArticulo: number) {
    let arrayPreciosArticulos = this.preciosSeleccionados.filter(element => element.IdArticuloNavigation != undefined && element.IdArticuloNavigation.IdTipoArticulo == idTipoArticulo);
    let arrayArticulos = this.dataSource.data.filter(a => a.IdTipoArticulo == idTipoArticulo);
    return arrayPreciosArticulos.length >= arrayArticulos.length;
  }

  onClicked(articulo: ArticuloVario, checkbox) {
    let index = +checkbox.source.name.split("checkbox")[1];  //indice checkbox de la fila
    // if (checkbox.checked) {
    let incluye = this.preciosSeleccionados.findIndex(p => p.Id == articulo.PrecioArticulo[index].Id);
    if (incluye == -1) { //si no incluye el precio en los seleccionados, lo agrega
      if (this.preciosSeleccionados.length > 0 &&
        this.preciosSeleccionados.findIndex(p => p.IdArticulo == articulo.Id && p.Id != articulo.PrecioArticulo[index].Id) != -1) {
        //borra el precio que ya estaba seleccionado en la fila (mismo articulo distinto precio)
        this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => p.IdArticulo == articulo.Id && p.Id != articulo.PrecioArticulo[index].Id), 1);;
      }
      let precioArticulo = <PrecioArticulo>{};

      precioArticulo.Id = articulo.PrecioArticulo[index].Id;
      precioArticulo.IdArticulo = articulo.PrecioArticulo[index].IdArticulo;
      precioArticulo.IdArticuloNavigation = articulo.PrecioArticulo[index].IdArticuloNavigation;
      this.preciosSeleccionados.push(precioArticulo);
      // }
    } else {
      this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.Id != articulo.PrecioArticulo[index].Id);
    }
  }

  // porcentajeTipoArticulo(porcentaje, idTipoArticulo: number) {
  //   if (porcentaje != "") {
  //     let arrayPorcentaje = this.preciosSeleccionados.filter(p => p.IdArticuloNavigation != undefined && p.IdArticuloNavigation.IdTipoArticulo == idTipoArticulo);
  //     let arrayIndex = [];
  //     arrayPorcentaje.forEach(i => {
  //       arrayIndex.push(this.preciosSeleccionados.indexOf(i));
  //     });
  //     arrayIndex.forEach(i => {
  //       this.preciosSeleccionados[i].Descuento = +porcentaje;
  //       // console.log(i);
  //     });
  //   }
  // }


  // porcentajeArticulo(porcentaje, idArticulo: number) {
  //   let index = this.checkboxChecked.indexOf(true);
  //   let articulo = this.dataSource.data.filter(a => a.Id == idArticulo)[0]
  //   let precioArticulo: PrecioArticuloCliente;
  //   let i;
  //   if (articulo.PrecioArticulo[index] != null) {
  //     i = this.preciosSeleccionados.findIndex(p => p.IdPrecioArticulo == articulo.PrecioArticulo[index].Id);
  //     precioArticulo = this.preciosSeleccionados.filter(p => p.IdPrecioArticulo == articulo.PrecioArticulo[index].Id)[0];
  //   } else {
  //     i = this.preciosSeleccionados.findIndex(p => p.IdPrecioArticulo == articulo.PrecioArticulo[0].Id);
  //     precioArticulo = this.preciosSeleccionados.filter(p => p.IdPrecioArticulo == articulo.PrecioArticulo[0].Id)[0];
  //   }
  //   precioArticulo.Descuento = +porcentaje;
  //   // console.log(precioArticulo)
  //   this.preciosSeleccionados[i] = precioArticulo;
  //   // console.log(this.preciosSeleccionados)
  // }

  guardarPrecios() {
    this.recargaPagina = true;
    // console.log(this.preciosSeleccionados)
    this.articuloService.savePreciosArticulos(this.preciosSeleccionados).subscribe(result => {
      // console.log(result)
      if (result) {
        this.loadPrecioArticuloPage();
        this.sessionService.showSuccess("Los precios se cargaron correctamente.");
      } else
        this.sessionService.showError("Los precios no se cargaron.");
    }
    );
  }
}
