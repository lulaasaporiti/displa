import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArticuloVarioService } from 'src/services/articulo.vario.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { ArticuloVario } from 'src/app/model/articuloVario';
import { combineLatest } from 'rxjs';
import { TipoArticulo } from 'src/app/model/tipoArticulo';
import { TipoArticuloService } from 'src/services/tipo.articulo.service';
import { PrecioArticulo } from 'src/app/model/precioArticulo';
import { ModificacionPrecioArticuloVarioComponent } from '../modificacion-precio-articulo-vario/modificacion-precio-articulo-vario.component';


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
  checkedPorcentajeTodos: boolean = false;
  recargaPagina = false;
  expandedElement: TipoArticulo | null;
  porcentajesArticulos = [];
  habilitarPorcentajeTodos = false;
  habilitarPorcentajeFila = false;
  habilitarPorcentajeTipoA = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    private articuloService: ArticuloVarioService,
    private tipoArticuloService: TipoArticuloService,
    private dialog: MatDialog,
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
      var nombreFilter = this.dataSource.data.filter(i => i.Nombre.toLowerCase().includes(filterValue) || i.IdTipoArticulo.toString().toLowerCase().includes(filterValue)
        || i.Id.toString().toLowerCase().includes(filterValue));
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
    combineLatest([
      this.articuloService.getArticulosVariosPrecios(),
      this.tipoArticuloService.getTiposArticuloConArticulosList(),
    ])
      .subscribe(r => {
        this.dataSource.data = r[0];
        this.dataSourceTipo.data = r[1];
        this.originalTipo = JSON.parse(JSON.stringify(r[1]));
        this.preciosSeleccionados = [];
        (<HTMLInputElement>document.getElementById("porcentaje")).value = '';

        var maxCantPrecio = 0;
        this.dataSource.data.forEach(a => {
          if (a.PrecioArticulo.length > maxCantPrecio && a.PrecioArticulo)
            maxCantPrecio = a.PrecioArticulo.length
        });

        for (let i = 1; i <= maxCantPrecio; i++) {
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
    if (nombreArticulo != '') {
      this.dataSourceArticulo.data = this.dataSource.data.filter(na => na.IdTipoArticulo == idTipoArticulo && na.Nombre.toLowerCase().includes(nombreArticulo));
    }
    else
      this.dataSourceArticulo.data = this.dataSource.data.filter(a => a.IdTipoArticulo == idTipoArticulo);
  }

  _keyPress(event: any) {
    const pattern = /[0-9-,.]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onClickedTodos(event) {
    let index = +event.source.name.split("checkbox")[1];
    let mostrarMensaje = false;
    let tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;

    if (event.checked) {
      this.dataSource.data.forEach(ar => {
        this.habilitarPorcentajeTodos = true;
        this.habilitarPorcentajeFila = false;
        this.habilitarPorcentajeTipoA = false;
        let precioArticulo = <PrecioArticulo>{};
        let incluye = this.preciosSeleccionados.find(p => ar.PrecioArticulo[index] != undefined && p.Id == ar.PrecioArticulo[index].Id);
        if (ar.PrecioArticulo[index] != null && incluye == undefined) {
          precioArticulo.Id = ar.PrecioArticulo[index].Id;
          precioArticulo.IdArticulo = ar.PrecioArticulo[index].IdArticulo;
          precioArticulo.IdArticuloNavigation = ar.PrecioArticulo[index].IdArticuloNavigation;
          this.preciosSeleccionados.push(precioArticulo);
        }
        else {
          let incluye = this.preciosSeleccionados.find(p => p.Id == ar.PrecioArticulo[0].Id);
          if (!incluye) {
            mostrarMensaje = true;
            precioArticulo.Id = ar.PrecioArticulo[0].Id;
            precioArticulo.IdArticulo = ar.PrecioArticulo[0].IdArticulo;
            precioArticulo.IdArticuloNavigation = ar.PrecioArticulo[0].IdArticuloNavigation;
            this.preciosSeleccionados.push(precioArticulo);
          }
        }
        if (tienePorcentaje) {
          this.porcentajeArticulo(+tienePorcentaje, precioArticulo.IdArticulo)
        }
      });
    } else {
      if (this.preciosSeleccionados.length == this.dataSource.data.length) {
        this.habilitarPorcentajeTodos = false;
        this.preciosSeleccionados = [];
        this.porcentajesArticulos = [];
      } else {
        this.dataSource.data.forEach(ar => {
          let indice = this.preciosSeleccionados.findIndex(p => ar.PrecioArticulo[index] != undefined && ar.PrecioArticulo[index].Id == p.Id)
          if (indice != -1) {
            this.preciosSeleccionados.splice(indice, 1)
          }
          if (this.porcentajesArticulos.length > 0)
            this.porcentajesArticulos.splice(this.porcentajesArticulos.findIndex(p => p.IdPrecio == ar.PrecioArticulo[index].Id), 1);
        });
      }
    }
    if (event.checked && mostrarMensaje) {
      this.sessionService.showInfo("Existen artículos que no tienen este número de precio, se seleccionará el primero");
    }
  }

  onClickedPorcentajeTodos(event) {
    let tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;
    if (event.checked == true) {
      this.habilitarPorcentajeTodos = true;
      this.habilitarPorcentajeFila = false;
      this.habilitarPorcentajeTipoA = false;
      this.dataSource.data.forEach(ar => {
        ar.PrecioArticulo.forEach(pa => {
          let precioArticulo = <PrecioArticulo>{};
          precioArticulo.Id = pa.Id;
          precioArticulo.IdArticulo = pa.IdArticulo;
          precioArticulo.IdArticuloNavigation = pa.IdArticuloNavigation;
          this.preciosSeleccionados.push(precioArticulo);
        });

        if (tienePorcentaje) {
          this.porcentajeArticulo(+tienePorcentaje, ar.Id)
        }
      })
    }
    else {
      this.habilitarPorcentajeTodos = false;
      this.preciosSeleccionados = [];
      this.porcentajesArticulos = [];
    }
  }

  recorrerPrecios() {
    let tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;
    if (this.preciosSeleccionados.length > 0 && tienePorcentaje) {
      this.preciosSeleccionados.forEach(pa => {
        if (!this.porcentajesArticulos.some(p => p.IdPrecio == pa.Id))
          this.porcentajesArticulos.push({ IdPrecio: pa.Id, Porcentaje: +tienePorcentaje });
      })
      // console.log(this.porcentajesArticulos)
    }
  }

  onClickedTodosTipo(event, idTipoArticulo) {
    let index = +event.source.name.split("checkbox")[1];
    let mostrarMensaje = false;
    let tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;
    let arrayArticulos = this.dataSource.data.filter(a => a.IdTipoArticulo == idTipoArticulo);
    if (event.checked) {
      arrayArticulos.forEach(a => {
        let incluye = this.preciosSeleccionados.find(p => a.PrecioArticulo[index] != undefined && p.Id == a.PrecioArticulo[index].Id);
        let precioArticulo = <PrecioArticulo>{};
        if (incluye == undefined) {
          if (a.PrecioArticulo[index] != null) {
            this.habilitarPorcentajeTipoA = true;
            this.habilitarPorcentajeFila = true;
            precioArticulo.Id = a.PrecioArticulo[index].Id;
            precioArticulo.IdArticulo = a.PrecioArticulo[index].IdArticulo;
            precioArticulo.IdArticuloNavigation = a.PrecioArticulo[index].IdArticuloNavigation;
            this.preciosSeleccionados.push(precioArticulo);
          }
        } else {
          let incluye = this.preciosSeleccionados.find(p => p.Id == a.PrecioArticulo[0].Id);
          if (!incluye) {
            mostrarMensaje = true;
            precioArticulo.Id = a.PrecioArticulo[0].Id;
            precioArticulo.IdArticulo = a.PrecioArticulo[0].IdArticulo;
            precioArticulo.IdArticuloNavigation = a.PrecioArticulo[0].IdArticuloNavigation;
            this.preciosSeleccionados.push(precioArticulo);
          }
        }
        if (tienePorcentaje) {
          this.porcentajeArticulo(+tienePorcentaje, a.Id)
        }
      });
    } else {
      if (this.preciosSeleccionados.length == this.dataSource.data.length) {
        this.preciosSeleccionados = [];
        this.habilitarPorcentajeTipoA = false;
        this.habilitarPorcentajeFila = false;
      } else {
        arrayArticulos.forEach(ar => {
          let indice = this.preciosSeleccionados.findIndex(p => ar.PrecioArticulo[index] != undefined && ar.PrecioArticulo[index].Id == p.Id)
          if (indice != -1) {
            this.preciosSeleccionados.splice(indice, 1)
          }
          if (this.porcentajesArticulos.length > 0)
            this.porcentajesArticulos.splice(this.porcentajesArticulos.findIndex(p => ar.PrecioArticulo[index] != undefined && p.IdPrecio == ar.PrecioArticulo[index].Id), 1);
        });
      }
    }
    if (event.checked && mostrarMensaje) {
      this.sessionService.showInfo("Existen artículos que no tienen este número de precio, se seleccionará el primero");
    }
  }

  chequear(idPrecio: any) {
    return this.preciosSeleccionados.find(element => element.Id == idPrecio);
  }

  chequearTipo(event, idTipoArticulo: any) {
    let cantidadPreciosTotales = 0;
    let cantidadSeleccionados = 0;
    let arrayTipoArticulo = this.dataSource.data.filter(ar => ar.IdTipoArticulo == idTipoArticulo)
    arrayTipoArticulo.forEach(a => {
      if (a.PrecioArticulo != null) {
        if (a.PrecioArticulo[event] != undefined) {
          cantidadPreciosTotales = cantidadPreciosTotales + 1;
          if (this.preciosSeleccionados.some(p => p.Id == a.PrecioArticulo[event].Id && p.IdArticulo == a.Id)) {
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
          if (this.preciosSeleccionados.some(p => p.Id == a.PrecioArticulo[event].Id && p.IdArticulo == a.Id)) {
            cantidadSeleccionados = cantidadSeleccionados + 1;
          }
        }
      }
    });
    return cantidadSeleccionados < cantidadPreciosTotales && cantidadSeleccionados > 0;
  }

  habilitarPorcentaje(articulo: ArticuloVario) {
    if (this.habilitarPorcentajeFila == false) {
      return false
    }
    else {
      return this.preciosSeleccionados.some(p => articulo.PrecioArticulo.some(part => part.Id == p.Id));
    }
  }

  habilitarPorcentajeTipo(idTipoArticulo: number) {
    if (this.habilitarPorcentajeTodos == true) {
      return false;
    }
    else {
      let arrayPreciosArticulos = this.preciosSeleccionados.filter(element => element.IdArticuloNavigation != undefined && element.IdArticuloNavigation.IdTipoArticulo == idTipoArticulo);
      let arrayArticulos = this.dataSource.data.filter(a => a.IdTipoArticulo == idTipoArticulo);
      return arrayPreciosArticulos.length == arrayArticulos.length;
    }
  }

  onClicked(articulo: ArticuloVario, checkbox) {
    let index = +checkbox.source.name.split("checkbox")[1];  //indice checkbox de la fila
    let tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;

    if (checkbox.checked) {
      this.habilitarPorcentajeFila = true;
      let precioServicio = <PrecioArticulo>{};
      precioServicio.Id = articulo.PrecioArticulo[index].Id;
      precioServicio.IdArticulo = articulo.PrecioArticulo[index].IdArticulo;
      precioServicio.IdArticuloNavigation = articulo.PrecioArticulo[index].IdArticuloNavigation;
      this.preciosSeleccionados.push(precioServicio);
      if (tienePorcentaje) {
        this.porcentajeArticulo(+tienePorcentaje, articulo.Id)
      }

    } else {
      this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => articulo.PrecioArticulo[index] != undefined && p.IdArticulo == articulo.Id && p.Id == articulo.PrecioArticulo[index].Id), 1);
      if (this.porcentajesArticulos.length > 0) {
        this.porcentajesArticulos.splice(this.porcentajesArticulos.findIndex(p => articulo.PrecioArticulo[index] != undefined && p.IdPrecio == articulo.PrecioArticulo[index].Id), 1);
      }
    }
  }

  porcentajeTipoArticulo(porcentaje, idTipoArticulo: number) {
    let preciosArticulos = this.preciosSeleccionados.filter(p => p.IdArticuloNavigation.IdTipoArticulo == idTipoArticulo);
    if (porcentaje != "") {
      preciosArticulos.forEach(p => {
        this.porcentajesArticulos.push({ IdPrecio: p.Id, IdPrecioNavigation: p, Porcentaje: +porcentaje });
      });
    } else {
      this.porcentajesArticulos = this.porcentajesArticulos.filter(p => p.IdPrecioNavigation.IdArticuloNavigation.IdTipoArticulo != idTipoArticulo);
    }
  }


  porcentajeArticulo(porcentaje, idArticulo: number) {
    let preciosArticulos = this.preciosSeleccionados.filter(p => p.IdArticulo == idArticulo);
    if (porcentaje != "") {
      preciosArticulos.forEach(p => {
        if (!this.porcentajesArticulos.some(pa => pa.IdPrecio == p.Id))
          this.porcentajesArticulos.push({ IdPrecio: p.Id, IdPrecioNavigation: p, Porcentaje: +porcentaje });
      });
    } else { 
      this.porcentajesArticulos = this.porcentajesArticulos.filter(p => p.IdPrecioNavigation.IdArticulo != idArticulo);
    }
  }

  indeterminateCheckbox(i) {
    let cantidadPreciosTotales = 0;
    let cantidadSeleccionados = 0;
    this.dataSource.data.forEach(a => {
      if (a.PrecioArticulo != null) {
        cantidadPreciosTotales = cantidadPreciosTotales + 1;
        if (a.PrecioArticulo[i] != undefined) {
          if (this.preciosSeleccionados.some(p => p.Id == a.PrecioArticulo[i].Id && p.IdArticulo == a.Id)) {
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
        cantidadPreciosTotales = cantidadPreciosTotales + 1;
        if (a.PrecioArticulo[i] != undefined) {
          if (this.preciosSeleccionados.some(p => p.Id == a.PrecioArticulo[i].Id && p.IdArticulo == a.Id)) {
            cantidadSeleccionados = cantidadSeleccionados + 1;
          }
        }
      }
    });
    return cantidadSeleccionados == cantidadPreciosTotales && cantidadSeleccionados > 0;
  }

  guardarPrecios() {
    this.recargaPagina = true;
    this.checkedPorcentajeTodos = false;
    this.articuloService.saveActualizacionPrecio(this.porcentajesArticulos)
      .subscribe(result => {
        if (result) {
          this.loadPrecioArticuloPage();
          this.sessionService.showSuccess("Los precios se cargaron correctamente.");
        } else
          this.sessionService.showError("Los precios no se cargaron.");
      }
      );
  }

  modificacionPrecioArticuloVario(event): void {
    const dialogRef = this.dialog.open(ModificacionPrecioArticuloVarioComponent, {
      data: { idArticulo: event, },
      width: '800px',
      height: '600px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.recargaPagina = true;
        this.articuloService.saveOrUpdateArticuloVario(result).subscribe(
          data => {
            this.loadPrecioArticuloPage();
            this.sessionService.showSuccess("Los precios se han modificado correctamente");
          },
          error => {
            // console.log(error)
            this.sessionService.showError("Los precios no se modificaron.");
          }
        );
      }
    }
    );
  }

  devolverValorPorcentaje(idArticulo){
    let porcentaje = this.porcentajesArticulos.find(p => p.IdPrecioNavigation.IdArticulo == idArticulo);
    if (porcentaje != undefined)
      return this.porcentajesArticulos.find(p => p.IdPrecioNavigation.IdArticulo == idArticulo).Porcentaje;
    else
      return "";
  }
}
