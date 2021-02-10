import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TipoArticulo } from 'src/app/model/tipoArticulo';
import { TipoArticuloService } from 'src/services/tipo.articulo.service';
import { startWith, map } from 'rxjs/operators';
import { MatOptionSelectionChange } from '@angular/material/core';
import { ArticuloVarioService } from 'src/services/articulo.vario.service';
import { ArticuloVario } from 'src/app/model/articuloVario';
import { argv0 } from 'process';
import { ComprobanteClienteService } from 'src/services/comprobanteCliente.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-busqueda-item-comprobante',
  templateUrl: './busqueda-item-comprobante.component.html',
  styleUrls: ['./busqueda-item-comprobante.component.css']
})
export class BusquedaItemComprobanteComponent implements OnInit {
  today = new Date();
  since = new Date();
  idLente = 0;
  idArticulo = 0;
  libre = "";
  tipoArticulos: TipoArticulo[];
  tipoArticulosControl = new FormControl();
  filteredTipoArticulos: Observable<TipoArticulo[]>;
  mostrarArticulos: boolean = false;
  modelTipoArticulo = <TipoArticulo>{};
  modelArticulo = <ArticuloVario>{};
  articulos: ArticuloVario[] = [];
  articulosControl = new FormControl();
  filteredArticulos: Observable<ArticuloVario[]>;

  constructor(
    private router: Router,
    private articuloService: ArticuloVarioService,
    private tipoArticuloService: TipoArticuloService,
    public dialogRef: MatDialogRef<BusquedaItemComprobanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  buscar(): void {
    this.dialogRef.close(true);
    this.router.navigateByUrl('ResultadoBusqueda/Listado?idLente=' + this.idLente + '&idArticulo=' +  this.idArticulo + '&libre=' + this.libre + '&desde=' + this.since + '&hasta=' + this.today);
  }

  _keyPress(event: any) {
    const pattern = /[0-9-]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {{}
      event.preventDefault();
    }
  }

  displayTipoArticulo(t?: TipoArticulo): string | undefined {
    return t ? t.Id + ' - ' + t.Nombre : undefined;
  }

  setIdTipoArticulo(control) {
    if (control.value != null) {
      this.modelTipoArticulo.Nombre = control.value;
    }
  }

  displayArticulo(a?: ArticuloVario): string | undefined {
    return a ? a.Id + ' - ' + a.Nombre : undefined;
  }

  setIdArticulo(control) {
    console.log(control)
    if (control.value != null) {
      this.idArticulo = control.value.Id;
    }
  }

  traerArticulos(){
    this.tipoArticuloService.getTiposArticuloConArticulosList().subscribe(r => {
      this.tipoArticulos = r;
      // this.modelComprobanteItem.IdArticuloNavigation = <ArticuloVario>{};
      this.filteredTipoArticulos = this.tipoArticulosControl.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filterTipoArticulo(val))
        );
    });
    this.mostrarArticulos = true;
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

  tipoArticuloChange(event: MatOptionSelectionChange) {
    this.articuloService.getArticulosVariosVigentesList()
      .subscribe(ar => {
        this.articulos = ar;
        this.articulos = this.articulos.filter(arti => arti.IdTipoArticulo == event.source.value.Id)
        this.filteredArticulos = this.articulosControl.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filterArticulo(val))
        );
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
      return this.articulos.filter(ar =>
        ar.Id.toString().indexOf(s) !== -1 || ar.Nombre.toLowerCase().indexOf(s.toLowerCase()) !== -1);
    } else {
      return [];
    }
  }


  tabInventado(event: KeyboardEvent, idElement)
  {
    if (event.code == "Enter") {
      event.preventDefault();
      document.getElementById(idElement).focus();
    }
  }
}