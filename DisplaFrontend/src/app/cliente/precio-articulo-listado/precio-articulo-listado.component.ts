import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { PrecioArticuloCliente } from 'src/app/model/precioArticuloCliente';
import { PrecioArticuloClienteService } from 'src/services/precio.articulo.cliente.service';
import { ArticuloVarioService } from 'src/services/articulo.vario.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ArticuloVario } from 'src/app/model/articuloVario';
import { PrecioArticulo } from 'src/app/model/precioArticulo';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ClienteService } from 'src/services/cliente.service';
import { Observable, combineLatest } from 'rxjs';


@Component({
  selector: 'app-precio-articulo-cliente-listado',
  templateUrl: './precio-articulo-listado.component.html',
  styleUrls: ['./precio-articulo-listado.component.css']
})
export class PrecioArticuloListadoComponent implements OnInit {

  // displayedColumns: string[] = ['Nombre', 'Optica', 'Domicilio', 'Telefonos', 'Mail', 'UtilizaIibb', 'Borrado'];
  displayedColumns = ['Nombre'];
  columns = [];
  idCliente: number = 1;
  dataSource = new MatTableDataSource<ArticuloVario>();
  traerActivos: boolean = true;
  checkboxChecked: boolean[] = [];
  // checkboxIndeterminate: boolean = false;
  checkboxIndeterminate: boolean[] = [];
  // preciosSeleccionados: PrecioArticulo[] = [];
  preciosSeleccionados: PrecioArticuloCliente[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private articuloService: ArticuloVarioService,
    private sessionService: SessionService,
    private clienteService: ClienteService,
    private segment: ActivatedRoute,
    private loadingSpinnerService: LoadingSpinnerService) {
    // this.segment.queryParams.subscribe((params: Params) => {
    // this.idCliente = +params['idCliente']; // (+) converts string 'id' to a number;
    // });
    this.clienteService.getPreciosArticulosCliente(this.idCliente).subscribe(r => {
      console.log(r)
      this.preciosSeleccionados = r;
    })
  }

  ngOnInit() {
    this.searchElement.nativeElement.focus();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadPrecioArticuloPage()
  }

  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadPrecioArticuloPage() {
    this.loadingSpinnerService.show()
    if (this.traerActivos == true) {
      this.articuloService.getArticulosVariosVigentesList()
        .subscribe(r => {
          this.dataSource.data = r;
          console.log(this.dataSource.data)
          var maxCantPrecio = 0;
          this.dataSource.data.forEach(a => {
            if (a.PrecioArticulo.length > maxCantPrecio && a.PrecioArticulo)
              maxCantPrecio = a.PrecioArticulo.length
          });
          for (let i = 1; i <= maxCantPrecio; i++) {
            this.checkboxChecked.push(false)
            this.checkboxIndeterminate.push(false);
            this.displayedColumns.push('Precio' + i);
            this.columns.push({ columnDef: 'Precio' + i, header: 'PRECIO ' + i, cell: (precio: any) => `${precio}` });
            if (i == maxCantPrecio) {
              this.displayedColumns.push('PrecioEspecial');
              this.displayedColumns.push('Descuento');
            }
          }
        });
      this.loadingSpinnerService.hide();
    }
  }

  _keyPress(event: any) {
    const pattern = /[0-9,.]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onClickedTodos(event) {
    // console.log(event.source.name.split("checkbox"))
    let checkbox = +event.source.name.split("checkbox")[1];
    // console.log(checkbox)
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


    this.dataSource.data.forEach(e => {
      // console.log(e)
      if (event.checked) {
        let precioArticuloCliente = <PrecioArticuloCliente>{};
        precioArticuloCliente.IdCliente = this.idCliente;
        if (e.PrecioArticulo[checkbox] != null) {
          let incluye = this.preciosSeleccionados.find(p => p.IdPrecioArticulo == e.PrecioArticulo[checkbox].Id);
          console.log(incluye)
          if (!incluye) {
            precioArticuloCliente.IdPrecioArticulo = e.PrecioArticulo[checkbox].Id;
            this.preciosSeleccionados.push(precioArticuloCliente);
          }
        }
        else {
          this.checkboxIndeterminate[checkbox] = true;
          let incluye = this.preciosSeleccionados.find(p => p.IdPrecioArticulo == e.PrecioArticulo[0].Id);
          if (!incluye) {
            precioArticuloCliente.IdPrecioArticulo = e.PrecioArticulo[0].Id;
            this.preciosSeleccionados.push(precioArticuloCliente);
          }
        }
      }
    });
    if (this.checkboxIndeterminate.includes(true) && event.checked) {
      this.checkboxIndeterminate[0] = true;
      this.sessionService.showInfo("Existen artículos que no tienen este número de precio, se seleccionará el primero");
    }
    console.log(this.preciosSeleccionados)
  }

  chequear(idPrecio: any) {
    return this.preciosSeleccionados.find(element => element.IdPrecioArticulo == idPrecio);
  }

  habilitarDescuento(articulo: ArticuloVario) {
    return this.preciosSeleccionados.some(p => articulo.PrecioArticulo.some(part => part.Id == p.IdPrecioArticulo));
  }

  onClicked(articulo: ArticuloVario, checkbox) {
    let index = +checkbox.source.name.split("checkbox")[1];
    // if (checkbox.checked) {
    let incluye = this.preciosSeleccionados.findIndex(p => p.IdPrecioArticulo == articulo.PrecioArticulo[index].Id);
    if (incluye == -1) {
      let precioArticuloCliente = <PrecioArticuloCliente>{};
      precioArticuloCliente.IdCliente = this.idCliente;
      precioArticuloCliente.IdPrecioArticulo = articulo.PrecioArticulo[index].Id;
      this.preciosSeleccionados.push(precioArticuloCliente);
      // }
    } else {
      this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.IdPrecioArticulo != articulo.PrecioArticulo[index].Id);
    }
    console.log(this.preciosSeleccionados)
  }

