import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { PrecioServicioCliente } from 'src/app/model/precioServicioCliente';
import { ServicioService } from 'src/services/servicio.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Servicio } from 'src/app/model/servicio';
import { PrecioServicio } from 'src/app/model/precioServicio';
import { ClienteService } from 'src/services/cliente.service';
import { combineLatest } from 'rxjs';
import { TipoServicio } from 'src/app/model/tipoServicio';
import { TipoServicioService } from 'src/services/tipo.servicio.service';


@Component({
  selector: 'app-precio-servicio-cliente-listado',
  templateUrl: './precio-servicio-listado.component.html',
  styleUrls: ['./precio-servicio-listado.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PrecioServicioListadoComponent implements OnInit {

  displayedColumns = ['Nombre'];
  displayedColumnsServicio = ['NombreServicio'];
  columns = [];
  idCliente: number = 0;
  dataSource = new MatTableDataSource<Servicio>();
  dataSourceServicio = new MatTableDataSource<Servicio>();
  dataSourceTipo = new MatTableDataSource<TipoServicio>();
  originalTipo: TipoServicio[] = [];
  // checkboxChecked: boolean[] = [];
  // checkboxIndeterminate: boolean[] = [];
  recargaPagina = false;
  habilitarGuardar = true;
  preciosSeleccionados: PrecioServicioCliente[] = [];
  expandedElement: TipoServicio | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    private router: Router,
    private servicioService: ServicioService,
    private tipoServicioService: TipoServicioService,
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
    this.loadPrecioServicioPage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  cancelar() {
    this.router.navigateByUrl('Cliente/Listado')
  }


  applyFilter(filterValue: string) {
    if (filterValue != "") {
      let tiposServicios: TipoServicio[] = [];
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      var nombreFilter = this.dataSource.data.filter(i => i.Nombre.toLowerCase().includes(filterValue) 
      || i.IdTipoServicio.toString().toLowerCase().includes(filterValue) || i.Id.toString().toLowerCase().includes(filterValue));
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
      this.clienteService.getPreciosServiciosCliente(this.idCliente)
    )
      .subscribe(r => {
        this.dataSource.data = r[0];
        this.dataSourceTipo.data = r[1];
        this.preciosSeleccionados = r[2];
        this.originalTipo = JSON.parse(JSON.stringify(r[1]))
        var maxCantPrecio = 0;
        var index = [];
        this.dataSource.data.forEach(a => {
          if (a.PrecioServicio.length > maxCantPrecio && a.PrecioServicio)
            maxCantPrecio = a.PrecioServicio.length
          if (this.preciosSeleccionados.length > 0) {
            var arrayAux = this.preciosSeleccionados.filter(p => p.IdPrecioServicioNavigation.IdServicio == a.Id);
            if (arrayAux.length > 0) {
              var i = a.PrecioServicio.findIndex(pa => pa.Id == arrayAux[0].IdPrecioServicioNavigation.Id)
              if (!index.includes(i))
                index.push(i);
            }
          } else 
            this.habilitarGuardar = false;
        });

        for (let i = 1; i <= maxCantPrecio; i++) {
          if (this.recargaPagina == false) {
            this.displayedColumns.push('Precio' + i);
            this.displayedColumnsServicio.push('Precio' + i);
            this.columns.push({ columnDef: 'Precio' + i, header: 'PRECIO ' + i, cell: (precio: any) => `${precio}` });
            if (i == maxCantPrecio) {
              this.displayedColumnsServicio.push('PrecioEspecial');
              this.displayedColumns.push('Descuento');
              this.displayedColumnsServicio.push('DescuentoServicio');
            }
          }
        }
        this.loadingSpinnerService.hide();      
      });
  }

  tablaServicios(idTipoServicio, nombreServicio) {
    if(nombreServicio != '') { 
      this.dataSourceServicio.data = this.dataSource.data.filter(ns => ns.IdTipoServicio == idTipoServicio && ns.Nombre.toLowerCase().includes(nombreServicio));
    }
    else 
      this.dataSourceServicio.data = this.dataSource.data.filter(a => a.IdTipoServicio == idTipoServicio);
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
        let precioServicioCliente = <PrecioServicioCliente>{};
        precioServicioCliente.IdPrecioServicioNavigation = <PrecioServicio>{};
        precioServicioCliente.IdCliente = this.idCliente;
        if (e.PrecioServicio[checkbox] != null) {
          let tieneOtro = this.preciosSeleccionados.some(p => p.IdPrecioServicio != e.PrecioServicio[checkbox].Id && p.IdPrecioServicioNavigation.IdServicio == e.Id && p.Especial != true);
          if (tieneOtro) {
            this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.Especial == true)
          }
          precioServicioCliente.IdPrecioServicio = e.PrecioServicio[checkbox].Id;
          precioServicioCliente.IdPrecioServicioNavigation = e.PrecioServicio[checkbox];
          this.preciosSeleccionados.push(precioServicioCliente);
        }
        else {
          let incluye = this.preciosSeleccionados.find(p => p.IdPrecioServicio == e.PrecioServicio[0].Id);
          if (!incluye) {
            mostrarMensaje = true;
            precioServicioCliente.IdPrecioServicio = e.PrecioServicio[0].Id;
            precioServicioCliente.IdPrecioServicioNavigation = e.PrecioServicio[0];
            this.preciosSeleccionados.push(precioServicioCliente);
          }
        }
      });
    } else {
      this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.Especial == true)
    }
    if (event.checked && mostrarMensaje) {
      this.sessionService.showInfo("Existen servicios que no tienen este número de precio, se seleccionará el primero");
    }
    this.habilitarBotonGuardar();
  }

  onClickedTodosTipo(event, idTipoServicio) {
    let checkbox = +event.source.name.split("checkbox")[1];
    let mostrarMensaje = false;
    if (event.checked) {
      let arrayServicios = this.dataSource.data.filter(a => a.IdTipoServicio == idTipoServicio);
      arrayServicios.forEach(a => {
        let precioServicioCliente = <PrecioServicioCliente>{};
        precioServicioCliente.IdPrecioServicioNavigation = <PrecioServicio>{};
        precioServicioCliente.IdCliente = this.idCliente;
        if (a.PrecioServicio[checkbox] != null) {
          let tieneOtro = this.preciosSeleccionados.some(p => p.IdPrecioServicio != a.PrecioServicio[checkbox].Id && p.IdPrecioServicioNavigation.IdServicio == a.Id && p.Especial != true);
          if (tieneOtro) {
            this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.IdPrecioServicioNavigation != undefined && p.IdPrecioServicioNavigation.IdServicioNavigation.IdTipoServicio != idTipoServicio && p.IdPrecioServicio != a.PrecioServicio[checkbox].Id && p.Especial != true)
          }
          precioServicioCliente.IdPrecioServicio = a.PrecioServicio[checkbox].Id;
          precioServicioCliente.IdPrecioServicioNavigation = a.PrecioServicio[checkbox];
          this.preciosSeleccionados.push(precioServicioCliente);
        } else {
          let incluye = this.preciosSeleccionados.find(p => p.IdPrecioServicio == a.PrecioServicio[0].Id);
          if (!incluye) {
            mostrarMensaje = true;
            precioServicioCliente.IdPrecioServicio = a.PrecioServicio[0].Id;
            precioServicioCliente.IdPrecioServicioNavigation = a.PrecioServicio[0];
            this.preciosSeleccionados.push(precioServicioCliente);
          }
        }
      });
    } else {
      this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.IdPrecioServicioNavigation != undefined && p.IdPrecioServicioNavigation.IdServicioNavigation.IdTipoServicio != idTipoServicio && p.Especial != true)
    }
    if (event.checked && mostrarMensaje) {
      this.sessionService.showInfo("Existen artículos que no tienen este número de precio, se seleccionará el primero");
    }
    var index = [];
    this.dataSource.data.forEach(a => {
      if (this.preciosSeleccionados.length > 0) {
        var precio = this.preciosSeleccionados.filter(p => p.IdPrecioServicioNavigation != null && p.IdPrecioServicioNavigation.IdServicio == a.Id);
        if (precio.length > 0) {
          var i = a.PrecioServicio.findIndex(pa => pa.Id == precio[0].IdPrecioServicioNavigation.Id)
          if (!index.includes(i))
            index.push(i);
        }
      }
    });
    this.habilitarBotonGuardar();
  }

  chequear(idPrecio: any) {
    return this.preciosSeleccionados.find(element => element.IdPrecioServicio == idPrecio);
  }

  chequearTipo(event, idTipoServicio: any) {
    let cantidadPreciosTotales = 0;
    let cantidadSeleccionados = 0;
    let arrayTipoServicio = this.dataSource.data.filter(ser => ser.IdTipoServicio == idTipoServicio)
    arrayTipoServicio.forEach(s => {
      if (s.PrecioServicio != null) {      
            cantidadPreciosTotales = cantidadPreciosTotales + 1;
            if (s.PrecioServicio[event] != undefined) { 
            if (this.preciosSeleccionados.some(p => p.IdPrecioServicio == s.PrecioServicio[event].Id && p.IdPrecioServicioNavigation.IdServicio == s.Id && p.Especial != true)) {
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
            if (this.preciosSeleccionados.some(p => p.IdPrecioServicio == s.PrecioServicio[event].Id && p.IdPrecioServicioNavigation.IdServicio == s.Id && p.Especial != true)) {
              cantidadSeleccionados = cantidadSeleccionados + 1;
            }
          }
      }
    });
    return cantidadSeleccionados < cantidadPreciosTotales && cantidadSeleccionados > 0;
  }


  habilitarDescuento(servicio: Servicio) {
    return this.preciosSeleccionados.some(p => servicio.PrecioServicio.some(part => part.Id == p.IdPrecioServicio));
  }

  habilitarDescuentoTipo(idTipoServicio: number) {
    // if (this.preciosSeleccionados.length > 0) {
    let arrayPreciosServicios = this.preciosSeleccionados.filter(element => element.IdPrecioServicioNavigation != null  && element.IdPrecioServicioNavigation.IdServicioNavigation != undefined && element.IdPrecioServicioNavigation.IdServicioNavigation.IdTipoServicio == idTipoServicio);

    let arrayServicios = this.dataSource.data.filter(a => a.IdTipoServicio == idTipoServicio);

    // }
    return arrayPreciosServicios.length >= arrayServicios.length;
  }

  onClicked(servicio: Servicio, checkbox) {
    let index = +checkbox.source.name.split("checkbox")[1];  //indice checkbox de la fila
    let incluye = this.preciosSeleccionados.findIndex(p => p.IdPrecioServicio == servicio.PrecioServicio[index].Id);
    if (incluye == -1) { //si no incluye el precio en los seleccionados, lo agrega
      if (this.preciosSeleccionados.length > 0 &&
        this.preciosSeleccionados.findIndex(p => p.IdPrecioServicioNavigation.IdServicio == servicio.Id && p.IdPrecioServicio != servicio.PrecioServicio[index].Id && p.Especial != true) != -1) {
        //borra el precio que ya estaba seleccionado en la fila (mismo servicio distinto precio)
        this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => p.IdPrecioServicioNavigation.IdServicio == servicio.Id && p.IdPrecioServicio != servicio.PrecioServicio[index].Id), 1);;
      }
      let precioServicioCliente = <PrecioServicioCliente>{};
      precioServicioCliente.IdCliente = this.idCliente;
      precioServicioCliente.IdPrecioServicio = servicio.PrecioServicio[index].Id;
      precioServicioCliente.IdPrecioServicioNavigation = servicio.PrecioServicio[index];
      this.preciosSeleccionados.push(precioServicioCliente);
    } else {
      this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.IdPrecioServicio != servicio.PrecioServicio[index].Id);
    }
    this.habilitarBotonGuardar();
  }

  valorPrecioEspecial(idServicio) {
    let precio = <PrecioServicioCliente>{};
    precio = this.preciosSeleccionados.filter(p => p.IdPrecioServicioNavigation != undefined && p.IdPrecioServicioNavigation.IdServicio == idServicio && p.Especial == true)[0]
    if (precio != null)
      return precio.IdPrecioServicioNavigation.Precio;
    else
      return "";
  }

  valorDescuento(idServicio) {
    let precio = <PrecioServicioCliente>{};
    precio = this.preciosSeleccionados.filter(p => p.IdPrecioServicioNavigation != undefined && p.IdPrecioServicioNavigation.IdServicio == idServicio && p.Descuento != null)[0]
    if (precio != null)
      return precio.Descuento;
    else
      return "";
  }

  valorDescuentoTipo(idTipoServicio) {
    let arrayArticulos = this.dataSource.data.filter(a => a.IdTipoServicio == idTipoServicio);
    let arrayDescuento = this.preciosSeleccionados.filter(p => p.IdPrecioServicioNavigation != undefined && p.IdPrecioServicioNavigation.IdServicioNavigation != undefined && p.IdPrecioServicioNavigation.IdServicioNavigation.IdTipoServicio == idTipoServicio && p.Descuento != null)
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

  precioEspecial(precio, idServicio: number) {
    if (precio != "") {
      let precioEspecial = <PrecioServicioCliente>{};
      let i = this.preciosSeleccionados.findIndex(p => p => p.IdPrecioServicioNavigation != undefined  && p.IdPrecioServicioNavigation.IdServicioNavigation != undefined && p.IdPrecioServicioNavigation.IdServicio == idServicio && p.Especial == true);
      if (i == 0 || i == -1) {
        precioEspecial.Especial = true;
        precioEspecial.IdPrecioServicioNavigation = <PrecioServicio>{};
        precioEspecial.IdPrecioServicioNavigation.Precio = precio;
        precioEspecial.IdPrecioServicioNavigation.IdServicio = idServicio;
        precioEspecial.IdCliente = this.idCliente;
        this.preciosSeleccionados.push(precioEspecial);
      } else {
        precioEspecial = this.preciosSeleccionados[i];
        precioEspecial.IdPrecioServicioNavigation.Precio = precio;
        this.preciosSeleccionados[i] = precioEspecial;
      }
    } else {
      this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p => p.IdPrecioServicioNavigation != undefined && p.IdPrecioServicioNavigation.IdServicio != idServicio);
    }
  }

  descuentoTipoServicio(descuento, idTipoServicio: number) {
    if (descuento != "") {
      let arrayDescuento = this.preciosSeleccionados.filter(p => p.IdPrecioServicioNavigation != undefined  && p.IdPrecioServicioNavigation.IdServicioNavigation != undefined && p.IdPrecioServicioNavigation.IdServicioNavigation.IdTipoServicio == idTipoServicio && p.Especial != true);
      let arrayIndex = [];
      let precioServicio: PrecioServicioCliente;
      arrayDescuento.forEach(i => {
        arrayIndex.push(this.preciosSeleccionados.indexOf(i));
      });
      arrayIndex.forEach(i => {
        this.preciosSeleccionados[i].Descuento = +descuento;
        // console.log(i);
      });
    }
  }

  descuentoServicio(descuento, idServicio: number) {
    let precioServicio = this.preciosSeleccionados.filter(p => p.IdPrecioServicioNavigation != undefined && p.IdPrecioServicioNavigation.IdServicio == idServicio)[0]
    let i = this.preciosSeleccionados.findIndex(p => p.Id == precioServicio.Id);
    precioServicio.Descuento = +descuento;
    this.preciosSeleccionados[i] = precioServicio;
  }

  indeterminateCheckbox(i) {
    let cantidadPreciosTotales = 0;
    let cantidadSeleccionados = 0;
    this.dataSource.data.forEach(s => {
      if (s.PrecioServicio != null) {      
            cantidadPreciosTotales = cantidadPreciosTotales + 1;
            if (s.PrecioServicio[i] != undefined) { 
            if (this.preciosSeleccionados.some(p => p.IdPrecioServicio == s.PrecioServicio[i].Id && p.IdPrecioServicioNavigation.IdServicio == s.Id && p.Especial != true)) {
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
            if (this.preciosSeleccionados.some(p => p.IdPrecioServicio == s.PrecioServicio[i].Id && p.IdPrecioServicioNavigation.IdServicio == s.Id && p.Especial != true)) {
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
    this.dataSource.data.forEach(s => {
      if (s.PrecioServicio != null) {
        if (s.PrecioServicio[0] != undefined) {
          cantidadPreciosTotales = cantidadPreciosTotales + 1;
        }
      }
    });
    this.habilitarGuardar = seleccionadosFiltrados == cantidadPreciosTotales && seleccionadosFiltrados > 0;
  }

  guardarCliente() {
    this.recargaPagina = true;
    this.clienteService.savePreciosServicios(this.preciosSeleccionados).subscribe(result => {
      if (result) {
        this.loadPrecioServicioPage();
        this.sessionService.showSuccess("Los precios se cargaron correctamente.");
      } else
        this.sessionService.showError("Los precios no se cargaron.");
    }
    );
  }
}
