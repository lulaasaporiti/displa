import { Component, HostListener, Inject, OnInit, QueryList, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatOptionSelectionChange, MatSelectionListChange, MatSelectChange } from '@angular/material';
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
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-producto-articulo',
  templateUrl: './producto-articulo.component.html',
  styleUrls: ['./producto-articulo.component.css']
})
export class ProductoArticuloComponent implements OnInit {
  articulos: ArticuloVario[] = [];
  tipoArticulos: TipoArticulo[];
  articulosControl = new FormControl();
  tipoArticulosControl = new FormControl();
  filteredArticulos: Observable<ArticuloVario[]>;
  filteredTipoArticulos: Observable<TipoArticulo[]>;
  comprobantesItems: ComprobanteItem[] = [];
  idArticulos: number[] = [];
  modelComprobanteItem = <ComprobanteItem>{};
  modelTipoArticulo = <TipoArticulo>{};
  @ViewChild('ar', { static: true }) ar;

  
  constructor(
    private element: ElementRef,
    public dialogRef: MatDialogRef<ProductoArticuloComponent>,
    private articuloService: ArticuloVarioService,
    private tipoArticuloService: TipoArticuloService,
    private clienteService: ClienteService,
    private sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  ngOnInit() {
    this.tipoArticuloService.getTiposArticuloConArticulosList().subscribe(r => {
      this.tipoArticulos = r;
      // this.modelComprobanteItem.IdArticuloNavigation = <ArticuloVario>{};
      this.filteredTipoArticulos = this.tipoArticulosControl.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filterTipoArticulo(val))
        );
    });
  }

  displayArticulo(a?: ArticuloVario): string | undefined {
    return a ? a.Id + ' - ' + a.Nombre : undefined;
  }

  displayTipoArticulo(t?: TipoArticulo): string | undefined {
    return t ? t.Id + ' - ' + t.Nombre : undefined;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  _keyPress(event: any) {
    const pattern = /[0-9-]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  tabInventado(event: KeyboardEvent, idElement) {
    if (event.code == "Enter") {
      event.preventDefault();
      // event.stopImmediatePropagation();
      if (idElement == 'cantidad0') {
        this.ar.close();
        this.traerPrecio();
      }
      if (idElement.startsWith("cantidad")){
        if (+idElement.split("cantidad")[1] == this.comprobantesItems.length)
          idElement = 'seleccionar';
      }
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
    this.articuloService.getArticulosVariosVigentesList()
      .subscribe(ar => {
        this.articulos = ar;
        this.articulos = this.articulos.filter(arti => arti.IdTipoArticulo == event.source.value.Id)
      })
  }

  articulosSeleccionados(event: MatOptionSelectionChange) {
    if (event.source.selected == true) {
      let comprobanteItem = <ComprobanteItem>{}
      comprobanteItem.IdArticulo = event.source.value.Id;
      comprobanteItem.IdArticuloNavigation = event.source.value;
      comprobanteItem.Descripcion = event.source.value.Nombre;
      comprobanteItem.NumeroSobre = this.modelComprobanteItem.NumeroSobre;
      this.comprobantesItems.push(comprobanteItem);
      this.idArticulos.push(event.source.value.Id);
    }
    else {
      let i = this.comprobantesItems.findIndex(ci => ci.IdArticulo == event.source.value.Id);
      this.comprobantesItems.splice(i, 1);
      this.idArticulos.splice(i, 1);
    }
  }

  traerPrecio() {
    let mostrarMensaje = false;
    this.clienteService.getPrecioArticuloFactura(this.data.idCliente, this.idArticulos)
      .subscribe(result => {
        console.log(result)
        this.comprobantesItems.forEach(c => { 
          c.Monto = result[c.IdArticulo];
          if (result[c.IdArticulo] == null)
            mostrarMensaje = true;
          c.Cantidad = 1;
        // this.modelComprobanteItem.Cantidad = 1;
        // this.modelComprobanteItem.Monto = result;
      });
      if (mostrarMensaje) {
        this.sessionService.showInfo("No existe precio seleccionado para algún artículo.");
      }
      });
      console.log(this.comprobantesItems);
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