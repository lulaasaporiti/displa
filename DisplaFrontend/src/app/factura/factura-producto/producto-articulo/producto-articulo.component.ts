import { Component, HostListener, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatOptionSelectionChange } from '@angular/material';
import { FormControl, NgControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ArticuloVarioService } from 'src/services/articulo.vario.service';
import { Directive, ElementRef, Input } from '@angular/core';
import { ClienteService } from 'src/services/cliente.service';
import { ArticuloVario } from 'src/app/model/articuloVario';
import { ComprobanteItem } from 'src/app/model/comprobanteItem';
import { TipoArticuloService } from 'src/services/tipo.articulo.service';
import { TipoArticulo } from 'src/app/model/tipoArticulo';

@Component({
  selector: 'app-producto-articulo',
  templateUrl: './producto-articulo.component.html',
  styleUrls: ['./producto-articulo.component.css']
})
export class ProductoArticuloComponent implements OnInit {
  articulos: ArticuloVario[];
  tipoArticulos: TipoArticulo[];
  articulosControl = new FormControl();
  tipoArticulosControl = new FormControl();
  filteredArticulos: Observable<ArticuloVario[]>;
  filteredTipoArticulos: Observable<TipoArticulo[]>;
  modelComprobanteItem = <ComprobanteItem>{};
  modelTipoArticulo = <TipoArticulo>{};

  constructor(
    private element: ElementRef,
    public dialogRef: MatDialogRef<ProductoArticuloComponent>,
    private articuloService: ArticuloVarioService,
    private tipoArticuloService: TipoArticuloService,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  ngOnInit() {
    this.tipoArticuloService.getTiposArticuloConArticulosList().subscribe(r => {
      this.tipoArticulos = r;
      // this.modelComprobanteItem.IdArticuloNavigation = <ArticuloVario>{};
      this.filteredTipoArticulos = this.tipoArticulosControl.valueChanges
        .pipe(
          startWith(''),
          // map(value => typeof value === 'string' ? value : value.Nombre),
          map(val => this.filterTipoArticulo(val))

          // map(Nombre => Nombre ? this._filter(Nombre) : this.articulos.slice())
        );
    });
  }

  displayArticulo(a?: ArticuloVario): string | undefined {
    return a ? a.Id + ' - ' + a.Nombre : undefined;
  }

  displayTipoArticulo(t?: TipoArticulo): string | undefined {
    return t ? t.Id + ' - ' + t.Nombre : undefined;
  }

  // private _filter(Nombre: string): ArticuloVario[] {
  //   const filterValue = Nombre.toLowerCase();
  //   return this.articulos.filter(option => option.Nombre.toLowerCase().indexOf(filterValue) === 0);
  // }

  // private _filter(Nombre: string): TipoArticulo[] {
  //   const filterValue = Nombre.toLowerCase();
  //   return this.tipoArticulos.filter(option => option.Nombre.toLowerCase().indexOf(filterValue) === 0);
  // }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  _keyPress(event: any) {
    const pattern = /[0-9-]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      { }
      event.preventDefault();
    }
  }

  tabInventado(event: KeyboardEvent, idElement) {
    if (event.code == "Enter") {
      event.preventDefault();
      document.getElementById(idElement).focus();
    }
  }

  setIdArticulo(control) {
    if (control.value != null) {
      this.modelComprobanteItem.IdArticulo = control.value.Id;
      this.modelComprobanteItem.IdArticuloNavigation = control.value;
      this.traerPrecio();
    }
  }

  setIdTipoArticulo(control) {
    if (control.value != null) {
      this.modelTipoArticulo.Nombre = control.value;
    }
  }
  tipoArticuloChange(event: MatOptionSelectionChange) {
    console.log(event)
    this.articuloService.getArticulosVariosVigentesList()
    .subscribe(ar => {
      console.log(ar)
    })
    // this.selectCUIT = event.source.value.cuit;
  }

  traerPrecio() {
    this.clienteService.getPrecioArticuloFactura(this.data.idCliente, this.modelComprobanteItem.IdArticulo)
      .subscribe(result => {
        this.modelComprobanteItem.Cantidad = 1;
        this.modelComprobanteItem.Monto = result;
      })
  }

  filterArticulo(nombre: any): ArticuloVario[] {
    if (nombre.length >= 0) {
      var s: string;
      try {
        s = nombre.toLowerCase();
      }
      catch (ex) {
        s = nombre.nombre.toLowerCase();
      }
      return this.articulos.filter(articulo =>
        articulo.Id.toString().indexOf(s) !== -1 || articulo.Nombre.toLowerCase().indexOf(s.toLowerCase()) !== -1);
    } else {
      return [];
    }
  }

  filterTipoArticulo(nombre: any): TipoArticulo[] {
    if (nombre.length >= 0) {
      var s: string;
      try {
        s = nombre.toLowerCase();
      }
      catch (ex) {
        s = nombre.nombre.toLowerCase();
      }
      return this.tipoArticulos.filter(tipo =>
        tipo.Id.toString().indexOf(s) !== -1 || tipo.Nombre.toLowerCase().indexOf(s.toLowerCase()) !== -1);
    } else {
      return [];
    }
  }
}