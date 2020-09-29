import { Component, EventEmitter, OnInit } from '@angular/core';
import { StockLente } from 'src/app/model/stockLente';
import { StockLenteService } from 'src/services/stock.lente.service';
import { LimiteGrilla } from 'src/app/model/limiteGrilla';
import { Lente } from 'src/app/model/lente';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { LenteService } from 'src/services/lente.service';
import { startWith, map } from 'rxjs/operators';
import { LimitesGrillaService } from 'src/services/limites.grilla.service';


@Component({
  selector: 'app-manejo-stock-alta',
  templateUrl: './manejo-stock-alta.component.html',
  styleUrls: ['./manejo-stock-alta.component.css']
})
export class ManejoStockAltaComponent implements OnInit {
  cargarStock: StockLente[] = [];
  selectedStock = new EventEmitter<StockLente[]>();
  msjCilindrico: boolean[] = [];
  msjLimiteEsferico: boolean[] = [];
  msjLimiteCilindrico: boolean[] = [];
  lentes: Lente[] = [];
  lentesControl = new FormControl();
  filteredLentes: Observable<Lente[]>;

  limiteGrillaDerecha = <LimiteGrilla>{};
  limiteGrillaIzquierda = <LimiteGrilla>{};x

  constructor(
    private lenteService: LenteService,
    private stockLenteService: StockLenteService,
    private limitesGrillaService: LimitesGrillaService,
  ) {
    this.agregarStock();
  }

  ngOnInit() {
    this.lenteService.getLentesVigentesList().subscribe(r => {
      this.lentes = r;
      // console.log(this.lentes)
      this.filteredLentes = this.lentesControl.valueChanges
        .pipe(
          startWith(''),
          // map(value => typeof value === 'string' ? value : value.Nombre),
          map(val => this.filterLente(val))

          // map(Nombre => Nombre ? this._filter(Nombre) : this.lentes.slice())
        );
    });
  }

  displayLente(l?: Lente): string | undefined {
    return l ? l.Id + ' - ' + l.Nombre : undefined;
  }

  private _filter(Nombre: string): Lente[] {
    const filterValue = Nombre.toLowerCase();
    return this.lentes.filter(option => option.Nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  setIdLente(event, index) {
    if (event != undefined) {
      let idLimiteIzquierda;
      let idLimiteDerecha;
      this.cargarStock[index].IdLente = event.Id;
      let combinacion = event.Combinacion.split("  / ");
      if (combinacion[0] == '+ +') idLimiteIzquierda = 1;
      else idLimiteIzquierda = 3;
      if (combinacion[1] == '- +') idLimiteDerecha = 2;
      else idLimiteDerecha = 4;
      combineLatest(
        this.limitesGrillaService.getById(idLimiteIzquierda),
        this.limitesGrillaService.getById(idLimiteDerecha)
      ).subscribe(result => {
        this.limiteGrillaIzquierda = result[0];
        this.limiteGrillaDerecha = result[1];
      });
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
        lente.Id.toString().indexOf(s) !== -1);
    } else {
      return [];
    }
  }

  filterLenteOnUp(nombre: any) {
    this.filteredLentes = this.lentesControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filterLente(nombre)));
  }


  agregarStock() {
    let item = <StockLente>{};
    this.cargarStock.push(item);
    this.msjCilindrico.push(false);
    this.msjLimiteEsferico.push(false);
    this.msjLimiteCilindrico.push(false);
    this.filterLenteOnUp('');
    let id = 'lente' + (this.cargarStock.length - 1).toString();
  }


  eliminarUltimoStock() {
    this.cargarStock.pop();
    this.msjCilindrico.pop();
    this.msjLimiteEsferico.pop();
    this.msjLimiteCilindrico.pop();
    this.updateStateStock();
  }

  stockSelected() {
    this.updateStateStock();
  }

  updateStateStock() {
    //Deep clone: crea una instancia nueva para que cambie la referencia en cualquier lado que implementemos este componente
    //y el ngOnChanges() lo detecte
    let nuevoStock = JSON.parse(JSON.stringify(this.cargarStock));
    this.selectedStock.emit(nuevoStock);
  }

  agregarNuevoStock() {
    this.stockLenteService.saveOrUpdateStockLente(this.cargarStock)
      .subscribe(re => {
        // if (re != null)
        // this.dialogRef.close(true);
      });
  }
  //0.25 o 10.00
  //0.5
  //1
  divisionMedida(event, tipoGraduacion) {
    console.log(event)
    console.log(this.cargarStock[event]);
    if (tipoGraduacion == 'esferico') {
      if (this.cargarStock[event].MedidaEsferico != undefined) {
        var lala = +this.cargarStock[event].MedidaEsferico;
        console.log(parseFloat((lala/100).toFixed(2)))
        this.cargarStock[event].MedidaEsferico = parseFloat((lala/100).toFixed(2));
        console.log(this.cargarStock[event].MedidaEsferico)
      } 
    } else {
      if (this.cargarStock[event].MedidaCilindrico != undefined) {
        this.cargarStock[event].MedidaCilindrico = this.cargarStock[event].MedidaCilindrico / 100;
      }
    }
  }

  compararLimiteGrilla(event, tipoGraduacion) {
    console.log(this.cargarStock[event].MedidaEsferico / 100)
    if (tipoGraduacion == 'esferico') {
      if (this.cargarStock[event].MedidaEsferico / 100 <= this.limiteGrillaIzquierda.LimiteSuperiorEsferico && this.cargarStock[event].MedidaEsferico / 100 >= this.limiteGrillaDerecha.LimiteInferiorEsferico) {
        this.msjLimiteEsferico[event] = ((this.cargarStock[event].MedidaEsferico / 100) % 0.25) > 0;
      }
      else {
        this.msjLimiteEsferico[event] = true;
      }
    }
    else {
      if (this.cargarStock[event].MedidaCilindrico / 100 <= this.limiteGrillaDerecha.LimiteSuperiorCilindrico && this.cargarStock[event].MedidaCilindrico / 100 >= this.limiteGrillaDerecha.LimiteInferiorCilindrico) {
        this.msjLimiteCilindrico[event] = ((this.cargarStock[event].MedidaCilindrico / 100) % 0.25) > 0;
      }
      else {
        this.msjLimiteCilindrico[event] = true;
      }
    }
  }

  _keyPress(event: any) {
    const pattern = /[0-9-]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  compararGraduacion(event) {
    console.log(this.cargarStock)
    if (this.cargarStock[event].MedidaCilindrico > 0 && this.cargarStock[event].IdLenteNavigation.GraduacionesCilindricas == '-') {
      this.msjCilindrico[event] = true;
    }
    else {
      if (0 > this.cargarStock[event].MedidaCilindrico && this.cargarStock[event].IdLenteNavigation.GraduacionesCilindricas == '+') {
        this.msjCilindrico[event] = true;
      }
      this.msjCilindrico[event] = false;
    }
  }
}
