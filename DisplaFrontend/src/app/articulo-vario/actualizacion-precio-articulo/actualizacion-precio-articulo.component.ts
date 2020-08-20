import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
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
  checkboxChecked: boolean[] = [];
  checkboxIndeterminate: boolean[] = [];
  checkedPorcentajeTodos: boolean = false;
  recargaPagina = false;
  expandedElement: TipoArticulo | null;
  porcentajesArticulos = [];
  habilitarPorcentajeTodos = false;
  hablitarPorcentajeFila = false;
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
    combineLatest(
      this.articuloService.getArticulosVariosPrecios(),
      this.tipoArticuloService.getTiposArticuloConArticulosList(),
    )
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
          this.checkboxChecked[i-1] = false;
          this.checkboxIndeterminate[i-1] = false;

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
    let checkbox = +event.source.name.split("checkbox")[1];
    let mostrarMensaje = false;
    let tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;

    if (event.checked) {
      this.dataSource.data.forEach(ar => {
        this.habilitarPorcentajeTodos = true;
        this.hablitarPorcentajeFila = false;
        this.habilitarPorcentajeTipoA = false;
        let precioArticulo = <PrecioArticulo>{};
        if (ar.PrecioArticulo[checkbox] != null) {
          precioArticulo.Id = ar.PrecioArticulo[checkbox].Id;
          precioArticulo.IdArticulo = ar.PrecioArticulo[checkbox].IdArticulo;
          precioArticulo.IdArticuloNavigation = ar.PrecioArticulo[checkbox].IdArticuloNavigation;
          this.preciosSeleccionados.push(precioArticulo);
        }
        else {
          if (this.checkboxChecked[0] == false)
            this.checkboxIndeterminate[0] = true;
          let incluye = this.preciosSeleccionados.find(p => p.Id == ar.PrecioArticulo[0].Id);
          if (!incluye) {
            mostrarMensaje = true;
            precioArticulo.Id = ar.PrecioArticulo[0].Id;
            precioArticulo.IdArticulo = ar.PrecioArticulo[0].IdArticulo;
            precioArticulo.IdArticuloNavigation = ar.PrecioArticulo[0].IdArticuloNavigation;
            this.preciosSeleccionados.push(precioArticulo);
          }
        }
        if(tienePorcentaje){
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
          this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => ar.PrecioArticulo[checkbox] != undefined && ar.PrecioArticulo[checkbox].Id == p.Id && ar.Id == p.IdArticulo), 1);
          if (this.porcentajesArticulos.length > 0) 
            this.porcentajesArticulos.splice(this.porcentajesArticulos.findIndex(p => p.IdPrecio == ar.PrecioArticulo[checkbox].Id), 1);
        });
      }
    }
    if (this.checkboxIndeterminate[0] == true && event.checked && mostrarMensaje) {
      this.sessionService.showInfo("Existen artículos que no tienen este número de precio, se seleccionará el primero");
    }
  }

  onClickedPorcentajeTodos(event) {
    let tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;
    if (event.checked == true) {
      this.habilitarPorcentajeTodos = true;
      this.hablitarPorcentajeFila = false;
      this.habilitarPorcentajeTipoA = false;
      this.dataSource.data.forEach(ar => {
        ar.PrecioArticulo.forEach(pa => {
        let precioArticulo = <PrecioArticulo>{};
          precioArticulo.Id = pa.Id;
          precioArticulo.IdArticulo = pa.IdArticulo;
          precioArticulo.IdArticuloNavigation = pa.IdArticuloNavigation;
          this.preciosSeleccionados.push(precioArticulo);
        }); 
        
        if(tienePorcentaje) {
          this.porcentajeArticulo(+tienePorcentaje, ar.Id)
        }   
      })
      for (let i = 0; i < this.checkboxChecked.length; i++) {
        this.checkboxChecked[i] = true;
      }
    }
    else {
      this.habilitarPorcentajeTodos = false;
      this.preciosSeleccionados = [];
      this.porcentajesArticulos = [];
      for (let i = 0; i < this.checkboxChecked.length; i++) {
        this.checkboxChecked[i] = false;
      }
    }
  }

  recorrerPrecios() {
    let tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;
    if (this.preciosSeleccionados.length > 0 && tienePorcentaje) {
      this.preciosSeleccionados.forEach(pa => {
        if (!this.porcentajesArticulos.some(p => p.IdPrecio == pa.Id))
          this.porcentajesArticulos.push({IdPrecio: pa.Id, Porcentaje: +tienePorcentaje});
      })
      // console.log(this.porcentajesArticulos)
    }
  }

  onClickedTodosTipo(event, idTipoArticulo) {
    let checkbox = +event.source.name.split("checkbox")[1];
    let mostrarMensaje = false;
    let tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;
    let arrayArticulos = this.dataSource.data.filter(a => a.IdTipoArticulo == idTipoArticulo);
    if (event.checked) {
      arrayArticulos.forEach(a => {
        let precioArticulo = <PrecioArticulo>{};
        if (a.PrecioArticulo[checkbox] != null) {
          this.habilitarPorcentajeTipoA = true;
          this.hablitarPorcentajeFila = true;
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
        if(tienePorcentaje) {
          this.porcentajeArticulo(+tienePorcentaje, a.Id)
        }   
      });
    } else {
    if (this.preciosSeleccionados.length == this.dataSource.data.length) {
      this.preciosSeleccionados = [];
      this.habilitarPorcentajeTipoA = false;
      this.hablitarPorcentajeFila = false;
    } else {
      arrayArticulos.forEach(ar => {
        this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => ar.PrecioArticulo[checkbox] != undefined && ar.PrecioArticulo[checkbox].Id == p.Id), 1);
        if (this.porcentajesArticulos.length > 0)
            this.porcentajesArticulos.splice(this.porcentajesArticulos.findIndex(p => ar.PrecioArticulo[checkbox] != undefined && p.IdPrecio == ar.PrecioArticulo[checkbox].Id), 1);
      });
    }
    }
    if (this.checkboxIndeterminate[0] == true && event.checked && mostrarMensaje) {
      this.sessionService.showInfo("Existen artículos que no tienen este número de precio, se seleccionará el primero");
    }
    let index = [];
    this.dataSource.data.forEach(a => {
      if (this.preciosSeleccionados.length > 0) {
        let precio = this.preciosSeleccionados.filter(p => p.IdArticulo == a.Id);
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
      let arrayTodosArticulos = this.dataSource.data.filter(a => a.IdTipoArticulo == idTipoArticulo);
      if (arrayPreciosArticulos.length >= arrayTodosArticulos.length) {
        arrayTodosArticulos.forEach(a => {
          arrayPreciosArticulos.forEach(p => {
          var i = a.PrecioArticulo.findIndex(pa => pa.Id == p.Id);
          if (!arrayIndex.includes(i) && i != -1)
            arrayIndex.push(i);
          })
        })
      }
    }
    return arrayIndex.includes(+event);
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
    if(this.hablitarPorcentajeFila == false) {
      return false
    }
    else {
      return this.preciosSeleccionados.some(p => articulo.PrecioArticulo.some(part => part.Id == p.Id));
    }
  }

  habilitarPorcentajeTipo(idTipoArticulo: number) {
    if(this.habilitarPorcentajeTipoA == false) {
      return false
    }
    else {
    let arrayPreciosArticulos = this.preciosSeleccionados.filter(element => element.IdArticuloNavigation != undefined && element.IdArticuloNavigation.IdTipoArticulo == idTipoArticulo);
    let arrayArticulos = this.dataSource.data.filter(a => a.IdTipoArticulo == idTipoArticulo);
    return arrayPreciosArticulos.length >= arrayArticulos.length;
   }
  }

  onClicked(articulo: ArticuloVario, checkbox) {
    let index = +checkbox.source.name.split("checkbox")[1];  //indice checkbox de la fila
    let tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;
    if (checkbox.checked) {
      this.hablitarPorcentajeFila = true;
      let precioServicio = <PrecioArticulo>{};
      precioServicio.Id = articulo.PrecioArticulo[index].Id;
      precioServicio.IdArticulo = articulo.PrecioArticulo[index].IdArticulo;
      precioServicio.IdArticuloNavigation = articulo.PrecioArticulo[index].IdArticuloNavigation;
      this.preciosSeleccionados.push(precioServicio);
      if (tienePorcentaje) {
        this.porcentajeArticulo(+tienePorcentaje, articulo.Id)
      }

    } else {
      this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => articulo.PrecioArticulo[index] != undefined && p.IdArticulo == articulo.Id && p.Id != articulo.PrecioArticulo[index].Id), 1);
      if (this.porcentajesArticulos.length > 0)
        this.porcentajesArticulos.splice(this.porcentajesArticulos.findIndex(p => articulo.PrecioArticulo[index] != undefined && p.IdPrecio == articulo.PrecioArticulo[index].Id), 1);
    }
  }

  porcentajeTipoArticulo(porcentaje, idTipoArticulo: number) {
    let preciosArticulos = this.preciosSeleccionados.filter(p => p.IdArticuloNavigation.IdTipoArticulo == idTipoArticulo);
    preciosArticulos.forEach(p => {
      this.porcentajesArticulos.push({IdPrecio: p.Id, Porcentaje: +porcentaje});
    });
  }


  porcentajeArticulo(porcentaje, idArticulo: number) {
    let preciosArticulos = this.preciosSeleccionados.filter(p => p.IdArticulo == idArticulo);
    preciosArticulos.forEach(p => {
      if (!this.porcentajesArticulos.some(pa => pa.IdPrecio == p.Id))
        this.porcentajesArticulos.push({IdPrecio: p.Id, Porcentaje: +porcentaje});
    });
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
      data: {idArticulo: event, },
      width: '800px',
      height: '600px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.articuloService.saveOrUpdateArticuloVario(result).subscribe(
          data => {
            this.recargaPagina = true;
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
}
