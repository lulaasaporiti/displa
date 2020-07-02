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
  selector: 'app-precio-servicio-listado-detalle',
  templateUrl: './precio-servicio-listado-detalle.component.html',
  styleUrls: ['./precio-servicio-listado-detalle.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PrecioServicioListadoDetalleComponent implements OnInit {

  disabledCheck = true;
  displayedColumns = ['Nombre'];
  displayedColumnsServicio = ['NombreServicio'];
  columns = [];
  idCliente: number = 0;
  dataSource = new MatTableDataSource<Servicio>();
  dataSourceServicio = new MatTableDataSource<Servicio>();
  dataSourceTipo = new MatTableDataSource<TipoServicio>();
  checkboxChecked: boolean[] = [];
  checkboxIndeterminate: boolean[] = [];
  recargaPagina = false;
  preciosSeleccionados: PrecioServicioCliente[] = [];
  expandedElement: Servicio | null;

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
    this.dataSourceTipo.filter = filterValue.trim().toLowerCase();
  }

  loadPrecioServicioPage() {
    this.loadingSpinnerService.show()
    combineLatest(
      this.servicioService.getServiciosClientes(),
      this.tipoServicioService.getTiposServicioConServiciosList(),
      this.clienteService.getPreciosServiciosCliente(this.idCliente)
    )
      .subscribe(r => {
        this.dataSource.data = r[0];
        this.dataSourceTipo.data = r[1];
        this.preciosSeleccionados = r[2];
        // console.log(this.dataSource.data)
        // console.log(this.dataSourceTipo.data)
        // console.log(this.preciosSeleccionados)
        var maxCantPrecio = 0;
        var index = [];
        this.dataSource.data.forEach(a => {
          if (a.PrecioServicio.length > maxCantPrecio && a.PrecioServicio)
            maxCantPrecio = a.PrecioServicio.length
          if (this.preciosSeleccionados.length > 0) {
            var i = a.PrecioServicio.findIndex(pa => pa.Id == this.preciosSeleccionados.filter(p => p.IdPrecioServicioNavigation.IdServicio == a.Id)[0].IdPrecioServicioNavigation.Id)
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
            this.displayedColumnsServicio.push('Precio' + i);
            this.columns.push({ columnDef: 'Precio' + i, header: 'PRECIO ' + i, cell: (precio: any) => `${precio}` });
            if (i == maxCantPrecio) {
              this.displayedColumnsServicio.push('PrecioEspecial');
              this.displayedColumns.push('Descuento');
              this.displayedColumnsServicio.push('DescuentoServicio');
            }
          }
        }
      });
    this.loadingSpinnerService.hide();
  }

  tablaServicios(idTipoServicio) {
    this.dataSourceServicio.data = this.dataSource.data.filter(a => a.IdTipoServicio == idTipoServicio);
  }

  // onClickedTodos(event) {
  //   let checkbox = +event.source.name.split("checkbox")[1];
  //   for (let i = 0; i < this.checkboxChecked.length; i++) {
  //     if (i == checkbox && event.checked) {
  //       this.checkboxChecked[i] = true;
  //       this.checkboxIndeterminate[i] = false;
  //     }
  //     else {
  //       this.checkboxChecked[i] = false;
  //       this.checkboxIndeterminate[i] = false;
  //     }
  //   }

  //   if (event.checked) {
  //     this.dataSource.data.forEach(e => {
  //       let precioServicioCliente = <PrecioServicioCliente>{};
  //       precioServicioCliente.IdPrecioServicioNavigation = <PrecioServicio>{};
  //       precioServicioCliente.IdCliente = this.idCliente;
  //       if (e.PrecioServicio[checkbox] != null) {
  //         let tieneOtro = this.preciosSeleccionados.some(p => p.IdPrecioServicio != e.PrecioServicio[checkbox].Id && p.IdPrecioServicioNavigation.IdServicio == e.Id && p.Especial != true);
  //         if (tieneOtro) {
  //           this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.Especial == true)
  //         }
  //         precioServicioCliente.IdPrecioServicio = e.PrecioServicio[checkbox].Id;
  //         precioServicioCliente.IdPrecioServicioNavigation = e.PrecioServicio[checkbox];
  //         this.preciosSeleccionados.push(precioServicioCliente);
  //       }
  //       else {
  //         this.checkboxIndeterminate[checkbox] = true;
  //         let incluye = this.preciosSeleccionados.find(p => p.IdPrecioServicio == e.PrecioServicio[0].Id);
  //         if (!incluye) {
  //           precioServicioCliente.IdPrecioServicio = e.PrecioServicio[0].Id;
  //           precioServicioCliente.IdPrecioServicioNavigation = e.PrecioServicio[0];
  //           this.preciosSeleccionados.push(precioServicioCliente);
  //         }
  //       }
  //     });
  //   } else {
  //     this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.Especial == true)
  //   }
  //   if (this.checkboxIndeterminate.includes(true) && event.checked) {
  //     this.checkboxIndeterminate[0] = true;
  //     this.sessionService.showInfo("Existen artículos que no tienen este número de precio, se seleccionará el primero");
  //   }
  // }


  chequear(idPrecio: any) {
    return this.preciosSeleccionados.find(element => element.IdPrecioServicio == idPrecio);
  }

  chequearTipo(event, idTipoServicio: any) {
    let arrayIndex = [];
    if (this.preciosSeleccionados.length > 0) {
      let arrayPreciosServicios = this.preciosSeleccionados.filter(element => element.IdPrecioServicioNavigation != null && element.IdPrecioServicioNavigation.IdServicioNavigation.IdTipoServicio == idTipoServicio);
      let arrayServicios = this.dataSource.data.filter(a => a.IdTipoServicio == idTipoServicio);
      if (arrayPreciosServicios.length >= arrayServicios.length) {
        arrayServicios.forEach(a => {
          var i = a.PrecioServicio.findIndex(pa => pa.Id == this.preciosSeleccionados.filter(p => p.IdPrecioServicioNavigation != undefined && p.IdPrecioServicioNavigation.IdServicio == a.Id)[0].IdPrecioServicioNavigation.Id)
          if (!arrayIndex.includes(i))
            arrayIndex.push(i);
        })
      }
    }
    return arrayIndex.length == 1 && +event == arrayIndex[0];
  }

  indeterminateTipo(event, idTipoServicio: any) {
    let arrayIndex = [];
    let arrayPreciosServicios = this.preciosSeleccionados.filter(element => element.IdPrecioServicioNavigation != null && element.IdPrecioServicioNavigation.IdServicioNavigation.IdTipoServicio == idTipoServicio);
    let arrayServicios = this.dataSource.data.filter(a => a.IdTipoServicio == idTipoServicio);
    if (this.preciosSeleccionados.length > 0) {
      if (arrayPreciosServicios.length == arrayServicios.length) {
        arrayServicios.forEach(a => {
          var i = a.PrecioServicio.findIndex(pa => pa.Id == this.preciosSeleccionados.filter(p => p.IdPrecioServicioNavigation != undefined && p.IdPrecioServicioNavigation.IdServicio == a.Id)[0].IdPrecioServicioNavigation.Id)
          if (!arrayIndex.includes(i))
            arrayIndex.push(i);
        })
      }
    }
    return arrayIndex.length > 1 && arrayIndex.includes(+event);
  }


  // onClicked(servicio: Servicio, checkbox) {
  //   let index = +checkbox.source.name.split("checkbox")[1];  //indice checkbox de la fila
  //   // if (checkbox.checked) {
  //   let incluye = this.preciosSeleccionados.findIndex(p => p.IdPrecioServicio == servicio.PrecioServicio[index].Id);
  //   if (incluye == -1) { //si no incluye el precio en los seleccionados, lo agrega
  //     if (this.preciosSeleccionados.length > 0 &&
  //       this.preciosSeleccionados.findIndex(p => p.IdPrecioServicioNavigation.IdServicio == servicio.Id && p.IdPrecioServicio != servicio.PrecioServicio[index].Id && p.Especial != true) != -1) {
  //       //borra el precio que ya estaba seleccionado en la fila (mismo servicio distinto precio)
  //       this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => p.IdPrecioServicioNavigation.IdServicio == servicio.Id && p.IdPrecioServicio != servicio.PrecioServicio[index].Id), 1);;
  //     }
  //     let precioServicioCliente = <PrecioServicioCliente>{};
  //     precioServicioCliente.IdCliente = this.idCliente;
  //     precioServicioCliente.IdPrecioServicio = servicio.PrecioServicio[index].Id;
  //     precioServicioCliente.IdPrecioServicioNavigation = servicio.PrecioServicio[index];
  //     this.preciosSeleccionados.push(precioServicioCliente);
  //     // }
  //   } else {
  //     this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.IdPrecioServicio != servicio.PrecioServicio[index].Id);
  //   }
  // }

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
    let arrayServicios = this.dataSource.data.filter(a => a.IdTipoServicio == idTipoServicio);
    let arrayDescuento = this.preciosSeleccionados.filter(p => p.IdPrecioServicioNavigation != undefined && p.IdPrecioServicioNavigation.IdServicioNavigation.IdTipoServicio == idTipoServicio && p.Descuento != null)
    if (arrayServicios.length == arrayDescuento.length) {
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


  descuentoTipoServicio(descuento, idTipoServicio: number) {
    let arrayDescuento = this.preciosSeleccionados.filter(p => p.IdPrecioServicioNavigation != undefined && p.IdPrecioServicioNavigation.IdServicioNavigation.IdTipoServicio == idTipoServicio && p.Especial != true);
    let arrayIndex = [];
    let precioServicio: PrecioServicioCliente;
    arrayDescuento.forEach(i => {
      arrayIndex.push(this.preciosSeleccionados.indexOf(i));
    });
    arrayIndex.forEach(i => {
      this.preciosSeleccionados[i].Descuento = descuento;
      // console.log(i);
    });
  }


  descuentoServicio(descuento, idServicio: number) {
    let index = this.checkboxChecked.indexOf(true);
    let servicio = this.dataSource.data.filter(a => a.Id == idServicio)[0]
    let precioServicio: PrecioServicioCliente;
    let i;
    if (servicio.PrecioServicio[index] != null) {
      i = this.preciosSeleccionados.findIndex(p => p.IdPrecioServicio == servicio.PrecioServicio[index].Id);
      precioServicio = this.preciosSeleccionados.filter(p => p.IdPrecioServicio == servicio.PrecioServicio[index].Id)[0];
    } else {
      i = this.preciosSeleccionados.findIndex(p => p.IdPrecioServicio == servicio.PrecioServicio[0].Id);
      precioServicio = this.preciosSeleccionados.filter(p => p.IdPrecioServicio == servicio.PrecioServicio[0].Id)[0];
    }
    precioServicio.Descuento = descuento;
    // console.log(precioServicio)
    this.preciosSeleccionados[i] = precioServicio;
    // console.log(this.preciosSeleccionados)
  }

}