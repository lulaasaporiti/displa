import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
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

  dataSource = new MatTableDataSource<Lente>();
  preciosSeleccionados: PrecioLenteCliente[] = [];
  checkboxChecked: boolean[] = [];
  checkboxIndeterminate: boolean[] = [];
  recargaPagina = false;


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
        console.log(this.dataSource.data)
        var maxCantPrecio = 0;
        this.dataSource.data.forEach(a => {
          if (a.PrecioLente.length > maxCantPrecio && a.PrecioLente)
            maxCantPrecio = a.PrecioLente.length
        });
        for (let i = 1; i <= maxCantPrecio; i++) {
          this.checkboxChecked.push(false)
          this.checkboxIndeterminate.push(false);
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
        let precioLenteCliente = <PrecioLenteCliente>{};
        precioLenteCliente.IdPrecioLenteNavigation = <PrecioLente>{};
        precioLenteCliente.IdCliente = this.idCliente;
        if (e.PrecioLente[checkbox] != null) {
          let tieneOtro = this.preciosSeleccionados.some(p => p.IdPrecioLente != e.PrecioLente[checkbox].Id && p.IdPrecioLenteNavigation.IdLente == e.Id && p.Especial != true);
          if (tieneOtro) {
            this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.Especial == true)
          }
          precioLenteCliente.IdPrecioLente = e.PrecioLente[checkbox].Id;
          precioLenteCliente.IdPrecioLenteNavigation = e.PrecioLente[checkbox];
          this.preciosSeleccionados.push(precioLenteCliente);
        }
        else {
          this.checkboxIndeterminate[checkbox] = true;
          let incluye = this.preciosSeleccionados.find(p => p.IdPrecioLente == e.PrecioLente[0].Id);
          if (!incluye) {
            precioLenteCliente.IdPrecioLente = e.PrecioLente[0].Id;
            precioLenteCliente.IdPrecioLenteNavigation = e.PrecioLente[0];
            this.preciosSeleccionados.push(precioLenteCliente);
          }
        }
      });
    } else {
      this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.Especial == true)
    }
    if (this.checkboxIndeterminate.includes(true) && event.checked) {
      this.checkboxIndeterminate[0] = true;
      this.sessionService.showInfo("Existen lentes que no tienen este número de precio, se seleccionará el primero");
    }
  }

  onClicked(lente: Lente, checkbox) {
    let index = +checkbox.source.name.split("checkbox")[1];  //indice checkbox de la fila
    // if (checkbox.checked) {
    let incluye = this.preciosSeleccionados.findIndex(p => p.IdPrecioLente == lente.PrecioLente[index].Id);
    if (incluye == -1) { //si no incluye el precio en los seleccionados, lo agrega
      if (this.preciosSeleccionados.length > 0 &&
        this.preciosSeleccionados.findIndex(p => p.IdPrecioLenteNavigation.IdLente == lente.Id && p.IdPrecioLente != lente.PrecioLente[index].Id && p.Especial != true) != -1) {
        //borra el precio que ya estaba seleccionado en la fila (mismo lente distinto precio)
        this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => p.IdPrecioLenteNavigation.IdLente == lente.Id && p.IdPrecioLente != lente.PrecioLente[index].Id), 1);;
      }
      let precioLenteCliente = <PrecioLenteCliente>{};
      precioLenteCliente.IdCliente = this.idCliente;
      precioLenteCliente.IdPrecioLente = lente.PrecioLente[index].Id;
      precioLenteCliente.IdPrecioLenteNavigation = lente.PrecioLente[index];
      this.preciosSeleccionados.push(precioLenteCliente);
      // }
    } else {
      this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.IdPrecioLente != lente.PrecioLente[index].Id);
    }
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

  habilitarDescuento(lente: Lente) {
    return this.preciosSeleccionados.some(p => lente.PrecioLente.some(plente => plente.Id == p.IdPrecioLente));
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
    let index = this.checkboxChecked.indexOf(true);
    let lente = this.dataSource.data.filter(a => a.Id == idLente)[0]
    let precioLente: PrecioLenteCliente;
    let i;
    if (lente.PrecioLente[index] != null) {
      i = this.preciosSeleccionados.findIndex(p => p.IdPrecioLente == lente.PrecioLente[index].Id);
      precioLente = this.preciosSeleccionados.filter(p => p.IdPrecioLente == lente.PrecioLente[index].Id)[0];
    } else {
      i = this.preciosSeleccionados.findIndex(p => p.IdPrecioLente == lente.PrecioLente[0].Id);
      precioLente = this.preciosSeleccionados.filter(p => p.IdPrecioLente == lente.PrecioLente[0].Id)[0];
    }
    precioLente.Descuento = descuento;
    this.preciosSeleccionados[i] = precioLente;
  }

  precioEspecial(precio, idLente: number) {
    if (precio != "") {
      let precioEspecial = <PrecioLenteCliente>{};
      let i = this.preciosSeleccionados.findIndex(p => p => p.IdPrecioLenteNavigation != undefined && p.IdPrecioLenteNavigation.IdLente == idLente && p.Especial == true);
      // console.log(i)
      if (i == 0) {
        precioEspecial.Especial = true;
        precioEspecial.IdPrecioLenteNavigation = <PrecioLente>{};
        precioEspecial.IdPrecioLenteNavigation.Precio = precio;
        precioEspecial.IdPrecioLenteNavigation.IdLente = idLente;
        precioEspecial.IdCliente = this.idCliente;
        // console.log(precioEspecial)
        this.preciosSeleccionados.push(precioEspecial);
      } else {
        precioEspecial = this.preciosSeleccionados[i];
        precioEspecial.IdPrecioLenteNavigation.Precio = precio;
        this.preciosSeleccionados[i] = precioEspecial;
      }
    } else {
      this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p => p.IdPrecioLenteNavigation != undefined && p.IdPrecioLenteNavigation.IdLente != idLente);
    }
  }

  guardarCliente() {
    this.recargaPagina = true;
    console.log(this.preciosSeleccionados)
    this.clienteService.savePreciosLentes(this.preciosSeleccionados).subscribe(result => {
      console.log(result)
      if (result) {
        this.loadPrecioLentePage();
        this.sessionService.showSuccess("Los precios se cargaron correctamente.");
      } else
        this.sessionService.showError("Los precios no se cargaron.");
    });
  }
}