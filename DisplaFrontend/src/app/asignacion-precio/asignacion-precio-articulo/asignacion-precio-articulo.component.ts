import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
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
  checkboxChecked: boolean[] = [];
  checkboxIndeterminate: boolean[] = [];
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
    combineLatest(
      this.articuloService.getArticulosVariosPrecios(),
      (this.traerActivos == true) ? this.clienteService.getClientesActivosList() : this.clienteService.getClientesList(),
      this.clienteService.getListaAsignacionArticulo()
    )
      .subscribe(result => {
        this.dataSource.data = result[1];
        var maxCantPrecio = 0;
        var index = [];
        this.preciosSeleccionados = result[2];
        result[0].forEach(s => {
            if (s.PrecioArticulo.length > maxCantPrecio)
              maxCantPrecio = s.PrecioArticulo.length

            if (this.preciosSeleccionados.length > 0) {
              var arrayAux = this.preciosSeleccionados.filter(p => p.IdArticulo == s.Id);
              if (arrayAux.length > 0) {
                var i = s.PrecioArticulo.findIndex(pa => pa.Id == arrayAux[0].Id)
                if (!index.includes(i))
                  index.push(i);
              }
            }
        });
        for (let i = 1; i <= maxCantPrecio; i++) {
          this.checkboxChecked[i - 1] = false;
          this.checkboxIndeterminate[i - 1] = false;

          if (index.length == 1 && this.preciosSeleccionados.length >= this.dataSource.data.length)
            this.checkboxChecked[index[0]] = true;
          else {
            for (let j = 0; j < index.length; j++) {
              this.checkboxIndeterminate[j] = true;
            }
          }

          if (this.recargaPagina == false) {
            this.displayedColumns.push('Precio' + i);
            this.columns.push({ columnDef: 'Precio' + i, header: 'PRECIO ' + i, cell: (precio: any) => `${precio}` });
          }
        }

      });
    this.loadingSpinnerService.hide();
  }

  onClickedTodos(checkbox) {
    let index = +checkbox.source.name.split("checkbox")[1];
    this.preciosSeleccionados = [];
    for (let i = 0; i < this.checkboxChecked.length; i++) {
      if (i == index && checkbox.checked) {
        this.checkboxChecked[i] = true;
        this.checkboxIndeterminate[i] = false;
      }
      else {
        this.checkboxChecked[i] = false;
        this.checkboxIndeterminate[i] = false;
      }
    }

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
        this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => p.IdCliente == idCliente && p.lista != index), 1);
      this.preciosSeleccionados.push({ IdCliente: idCliente, lista: index })
      if (this.preciosSeleccionados.length == this.dataSource.data.length && !this.checkboxIndeterminate.includes(true))
        this.checkboxChecked[index] = true;
      else {
        if (this.checkboxChecked[index] != true || this.checkboxIndeterminate[index] != true)
          this.checkboxIndeterminate[index] = true;
      }
    } else {
      if (this.preciosSeleccionados.length > 0) {
        this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => p.IdCliente == idCliente && p.lista == index), 1);
      }
    }
  }


  chequear(idCliente: any, index) {
    return this.preciosSeleccionados.find(p => p.IdCliente == idCliente && p.lista == index);
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
