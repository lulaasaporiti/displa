import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { LenteService } from 'src/services/lente.service';
import { LoadingSpinnerService } from 'src/app/loading-spinner/loading-spinner.service';
import { SessionService } from 'src/services/session.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { combineLatest } from 'rxjs';
import { PrecioLente } from 'src/app/model/precioLente';
import { ModificacionPrecioLenteComponent } from '../modificacion-precio-lente/modificacion-precio-lente.component';


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
  porcentajesLentes = [];
  checkedPorcentajeTodos: boolean = false;
  recargaPagina = false;
  habilitarPorcentajeTodos = false;
  habilitarPorcentajeFila = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('search', { static: true }) searchElement: ElementRef;


  constructor(
    public dialog: MatDialog,
    private lenteService: LenteService,
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
    combineLatest([
      this.lenteService.getLentesVigentesAgrupadosList(),
    ])
      .subscribe(r => {
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
    let mostrarMensaje = false;
    let checkbox = +event.source.name.split("checkbox")[1];
    if (event.checked) {
      this.dataSource.data.forEach(lente => {
      this.habilitarPorcentajeTodos = true;
      this.habilitarPorcentajeFila = false;
        if (lente.PrecioLente != null) {
          lente.PrecioLente.forEach(precio => {
            let precioLente = <PrecioLente>{};
            if (precio.Precio[checkbox] != null) {
              if (this.preciosSeleccionados.findIndex(ps => ps.Id == precio.Precio[checkbox].Id) == -1) {
                precioLente.Id = precio.Precio[checkbox].Id;
                precioLente.IdLente = precio.IdLente;
                precioLente.MedidaEsferico = precio.MedidaEsferico;
                precioLente.MedidaCilindrico = precio.MedidaCilindrico;
                this.preciosSeleccionados.push(precioLente);
                var tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;
                if (tienePorcentaje) {
                  this.porcentajeLente(+tienePorcentaje, precioLente.IdLente)
                }
              }
            }
            else {
              let incluye = this.preciosSeleccionados.find(p => precio[0] != undefined && p.Id == precio[0].Id);
              if (incluye) {
                mostrarMensaje = true;
                precioLente.Id = precio[0].Id;
                precioLente.IdLente = precio.IdLente;
                precioLente.MedidaEsferico = precio.MedidaEsferico;
                precioLente.MedidaCilindrico = precio.MedidaCilindrico;
                this.preciosSeleccionados.push(precioLente);
              }
            }
          });
        }
      });
    } else {
      if (this.preciosSeleccionados.length == this.dataSource.data.length) {
        this.habilitarPorcentajeTodos = false;
        this.preciosSeleccionados = [];
      } else {
        this.dataSource.data.forEach(l => {
          l.PrecioLente.forEach(pl => {
            this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => pl.Precio[checkbox] != undefined && pl.Precio[checkbox].Id == p.Id && l.Id == p.IdLente), 1);
            if (this.porcentajesLentes.length > 0)
              this.porcentajesLentes.splice(this.porcentajesLentes.findIndex(p => p.IdPrecio == pl.Precio[checkbox].Id), 1);
          });
        });
      }
    }
    if (mostrarMensaje && event.checked) {
      this.sessionService.showInfo("Existen lentes que no tienen este número de precio, se seleccionará el primero");
    }
    // console.log(this.porcentajesLentes)
    // console.log(this.preciosSeleccionados)
  }

  onClicked(lente, checkbox) {
    let index = +checkbox.source.name.split("checkbox")[1];  //indice checkbox de la fila
    // console.log(index)
    // console.log(lente);
    if (checkbox.checked) {
      lente.PrecioLente.forEach(pl => {
       this.habilitarPorcentajeFila = true;
        let precioLente = <PrecioLente>{};
        precioLente.Id = pl.Precio[index].Id;
        precioLente.IdLente = lente.Id;
        precioLente.MedidaCilindrico = pl.MedidaCilindrico;
        precioLente.MedidaEsferico = pl.MedidaEsferico;
        this.preciosSeleccionados.push(precioLente);
        var tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;
        if (tienePorcentaje) {
          this.porcentajeLente(+tienePorcentaje, precioLente.IdLente)
        }
      })
    } else {
      if (this.preciosSeleccionados.length > 0) {
        lente.PrecioLente.forEach(pl => {
          this.preciosSeleccionados.splice(this.preciosSeleccionados.findIndex(p => p.IdLente == lente.Id && p.Id == pl.Precio[index].Id), 1);
          if (this.porcentajesLentes.length > 0)
            this.porcentajesLentes.splice(this.porcentajesLentes.findIndex(p => p.IdPrecio == pl.Precio[index].Id), 1);
        })
      }
    }
  }

  onClickedPorcentajeTodos(event) {
    var tienePorcentaje = (<HTMLInputElement>document.getElementById("porcentaje")).value;
    if (event.checked == true) {
    this.habilitarPorcentajeTodos = true;
    this.habilitarPorcentajeFila = false;
      this.dataSource.data.forEach(l => {
        l.PrecioLente.forEach(pl => {
          pl.Precio.forEach(p => {
            if (this.preciosSeleccionados.findIndex(ps => ps.Id == p.Id) == -1) {
              let precioLente = <PrecioLente>{};
              precioLente.Id = p.Id;
              precioLente.IdLente = pl.IdLente;
              precioLente.IdLenteNavigation = pl.IdLenteNavigation;
              precioLente.MedidaEsferico = pl.MedidaEsferico;
              precioLente.MedidaCilindrico = pl.MedidaCilindrico
              this.preciosSeleccionados.push(precioLente);
            }
          })
        });
        if (tienePorcentaje) {
          this.porcentajeLente(+tienePorcentaje, l.Id)
        }
      })
    }
    else {
      this.habilitarPorcentajeFila = false;
      this.habilitarPorcentajeTodos = false;
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

  habilitarPorcentaje(lente: any) {
    if(this.habilitarPorcentajeFila == false) {
      return false
    }
    else{ 
      return this.preciosSeleccionados.some(pls => lente.PrecioLente.some(plente => plente.Precio.some(p => p.Id == pls.Id)));
    }
  }

  porcentajeLente(porcentaje, idLente: number) {
    let preciosLentes = this.preciosSeleccionados.filter(p => p.IdLente == idLente);
    preciosLentes.forEach(p => {
      if (!this.porcentajesLentes.some(pa => pa.IdPrecio == p.Id))
        this.porcentajesLentes.push({ IdPrecio: p.Id, Porcentaje: +porcentaje });
    });
  }

  indeterminateCheckbox(i) {
    let cantidadPreciosTotales = 0;
    let cantidadSeleccionados = 0;
    this.dataSource.data.forEach(l => {
      if (l.PrecioLente != null) {
        l.PrecioLente.forEach(pl => {
          if (pl.Precio[i] != undefined) {
            cantidadPreciosTotales = cantidadPreciosTotales + 1;
            if (this.preciosSeleccionados.some(p => p.Id == pl.Precio[i].Id && p.IdLente == pl.IdLente && p.MedidaEsferico == pl.MedidaEsferico
              && p.MedidaCilindrico == pl.MedidaCilindrico)) {
              cantidadSeleccionados = cantidadSeleccionados + 1;
            }
          }
        })
      }
    });
    return cantidadSeleccionados < cantidadPreciosTotales && cantidadSeleccionados > 0;
  }

  checkedCheckbox(i) {
    let cantidadPreciosTotales = 0;
    let cantidadSeleccionados = 0;
    this.dataSource.data.forEach(l => {
      if (l.PrecioLente != null) {
        l.PrecioLente.forEach(pl => {
          if (pl.Precio[i] != undefined) {
          cantidadPreciosTotales = cantidadPreciosTotales + 1;
            if (this.preciosSeleccionados.some(p => p.Id == pl.Precio[i].Id && p.IdLente == pl.IdLente && p.MedidaEsferico == pl.MedidaEsferico
              && p.MedidaCilindrico == pl.MedidaCilindrico)) {
              cantidadSeleccionados = cantidadSeleccionados + 1;
            }
          }
        });
      }
    });
    return cantidadSeleccionados == cantidadPreciosTotales && cantidadSeleccionados > 0;
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

  modificacionPrecioLente(event): void {
    const dialogRef = this.dialog.open(ModificacionPrecioLenteComponent, {
      data: {idLente: event, },
      width: '800px',
      height: '600px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != false) {
        this.lenteService.saveOrUpdateLente(result).subscribe(
          data => {
            this.recargaPagina = true;
            this.loadPrecioLentePage();
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
