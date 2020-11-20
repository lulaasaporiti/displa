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
import { ValidacionLenteService } from 'src/services/validacion.lente.service';


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
  limiteGrillaIzquierda = <LimiteGrilla>{};

  constructor(
    private lenteService: LenteService,
    private stockLenteService: StockLenteService,
    private validacionLenteService: ValidacionLenteService,
    private limitesGrillaService: LimitesGrillaService

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

  setIdLente(event, index) {
    if (event != undefined) {
      this.cargarStock[index].IdLente = event.Id;
      // let idLimiteIzquierda;
      // let idLimiteDerecha;
      // let combinacion = event.Combinacion.split("  / ");
      // if (combinacion[0] == '+ +') idLimiteIzquierda = 1;
      // else idLimiteIzquierda = 3;
      // if (combinacion[1] == '- +') idLimiteDerecha = 2;
      // else idLimiteDerecha = 4;
      // combineLatest(
      //   this.limitesGrillaService.getById(idLimiteIzquierda),
      //   this.limitesGrillaService.getById(idLimiteDerecha)
      // ).subscribe(result => {
      //   this.limiteGrillaIzquierda = result[0];
      //   this.limiteGrillaDerecha = result[1];
      // });
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

  _keyPress(event: any) {
    const pattern = /[0-9-]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }



  //0.25 o 10.00
  //0.5
  //1
  divisionMedida(event, tipoGraduacion) {
  }

  compararLimiteGrilla(index, tipoGraduacion) {
    if (tipoGraduacion == 'esferico') {
      this.msjLimiteEsferico[index] = this.validacionLenteService.compararLimiteGrilla(this.cargarStock[index], this.cargarStock[index].MedidaEsferico, 'esferico')
    }
    else {
      this.msjLimiteCilindrico[index] = this.validacionLenteService.compararLimiteGrilla(this.cargarStock[index], this.cargarStock[index].MedidaCilindrico, 'cilindrico')
    }
  }
}
