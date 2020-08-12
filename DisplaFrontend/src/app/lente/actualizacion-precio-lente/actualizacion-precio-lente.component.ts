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
  selector: 'app-actualizacion-precio-lente',
  templateUrl: './actualizacion-precio-lente.component.html',
  styleUrls: ['./actualizacion-precio-lente.component.css']
})
export class ActualizacionPrecioLenteComponent implements OnInit {

  displayedColumns: string[] = ['Nombre'];
  columns = [];
  idCliente: number = 0;

  dataSource = new MatTableDataSource<any>();
  preciosSeleccionados: PrecioLente[] = [];
  checkboxChecked: boolean[] = [];
  checkboxIndeterminate: boolean[] = [];
  porcentajesLentes = [];
  checkedPorcentajeTodos: boolean = false;
  recargaPagina = false;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private lenteService: LenteService,
    private segment: ActivatedRoute,
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


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadPrecioLentePage() {
    this.loadingSpinnerService.show()
    combineLatest(
      this.lenteService.getLentesVigentesAgrupadosList(),
    )
      .subscribe(r => {
        console.log(r)
        this.dataSource.data = r[0];
        var maxCantPrecio = 0;
        var index = [];
        this.preciosSeleccionados = [];
        (<HTMLInputElement>document.getElementById("porcentaje")).value = '';

        this.dataSource.data.forEach(a => {
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
            if (i == maxCantPrecio) {
              this.displayedColumns.push('Porcentaje');
            }
          }
        }

      });
    this.loadingSpinnerService.hide();
  }

  onClickedTodos(event) {
    let checkbox = +event.source.name.split("checkbox")[1];
    if (event.checked) {
      this.dataSource.data.forEach(lente => {
        if (lente.PrecioLente != null) {
          lente.PrecioLente.forEach(precio => {
            let precioLente = <PrecioLente>{};
            if (precio.Precio[checkbox] != null) {
              precioLente.Id = precio.Precio[checkbox].Id;
              precioLente.IdLente = precio.IdLente;
              precioLente.Esferico = precio.Esferico;
              precioLente.Cilindrico = precio.Cilindrico;
              this.preciosSeleccionados.push(precioLente);
              var tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;
              if (tienePorcentaje) {
                this.porcentajeLente(+tienePorcentaje, precioLente.IdLente)
              }
            }
            else {
              this.checkboxIndeterminate[checkbox] = true;
              let incluye = this.preciosSeleccionados.find(p => p.Id == precio[0].Id);
              if (!incluye) {
                precioLente.Id = precio[0].Id;
                precioLente.IdLente = precio.IdLente;
                precioLente.Esferico = precio.Esferico;
                precioLente.Cilindrico = precio.Cilindrico;
                this.preciosSeleccionados.push(precioLente);
              }
            }
          });
        }
      });
    } else {
      if (this.preciosSeleccionados.length == this.dataSource.data.length) {
        this.preciosSeleccionados = [];
      } else {
        this.dataSource.data.forEach(l => {
          l.PrecioLente.forEach(pl => {
            this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => pl.Precio[checkbox] != undefined && pl.Precio[checkbox].Id == p.Id && l.Id == p.IdLente), 1);
          });
        });
      }
    }
    if (this.checkboxIndeterminate.includes(true) && event.checked) {
      this.checkboxIndeterminate[0] = true;
      this.sessionService.showInfo("Existen lentes que no tienen este número de precio, se seleccionará el primero");
    }
  }

  onClicked(lente, checkbox) {
    let index = +checkbox.source.name.split("checkbox")[1];  //indice checkbox de la fila
    console.log(index)
    console.log(lente);
    if (checkbox.checked) {
      // let incluye = this.preciosSeleccionados.findIndex(p => p.Id == lente[index].Id);
      // if (incluye == -1) { //si no incluye el precio en los seleccionados, lo agrega
      lente.PrecioLente.forEach(pl => {
        console.log(pl)
        console.log(pl.Precio[index])
        let precioLente = <PrecioLente>{};
        precioLente.Id = pl.Precio[index].Id;
        precioLente.IdLente = lente.Id;
        precioLente.Cilindrico = pl.Cilindrico;
        precioLente.Esferico = pl.Esferico;
        this.preciosSeleccionados.push(precioLente);
        var tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;
        if (tienePorcentaje) {
          this.porcentajeLente(+tienePorcentaje, precioLente.IdLente)
        }
      })
    } else {
      if (this.preciosSeleccionados.length > 0) {
        //  && this.preciosSeleccionados.findIndex(p => p.IdLente == lente.Id && p.Id != lente[index].Id && p.Especial != true) != -1) {
        lente.PrecioLente.forEach(pl => {
          this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => p.IdLente == lente.Id && p.Id == pl.Precio[index].Id), 1);
          this.porcentajesLentes.splice(this.porcentajesLentes.findIndex(p => p.IdPrecio == pl.Precio[index].Id), 1);
        })
      }
    }
    console.log(this.preciosSeleccionados)
    console.log(this.porcentajesLentes)
  }

  onClickedPorcentajeTodos(event) {
    var tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;
    if (event.checked == true) {
      this.dataSource.data.forEach(l => {
        l.PrecioLente.forEach(pl => {
          pl.Precio.forEach(p => {
            let precioLente = <PrecioLente>{};
            precioLente.Id = p.Id;
            precioLente.IdLente = pl.IdLente;
            precioLente.IdLenteNavigation = pl.IdLenteNavigation;
            precioLente.Esferico = pl.Esferico;
            precioLente.Cilindrico = pl.Cilindrico
            this.preciosSeleccionados.push(precioLente);
          })
        });
        if (tienePorcentaje) {
          this.porcentajeLente(+tienePorcentaje, l.Id)
        }
      })
      for (let i = 0; i < this.checkboxChecked.length; i++) {
        this.checkboxChecked[i] = true;
      }
    }
    else {
      this.preciosSeleccionados = [];
      this.porcentajesLentes = [];
    }
  }

  recorrerPrecios() {
    var tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;
    if (this.preciosSeleccionados.length > 0 && tienePorcentaje) {
      this.preciosSeleccionados.forEach(pl => {
        if (!this.porcentajesLentes.some(p => p.IdPrecio == pl.Id))
          this.porcentajesLentes.push({ IdPrecio: pl.Id, Porcentaje: +tienePorcentaje });
      })
    }
  }

  _keyPress(event: any) {
    const pattern = /[0-9-,.]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  chequear(idPrecio: any) {
    return this.preciosSeleccionados.find(element => element.Id == idPrecio);
  }

  habilitarPorcentaje(lente: Lente) {
    return this.preciosSeleccionados.some(p => lente.PrecioLente.some(part => part.Id == p.Id));
  }

  porcentajeLente(porcentaje, idLente: number) {
    let preciosLentes = this.preciosSeleccionados.filter(p => p.IdLente == idLente);
    preciosLentes.forEach(p => {
      if (!this.porcentajesLentes.some(pa => pa.IdPrecio == p.Id))
        this.porcentajesLentes.push({ IdPrecio: p.Id, Porcentaje: +porcentaje });
    });
  }

  guardarPrecios() {
    this.recargaPagina = true;
    this.checkedPorcentajeTodos = false;
    this.lenteService.saveActualizacionPrecio(this.porcentajesLentes)
      .subscribe(result => {
        if (result) {
          this.loadPrecioLentePage();
          this.sessionService.showSuccess("Los precios se cargaron correctamente.");
        } else
          this.sessionService.showError("Los precios no se cargaron.");
      }
      );
  }
}
