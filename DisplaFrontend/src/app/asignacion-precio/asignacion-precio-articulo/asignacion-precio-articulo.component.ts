import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ArticuloVarioService } from 'src/services/articulo.vario.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { PrecioArticulo } from 'src/app/model/precioArticulo';
import { ClienteService } from 'src/services/cliente.service';


@Component({
  selector: 'app-asignacion-precio-articulo',
  templateUrl: './asignacion-precio-articulo.component.html',
  styleUrls: ['./asignacion-precio-articulo.component.css']
})
export class AsignacionPrecioClienteArticuloComponent implements OnInit {

  displayedColumns: string[] = ['Optica'];
  columns = [];

  dataSource = new MatTableDataSource<any>();
  preciosSeleccionados = []; // [ idCliente: x, indexPrecio: 0 ]
  // checkboxChecked: boolean[] = [];
  recargaPagina = false;
  traerActivos: boolean = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private articuloService: ArticuloVarioService,
    private clienteService: ClienteService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) {
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

  cambiarListado() {
    this.traerActivos = !this.traerActivos;
    this.loadPrecioArticuloPage();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadPrecioArticuloPage() {
    this.loadingSpinnerService.show();
    combineLatest([
      this.articuloService.getArticulosVariosPrecios(),
      (this.traerActivos == true) ? this.clienteService.getClientesActivosList() : this.clienteService.getClientesList(),
      this.clienteService.getListaAsignacionArticulo()
    ])
      .subscribe(result => {
        this.dataSource.data = result[1];
        var maxCantPrecio = 0;
        var index = [];
        this.preciosSeleccionados = result[2];
        console.log(this.preciosSeleccionados)

        result[0].forEach(s => {
          if (s.PrecioArticulo.length > maxCantPrecio)
            maxCantPrecio = s.PrecioArticulo.length
        });

        if (this.preciosSeleccionados.length > 0) {
          this.preciosSeleccionados.forEach(a => {
            var i = a.lista;
            if (!index.includes(i))
              index.push(i);
          });
        }
        for (let i = 1; i <= maxCantPrecio; i++) {
          // this.checkboxChecked[i - 1] = false;
          // if (index.length == 1 && this.preciosSeleccionados.length >= this.dataSource.data.length)
          //   this.checkboxChecked[index[0]] = true;
          if (this.recargaPagina == false) {
            this.displayedColumns.push('Precio' + i);
            this.columns.push({ columnDef: 'Precio' + i, header: 'PRECIO ' + i, cell: (precio: any) => `${precio}` });
          }
        }
        this.loadingSpinnerService.hide();
      });
  }

  onClickedTodos(checkbox) {
    let index = +checkbox.source.name.split("checkbox")[1];
    this.preciosSeleccionados = [];
    // for (let i = 0; i < this.checkboxChecked.length; i++) {
    //   if (i == index && checkbox.checked) {
    //     this.checkboxChecked[i] = true;
    //   }
    //   else {
    //     this.checkboxChecked[i] = false;
    //   }
    // }

    if (checkbox.checked) {
      this.dataSource.data.forEach(cliente => {
        if (this.preciosSeleccionados.find(p => p.IdCliente == cliente.Id && p.lista != index))
          this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => p.IdCliente == cliente.Id && p.lista != index), 1);
        this.preciosSeleccionados.push({ IdCliente: cliente.Id, lista: index })
      });
    }
  }

  onClicked(idCliente, checkbox) {
    let index = +checkbox.source.name.split("checkbox")[1];  //indice checkbox de la fila
    if (checkbox.checked) {
      if (this.preciosSeleccionados.find(p => p.IdCliente == idCliente && p.lista != index))
        // this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => p.IdCliente == idCliente && p.lista != index), 1);
        this.preciosSeleccionados = this.preciosSeleccionados.filter(p => p.IdCliente != idCliente);
      this.preciosSeleccionados.push({ IdCliente: idCliente, lista: index })
      // if (this.preciosSeleccionados.length == this.dataSource.data.length && !this.checkboxChecked.includes(true))
      //   this.checkboxChecked[index] = true;
      // else {
      //   if (this.checkboxChecked[index] != true){
      //     let cambiarValor = this.checkboxChecked.findIndex(p => p.valueOf());
      //     this.checkboxChecked[cambiarValor] = false;
      //   }
      // }
    } else {
      if (this.preciosSeleccionados.length > 0) {
        this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => p.IdCliente == idCliente && p.lista == index), 1);
      }
    }
    console.log(this.preciosSeleccionados)
  }


  chequear(idCliente: any, index) {
    return this.preciosSeleccionados.find(p => p.IdCliente == idCliente && p.lista == index);
  }

  indeterminateCheckbox(i) {
    let cantidadIndice = 0;
    cantidadIndice = this.preciosSeleccionados.filter(p => p.lista == i).length;
    return cantidadIndice < this.dataSource.data.length && cantidadIndice > 0;
  }

  checkedCheckbox(i) {
    let cantidadIndice = 0;
    cantidadIndice = this.preciosSeleccionados.filter(p => p.lista == i).length;
    return cantidadIndice == this.dataSource.data.length && cantidadIndice > 0;
  }

  habilitarGuardar(){
    for (let index = 0; index <= this.dataSource.data.length; index++) {
      if (this.dataSource.data[index] != undefined && this.preciosSeleccionados.filter(p => p.IdCliente == this.dataSource.data[index].Id).length > 1)
        return false;
      else {
        if (index == this.dataSource.data.length)
          return true;
      } 
    }
  }

  cancelar(){
    this.router.navigateByUrl('Home')
  }

  guardarPrecios() {
    this.loadingSpinnerService.show();
    this.recargaPagina = true;
    this.clienteService.asignarPreciosArticulos(this.preciosSeleccionados)
      .subscribe(result => {
        this.loadingSpinnerService.hide();
        if (result > 0) {
          this.loadPrecioArticuloPage();
          this.sessionService.showSuccess("Los precios se cargaron correctamente.");
        }
        else {
          if (result == 0) {
            this.loadPrecioArticuloPage();
            this.sessionService.showWarning("El cliente ya tiene esa lista asignada.");
          }
          else {
            this.loadPrecioArticuloPage();
            this.sessionService.showError("Los precios no se cargaron.");
          }
        }
      }
      );
  }
}
