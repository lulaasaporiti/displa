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
import { Router } from '@angular/router';
import { Lente } from 'src/app/model/lente';
import { LenteService } from 'src/services/lente.service';
import { ValidacionLenteService } from 'src/services/validacion.lente.service';
import { StockLente } from 'src/app/model/stockLente';


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
  esferico;
  cilindrico;
  libre = "";
  tipoArticulos: TipoArticulo[];
  tipoArticulosControl = new FormControl();
  filteredTipoArticulos: Observable<TipoArticulo[]>;
  mostrarArticulos: boolean = false;
  mostrarLibres: boolean = false;
  mostrarLentes: boolean = false;
  modelTipoArticulo = <TipoArticulo>{};
  modelArticulo = <ArticuloVario>{};
  modelLente = <Lente>{};
  stockLente = <StockLente>{};
  articulos: ArticuloVario[] = [];
  articulosControl = new FormControl();
  filteredArticulos: Observable<ArticuloVario[]>;
  lentes: Lente[];
  lentesControl = new FormControl();
  filteredLentes: Observable<Lente[]>;

  msjLimiteEsferico = false;
  msjLimiteCilindrico = false;

  constructor(
    private router: Router,
    private lenteService: LenteService,
    private articuloService: ArticuloVarioService,
    private tipoArticuloService: TipoArticuloService,
    public validacionLenteService: ValidacionLenteService,
    public dialogRef: MatDialogRef<BusquedaItemComprobanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  buscar(): void {
    this.dialogRef.close(true);
    this.router.navigateByUrl('ResultadoBusqueda/Listado?idLente=' + this.idLente + '&idArticulo=' +  this.idArticulo + '&libre=' + this.libre + '&desde=' + this.since.toDateString() + '&hasta=' + this.today.toDateString());
  }

  _keyPress(event: any) {
    const pattern = /[0-9-]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {{}
      event.preventDefault();
    }
  }

  _keyPressCilindrico(event: any) {
    const pattern = /[0-9]/;
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

  displayLente(l?: Lente): string | undefined {
    return l ? l.Id + ' - ' + l.Nombre : undefined;
  }

  setIdLente(control) {
    if (control.value != null) {
      this.modelLente = control.value;
      this.stockLente.IdLenteNavigation = this.modelLente;
      this.stockLente.IdLente = this.modelLente.Id;
      this.validacionLenteService.getLimitesGrilla(this.modelLente)
    }
  }


  filterLente(nombre: any): Lente[] {
    if (nombre.length >= 0) {
      var s: string;
      try {
        s = nombre.toLowerCase();
      }
      catch (ex) {
        s = nombre.nombre.toLowerCase();
      }
      return this.lentes.filter(lente =>
        lente.Id.toString().indexOf(s) !== -1 || lente.Nombre.toLowerCase().indexOf(s.toLowerCase()) !== -1);
    } else {
      return [];
    }
  }

  setIdArticulo(control) {
    if (control.value != null) {
      this.idArticulo = control.value.Id;
    }
  }

  mostrarLibre(){
    this.mostrarLibres = true;
    this.mostrarLentes = false;
    this.mostrarArticulos = false;
  }


  traerArticulos(){
    this.tipoArticuloService.getTiposArticuloConArticulosList().subscribe(r => {
      this.tipoArticulos = r;
      this.filteredTipoArticulos = this.tipoArticulosControl.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filterTipoArticulo(val))
        );
    });
    this.mostrarArticulos = true;
    this.mostrarLentes = false;
    this.mostrarLibres = false;
  }

  traerLentes(){
    this.lenteService.getLentesVigentesList().subscribe(r => {
      this.lentes = r;
      this.filteredLentes = this.lentesControl.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filterLente(val))
        );
    });
    this.mostrarLentes = true;
    this.mostrarArticulos = false;
    this.mostrarLibres = false;
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

  cambiarSigno() {
    if (this.modelLente.GraduacionesCilindricas == '-' && this.stockLente.MedidaCilindrico != undefined) {
      console.log(this.stockLente.MedidaCilindrico)
      // if (this.stockLente.MedidaCilindrico >= 0) {        
      //   this.stockLente.MedidaCilindrico = -this.stockLente.MedidaCilindrico;
      // }
      this.validacionLenteService.divisionMedida(this.stockLente, this.stockLente.MedidaCilindrico, 'cilindrico');
    }
    else {
      if (this.stockLente.MedidaCilindrico != undefined) {
        // this.cargarStock[i].MedidaCilindrico = +this.cargarStock[i].MedidaCilindrico;
        this.validacionLenteService.divisionMedida(this.stockLente, this.stockLente.MedidaCilindrico, 'cilindrico');
      }
    }
  }

  compararLimiteGrilla(input, tipoGraduacion) {
    if (!input.includes('.')) {
      if (tipoGraduacion == 'esferico') {
        this.msjLimiteEsferico = this.validacionLenteService.compararLimiteGrilla(this.modelLente, this.stockLente.MedidaEsferico, 'esferico')
      }
      else {
        this.msjLimiteCilindrico = this.validacionLenteService.compararLimiteGrilla(this.modelLente, this.stockLente.MedidaCilindrico, 'cilindrico')
      }
    }
  }

  convertirMedidas(){
    // if (this.stockLente.MedidaCilindrico != undefined)
      // this.validacionLenteService.divisionMedida(this.stockLente, this.stockLente.MedidaCilindrico, 'cilindrico')
    // if (this.stockLente.MedidaEsferico != undefined)
      // this.validacionLenteService.divisionMedida(this.stockLente, this.stockLente.MedidaEsferico, 'esferico')
    if (this.stockLente.MedidaEsferico != undefined && this.stockLente.MedidaCilindrico != undefined){
      this.libre = this.validacionLenteService.conversionMedidas(this.stockLente.MedidaEsferico, this.stockLente.MedidaCilindrico, this.modelLente);
    }
  }
}