  valorPrecioEspecial(idArticulo){
    let precio = <PrecioArticuloCliente>{};
    precio = this.preciosSeleccionados.filter(p => p.IdPrecioArticuloNavigation != undefined && p.IdPrecioArticuloNavigation.IdArticulo == idArticulo && p.Especial == true)[0]
    if (precio != null)
      return precio.IdPrecioArticuloNavigation.Precio;
    else
      return "";
  }

  valorDescuento(idArticulo){
    let precio = <PrecioArticuloCliente>{};
    precio = this.preciosSeleccionados.filter(p => p.IdPrecioArticuloNavigation != undefined && p.IdPrecioArticuloNavigation.IdArticulo == idArticulo && p.Descuento != null)[0]
    if (precio != null)
      return precio.Descuento;
    else
      return "";
  }

  precioEspecial(precio, idArticulo: number) {
    if (precio != "") {
      let precioEspecial = <PrecioArticuloCliente>{};
      let i = this.preciosSeleccionados.findIndex(p => p => p.IdPrecioArticuloNavigation != undefined && p.IdPrecioArticuloNavigation.IdArticulo == idArticulo && p.Especial == true);
      console.log(i)
      if (i == 0) {
        precioEspecial.Especial = true;
        precioEspecial.IdPrecioArticuloNavigation = <PrecioArticulo>{};
        precioEspecial.IdPrecioArticuloNavigation.Precio = precio;
        precioEspecial.IdPrecioArticuloNavigation.IdArticulo = idArticulo;
        precioEspecial.IdCliente = this.idCliente;
        console.log(precioEspecial)
        this.preciosSeleccionados.push(precioEspecial);
      } else {
        precioEspecial = this.preciosSeleccionados[i];
        precioEspecial.IdPrecioArticuloNavigation.Precio = precio;
        this.preciosSeleccionados[i] = precioEspecial;
      }
    } else {
      this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p => p.IdPrecioArticuloNavigation != undefined && p.IdPrecioArticuloNavigation.IdArticulo != idArticulo);
    }
    console.log(this.preciosSeleccionados)
  }


  descuentoArticulo(descuento, idArticulo: number) {
    let index = this.checkboxChecked.indexOf(true);
    let articulo = this.dataSource.data.filter(a => a.Id == idArticulo)[0]
    let precioArticulo: PrecioArticuloCliente;
    precioArticulo.Descuento = descuento;
    let i;
    if (articulo.PrecioArticulo[index] != null) {
      i = this.preciosSeleccionados.findIndex(p => p.IdPrecioArticulo == articulo.PrecioArticulo[index].Id);
      precioArticulo = this.preciosSeleccionados.filter(p => p.IdPrecioArticulo == articulo.PrecioArticulo[index].Id)[0];
    } else {
      i = this.preciosSeleccionados.findIndex(p => p.IdPrecioArticulo == articulo.PrecioArticulo[0].Id);
      precioArticulo = this.preciosSeleccionados.filter(p => p.IdPrecioArticulo == articulo.PrecioArticulo[0].Id)[0];
    }
    console.log(precioArticulo)
    this.preciosSeleccionados[i] = precioArticulo;
    console.log(this.preciosSeleccionados)
  }

  guardarCliente() {
    combineLatest(
      this.clienteService.savePreciosArticulos(this.preciosSeleccionados),
    ).subscribe(r =>
      console.log(r)
    )
  }
}
