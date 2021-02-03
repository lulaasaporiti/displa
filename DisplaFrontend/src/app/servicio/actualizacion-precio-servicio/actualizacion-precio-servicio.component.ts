import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { combineLatest } from 'rxjs';
import { Servicio } from '../../model/servicio'
import { TipoServicio } from '../../model/tipoServicio';
import { PrecioServicio } from '../../model/precioServicio';
import { ServicioService } from 'src/services/servicio.service';
import { TipoServicioService } from 'src/services/tipo.servicio.service';
import { SessionService } from 'src/services/session.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { ModificacionPrecioServicioComponent } from '../modificacion-precio-servicio/modificacion-precio-servicio.component';


@Component({
  selector: 'app-actualizacion-precio-servicio',
  templateUrl: './actualizacion-precio-servicio.component.html',
  styleUrls: ['./actualizacion-precio-servicio.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ActualizacionPrecioServicioComponent implements OnInit {

  displayedColumns = ['Nombre'];
  displayedColumnsServicio = ['NombreServicio'];
  columns = [];
  dataSource = new MatTableDataSource<Servicio>();
  dataSourceServicio = new MatTableDataSource<Servicio>();
  dataSourceTipo = new MatTableDataSource<TipoServicio>();
  preciosSeleccionados: PrecioServicio[] = [];
  originalTipo: TipoServicio[] = [];
  checkedPorcentajeTodos: boolean = false;
  recargaPagina = false;
  expandedElement: TipoServicio | null;
  porcentajesServicios = [];
  habilitarPorcentajeTodos = false;
  habilitarPorcentajeFila = false;
  habilitarPorcentajeTipoS = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    private servicioService: ServicioService,
    private tipoServicioService: TipoServicioService,
    private dialog: MatDialog,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) {
  }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSourceTipo.paginator = this.paginator;
    this.dataSourceTipo.sort = this.sort;
    this.loadPrecioServicioPage();
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    if (filterValue != "") {
      let tiposServicios: TipoServicio[] = [];
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      var nombreFilter = this.dataSource.data.filter(i => i.Nombre.toLowerCase().includes(filterValue)|| i.IdTipoServicio.toString().toLowerCase().includes(filterValue) 
      || i.Id.toString().toLowerCase().includes(filterValue));
      if (nombreFilter != undefined) {
        nombreFilter.forEach(a => {
          if (tiposServicios.findIndex(t => t.Id == a.IdTipoServicio) == -1)
            tiposServicios.push(a.IdTipoServicioNavigation)
        });
        this.dataSourceTipo.data = tiposServicios;
      }
    } else {
      this.dataSourceTipo.data = this.originalTipo;
    }
  }

  loadPrecioServicioPage() {
    this.loadingSpinnerService.show()
    combineLatest(
      this.servicioService.getServiciosPrecios(),
      this.tipoServicioService.getTiposServicioConServiciosList(),
    )
      .subscribe(r => {
        this.dataSource.data = r[0];
        this.dataSourceTipo.data = r[1];
        this.originalTipo = JSON.parse(JSON.stringify(r[1]));
        this.preciosSeleccionados = [];
        (<HTMLInputElement>document.getElementById("porcentaje")).value = '';

        var maxCantPrecio = 0;
        this.dataSource.data.forEach(a => {
          if (a.PrecioServicio.length > maxCantPrecio && a.PrecioServicio)
            maxCantPrecio = a.PrecioServicio.length
        });

        for (let i = 1; i <= maxCantPrecio; i++) {
          if (this.recargaPagina == false) {
            this.displayedColumns.push('Precio' + i);
            this.displayedColumnsServicio.push('Precio' + i);
            this.columns.push({ columnDef: 'Precio' + i, header: 'PRECIO ' + i, cell: (precio: any) => `${precio}` });
            if (i == maxCantPrecio) {
              this.displayedColumns.push('Porcentaje');
              this.displayedColumnsServicio.push('PorcentajeServicio');
            }
          }
        }
      });
    this.loadingSpinnerService.hide();
  }

  tablaServicios(idTipoServicio, nombreServicio) {
    if(nombreServicio != '') { 
      this.dataSourceServicio.data = this.dataSource.data.filter(na => na.IdTipoServicio == idTipoServicio && na.Nombre.toLowerCase().includes(nombreServicio));
    }
    else 
      this.dataSourceServicio.data = this.dataSource.data.filter(a => a.IdTipoServicio == idTipoServicio);
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
    var tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;
    if (event.checked) {
      this.dataSource.data.forEach(ar => {
        this.habilitarPorcentajeTodos = true;
        let precioServicio = <PrecioServicio>{};
        if (ar.PrecioServicio[checkbox] != null) {
          precioServicio.Id = ar.PrecioServicio[checkbox].Id;
          precioServicio.IdServicio = ar.PrecioServicio[checkbox].IdServicio;
          precioServicio.IdServicioNavigation = ar.PrecioServicio[checkbox].IdServicioNavigation;
          this.preciosSeleccionados.push(precioServicio);
        }
        else {
          let incluye = this.preciosSeleccionados.find(p => p.Id == ar.PrecioServicio[0].Id);
          if (!incluye) {
            mostrarMensaje = true;
            precioServicio.Id = ar.PrecioServicio[0].Id;
            precioServicio.IdServicio = ar.PrecioServicio[0].IdServicio;
            precioServicio.IdServicioNavigation = ar.PrecioServicio[0].IdServicioNavigation;
            this.preciosSeleccionados.push(precioServicio);
          }
        }
        if(tienePorcentaje){
          this.porcentajeServicio(+tienePorcentaje, precioServicio.IdServicio)
        }
      });
    } else {
      if (this.preciosSeleccionados.length == this.dataSource.data.length) {
        this.preciosSeleccionados = [];
        this.porcentajesServicios = [];
        this.habilitarPorcentajeTodos = false;
      } else {
        this.dataSource.data.forEach(ar => {
          this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => ar.PrecioServicio[checkbox] != undefined && ar.PrecioServicio[checkbox].Id == p.Id && ar.Id == p.IdServicio), 1);
          if (this.porcentajesServicios.length > 0)
            this.porcentajesServicios.splice(this.porcentajesServicios.findIndex(p => p.IdPrecio == ar.PrecioServicio[checkbox].Id), 1);
        });
      }
    }
    if (event.checked && mostrarMensaje) {
      this.sessionService.showInfo("Existen artículos que no tienen este número de precio, se seleccionará el primero");
    }
  }

  onClickedPorcentajeTodos(event) {
    var tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;
    if (event.checked == true) {
      this.dataSource.data.forEach(ar => {
        ar.PrecioServicio.forEach(pa => {
        this.habilitarPorcentajeTodos = true;
        this.habilitarPorcentajeFila = false;
        this.habilitarPorcentajeTipoS = false;
        let precioServicio = <PrecioServicio>{};
          precioServicio.Id = pa.Id;
          precioServicio.IdServicio = pa.IdServicio;
          precioServicio.IdServicioNavigation = pa.IdServicioNavigation;
          this.preciosSeleccionados.push(precioServicio);
        }); 
        
        if(tienePorcentaje) {
          this.porcentajeServicio(+tienePorcentaje, ar.Id)
        }   
      })
      
    }
    else {
      this.preciosSeleccionados = [];
      this.porcentajesServicios = [];
      this.habilitarPorcentajeTodos = false;
    }
  }

  recorrerPrecios() {
    var tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;
    if (this.preciosSeleccionados.length > 0 && tienePorcentaje) {
      this.preciosSeleccionados.forEach(pa => {
        if (!this.porcentajesServicios.some(p => p.IdPrecio == pa.Id))
          this.porcentajesServicios.push({IdPrecio: pa.Id, Porcentaje: +tienePorcentaje});
      })
    }
  }

  onClickedTodosTipo(event, idTipoServicio) {
    let checkbox = +event.source.name.split("checkbox")[1];
    let mostrarMensaje = false;
    let tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;
    let arrayServicios = this.dataSource.data.filter(a => a.IdTipoServicio == idTipoServicio);
    if (event.checked) {
      arrayServicios.forEach(a => {
        this.habilitarPorcentajeFila = true;
        this.habilitarPorcentajeTipoS = true;
        let precioServicio = <PrecioServicio>{};
        if (a.PrecioServicio[checkbox] != null) {
          precioServicio.Id = a.PrecioServicio[checkbox].Id;
          precioServicio.IdServicio = a.PrecioServicio[checkbox].IdServicio;
          precioServicio.IdServicioNavigation = a.PrecioServicio[checkbox].IdServicioNavigation;
          this.preciosSeleccionados.push(precioServicio);
        } else {
          let incluye = this.preciosSeleccionados.find(p => p.Id == a.PrecioServicio[0].Id);
          if (!incluye) {
            mostrarMensaje = true;
            precioServicio.Id = a.PrecioServicio[0].Id;
            precioServicio.IdServicio = a.PrecioServicio[0].IdServicio;
            precioServicio.IdServicioNavigation = a.PrecioServicio[0].IdServicioNavigation;
            this.preciosSeleccionados.push(precioServicio);
          }
        }
        if (tienePorcentaje) {
          this.porcentajeServicio(+tienePorcentaje, a.Id)
        }
      });
    } else {
      if (this.preciosSeleccionados.length == this.dataSource.data.length) {
        this.preciosSeleccionados = [];
        this.porcentajesServicios = [];
        this.habilitarPorcentajeTipoS = false;
        this.habilitarPorcentajeFila = false;
      } else {
        arrayServicios.forEach(ser => {
          this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => ser.PrecioServicio[checkbox] != undefined && ser.PrecioServicio[checkbox].Id == p.Id), 1);
          if (this.porcentajesServicios.length > 0)
            this.porcentajesServicios.splice(this.porcentajesServicios.findIndex(p => ser.PrecioServicio[checkbox] != undefined && p.IdPrecio == ser.PrecioServicio[checkbox].Id), 1);
        });
      }
    }
    if (event.checked && mostrarMensaje) {
      this.sessionService.showInfo("Existen artículos que no tienen este número de precio, se seleccionará el primero");
    }
    // var index = [];
    // this.dataSource.data.forEach(a => {
    //   if (this.preciosSeleccionados.length > 0) {
    //     var precio = this.preciosSeleccionados.filter(p => p.IdServicio == a.Id);
    //     if (precio.length > 0) {
    //       var i = a.PrecioServicio.findIndex(pa => pa.Id == precio[0].Id)
    //       if (!index.includes(i))
    //         index.push(i);
    //     }
    //   }
    // });
  }

  chequear(idPrecio: any) {
    return this.preciosSeleccionados.find(element => element.Id == idPrecio);
  }

  chequearTipo(event, idTipoServicio: any) {
    let cantidadPreciosTotales = 0;
    let cantidadSeleccionados = 0;
    let arrayTipoServicio = this.dataSource.data.filter(ser => ser.IdTipoServicio == idTipoServicio)
    arrayTipoServicio.forEach(s => {
      if (s.PrecioServicio != null) {      
            cantidadPreciosTotales = cantidadPreciosTotales + 1;
            if (s.PrecioServicio[event] != undefined) { 
            if (this.preciosSeleccionados.some(p => p.Id == s.PrecioServicio[event].Id && p.IdServicio == s.Id)) {
              cantidadSeleccionados = cantidadSeleccionados + 1;
            }
          }
      }
    });
    return cantidadSeleccionados == cantidadPreciosTotales && cantidadSeleccionados > 0;
  }

  indeterminateTipo(event, idTipoServicio: any) {
    let cantidadPreciosTotales = 0;
    let cantidadSeleccionados = 0;
    let arrayTipoServicio = this.dataSource.data.filter(ser => ser.IdTipoServicio == idTipoServicio)
    arrayTipoServicio.forEach(s => {
      if (s.PrecioServicio != null) {      
            cantidadPreciosTotales = cantidadPreciosTotales + 1;
            if (s.PrecioServicio[event] != undefined) { 
            if (this.preciosSeleccionados.some(p => p.Id == s.PrecioServicio[event].Id && p.IdServicio == s.Id)) {
              cantidadSeleccionados = cantidadSeleccionados + 1;
            }
          }
      }
    });
    return cantidadSeleccionados < cantidadPreciosTotales && cantidadSeleccionados > 0;
  }

  habilitarPorcentaje(servicio: Servicio) {
    if (this.habilitarPorcentajeFila == false){
      return false;
    } 
    else {
      return this.preciosSeleccionados.some(p => servicio.PrecioServicio.some(part => part.Id == p.Id));
    }
  }

  habilitarPorcentajeTipo(idTipoServicio: number) {
    if (this.habilitarPorcentajeTipoS == false) {
      return false;
    }
    else {
      let arrayPreciosServicios = this.preciosSeleccionados.filter(element => element.IdServicioNavigation != undefined && element.IdServicioNavigation.IdTipoServicio == idTipoServicio);
      let arrayServicios = this.dataSource.data.filter(a => a.IdTipoServicio == idTipoServicio);
      return arrayPreciosServicios.length >= arrayServicios.length;
    }
  }

  onClicked(servicio: Servicio, checkbox) {
    let index = +checkbox.source.name.split("checkbox")[1];  //indice checkbox de la fila
    let tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;

    if (checkbox.checked) {
      this.habilitarPorcentajeFila = true;
      let precioServicio = <PrecioServicio>{};
      precioServicio.Id = servicio.PrecioServicio[index].Id;
      precioServicio.IdServicio = servicio.PrecioServicio[index].IdServicio;
      precioServicio.IdServicioNavigation = servicio.PrecioServicio[index].IdServicioNavigation;
      this.preciosSeleccionados.push(precioServicio);
      if (tienePorcentaje) {
        this.porcentajeServicio(+tienePorcentaje, servicio.Id)
      }

    } else {
      // this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => servicio.PrecioServicio[index] != undefined && p.IdServicio == servicio.Id && p.Id != servicio.PrecioServicio[index].Id), 1);
      if (this.porcentajesServicios.length > 0)
        this.porcentajesServicios.splice(this.porcentajesServicios.findIndex(p => servicio.PrecioServicio[index] != undefined && p.IdPrecio == servicio.PrecioServicio[index].Id), 1);
    }
  }

  porcentajeTipoServicio(porcentaje, idTipoServicio: number) {
    let preciosServicios = this.preciosSeleccionados.filter(p => p.IdServicioNavigation.IdTipoServicio == idTipoServicio);
    preciosServicios.forEach(p => {
      this.porcentajesServicios.push({IdPrecio: p.Id, Porcentaje: +porcentaje});
    });
  }


  porcentajeServicio(porcentaje, idServicio: number) {
    let preciosServicios = this.preciosSeleccionados.filter(p => p.IdServicio == idServicio);
    preciosServicios.forEach(p => {
      if (!this.porcentajesServicios.some(pa => pa.IdPrecio == p.Id))
        this.porcentajesServicios.push({IdPrecio: p.Id, Porcentaje: +porcentaje});
    });
  }

  indeterminateCheckbox(i) {
    let cantidadPreciosTotales = 0;
    let cantidadSeleccionados = 0;
    this.dataSource.data.forEach(s => {
      if (s.PrecioServicio != null) {      
            cantidadPreciosTotales = cantidadPreciosTotales + 1;
            if (s.PrecioServicio[i] != undefined) { 
            if (this.preciosSeleccionados.some(p => p.Id == s.PrecioServicio[i].Id && p.IdServicio == s.Id)) {
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
    this.dataSource.data.forEach(s => {
      if (s.PrecioServicio != null) {    
            cantidadPreciosTotales = cantidadPreciosTotales + 1;
            if (s.PrecioServicio[i] != undefined) {  
            if (this.preciosSeleccionados.some(p => p.Id == s.PrecioServicio[i].Id && p.IdServicio == s.Id)) {
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
    this.servicioService.saveActualizacionPrecio(this.porcentajesServicios)
    .subscribe(result => {
      if (result) {
        this.loadPrecioServicioPage();
        this.sessionService.showSuccess("Los precios se cargaron correctamente.");
      } else
        this.sessionService.showError("Los precios no se cargaron.");
    }
    );
  }

  modificacionPrecioServicio(event): void {
    const dialogRef = this.dialog.open(ModificacionPrecioServicioComponent, {
      data: {idServicio: event, },
      width: '800px',
      height: '600px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.recargaPagina = true;
        this.servicioService.saveOrUpdateServicio(result).subscribe(
          data => {
            this.loadPrecioServicioPage();
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
