import { Component, HostListener, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, NgControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ArticuloVarioService } from 'src/services/articulo.vario.service';
import { Directive, ElementRef, Input } from '@angular/core';
import { ClienteService } from 'src/services/cliente.service';
import { ArticuloVario } from 'src/app/model/articuloVario';
import { ComprobanteItem } from 'src/app/model/comprobanteItem';

@Component({
  selector: 'app-producto-articulo',
  templateUrl: './producto-articulo.component.html',
  styleUrls: ['./producto-articulo.component.css']
})
export class ProductoArticuloComponent implements OnInit {
  articulos: ArticuloVario[];
  articulosControl = new FormControl();
  filteredArticulos: Observable<ArticuloVario[]>;
  modelComprobanteItem = <ComprobanteItem>{};

  constructor(
    private element: ElementRef,
    public dialogRef: MatDialogRef<ProductoArticuloComponent>,
    private articuloService: ArticuloVarioService,
    private clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
  }


  ngOnInit() {
    this.articuloService.getArticulosVariosVigentesList().subscribe(r => {
      this.articulos = r;
      this.filteredArticulos = this.articulosControl.valueChanges
        .pipe(
          startWith(''),
          // map(value => typeof value === 'string' ? value : value.Nombre),
          map(val => this.filterArticulo(val))

          // map(Nombre => Nombre ? this._filter(Nombre) : this.articulos.slice())
        );
    });
  }

  displayArticulo(a?: ArticuloVario): string | undefined {
    return a ? a.Id + ' - ' + a.Nombre : undefined;
  }

  private _filter(Nombre: string): ArticuloVario[] {
    const filterValue = Nombre.toLowerCase();
    return this.articulos.filter(option => option.Nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  _keyPress(event: any) {
    const pattern = /[0-9-]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {{}
      event.preventDefault();
    }
  }

  tabInventado(event: KeyboardEvent, idElement)
  {
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

  traerPrecio(){
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
}