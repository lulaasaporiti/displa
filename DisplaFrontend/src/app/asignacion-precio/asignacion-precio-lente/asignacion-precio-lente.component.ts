import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { LenteService } from 'src/services/lente.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { PrecioLente } from 'src/app/model/precioLente';
import { ClienteService } from 'src/services/cliente.service';


@Component({
  selector: 'app-asignacion-precio-lente',
  templateUrl: './asignacion-precio-lente.component.html',
  styleUrls: ['./asignacion-precio-lente.component.css']
})
export class AsignacionPrecioClienteLenteComponent implements OnInit {

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
    private lenteService: LenteService,
    private clienteService: ClienteService,
    private sessionService: SessionService,
    private loadingSpinnerService: LoadingSpinnerService) {
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

  cambiarListado() {
    this.traerActivos = !this.traerActivos;
    this.loadPrecioLentePage();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadPrecioLentePage() {
    this.loadingSpinnerService.show()
    combineLatest(
      this.lenteService.getLentesVigentesAgrupadosList(),
      (this.traerActivos == true) ? this.clienteService.getClientesActivosList() : this.clienteService.getClientesList(),
    )
      .subscribe(result => {
        this.dataSource.data = result[1];
        var maxCantPrecio = 0;
        var index = [];
        this.preciosSeleccionados = [];

        result[0].forEach(a => {
          a.PrecioLente.forEach(pl => {
            if (pl.Precio && pl.Precio.length > maxCantPrecio)
              maxCantPrecio = pl.Precio.length

            if (this.preciosSeleccionados.length > 0) {
              var arrayAux = this.preciosSeleccionados.filter(p => p.IdLente == a.Id);
              if (arrayAux.length > 0) {
                var i = a.PrecioLente.findIndex(pa => pa.Id == arrayAux[0].Id)
                if (!index.includes(i))
                  index.push(i);
              }
            }
          });
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
            // if (i == maxCantPrecio) {
              // this.displayedColumns.push('Porcentaje');
            // }
          }
        }

      });
    this.loadingSpinnerService.hide();
  }

  onClickedTodos(checkbox) {
    let index = +checkbox.source.name.split("checkbox")[1];
    if (checkbox.checked) {
      this.dataSource.data.forEach(cliente => {
        this.preciosSeleccionados.push({IdCliente: cliente.Id, lista: index})
      });
    } else {
      if (this.preciosSeleccionados.length == this.dataSource.data.length) {
        this.preciosSeleccionados = [];
      } else {
        this.dataSource.data.forEach(cliente => {
            // this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => pl.Precio[checkbox] != undefined && pl.Precio[checkbox].Id == p.Id && l.Id == p.IdLente), 1);
        });
      }
    }
    if (this.checkboxIndeterminate.includes(true) && checkbox.checked) {
      this.checkboxIndeterminate[0] = true;
      this.sessionService.showInfo("Existen lentes que no tienen este número de precio, se seleccionará el primero");
    }
    console.log(this.preciosSeleccionados)
  }

  onClicked(idCliente, checkbox) {
    let index = +checkbox.source.name.split("checkbox")[1];  //indice checkbox de la fila
    if (checkbox.checked) {
      this.preciosSeleccionados.push({IdCliente: idCliente, lista: index})
    } else {
      // if (this.preciosSeleccionados.length > 0) {
      //   lente.PrecioLente.forEach(pl => {
      //     this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => p.IdLente == lente.Id && p.Id == pl.Precio[index].Id), 1);
      //   })
      // }
    }
    console.log(this.preciosSeleccionados)
  }

  
  chequear(idCliente: any, index) {
    return this.preciosSeleccionados.find(element => element.Id == idCliente);
  }


  guardarPrecios() {
    this.recargaPagina = true;
    // this.lenteService.saveActualizacionPrecio(this.porcentajesLentes)
    //   .subscribe(result => {
    //     if (result) {
    //       this.loadPrecioLentePage();
    //       this.sessionService.showSuccess("Los precios se cargaron correctamente.");
    //     } else
    //       this.sessionService.showError("Los precios no se cargaron.");
    //   }
    //   );
  }
}
