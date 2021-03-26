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
  msjCantidad: boolean[] = [];

  limiteGrillaDerecha = <LimiteGrilla>{};
  limiteGrillaIzquierda = <LimiteGrilla>{};

  constructor(
    private lenteService: LenteService,
    private stockLenteService: StockLenteService,
    public validacionLenteService: ValidacionLenteService

  ) {
    this.agregarStock();
  }

  ngOnInit() {
    this.lenteService.getLentesVigentesList().subscribe(r => {
      this.lentes = r;
      this.filteredLentes = this.lentesControl.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filterLente(val))
        );
    });
  }

  displayLente(l?: Lente): string | undefined {
    return l ? l.Id + ' - ' + l.Nombre : undefined;
  }

  setIdLente(event, index) {
    if (event != undefined) {
      this.cargarStock[index].IdLente = event.Id;
      this.cargarStock[index].IdLenteNavigation = event;
      this.validacionLenteService.getLimitesGrilla(this.cargarStock[index].IdLenteNavigation)
    }
  }

  onNoClick(): void {
    // this.dialogRef.close(false);
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

  validarCantidad(index) {
    this.msjCantidad[index] = this.validacionLenteService.divisionCantidad(this.cargarStock[index].Stock)
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

  compararLimiteGrilla(index, tipoGraduacion) {
    if (tipoGraduacion == 'esferico') {
      this.msjLimiteEsferico[index] = this.validacionLenteService.compararLimiteGrilla(this.cargarStock[index].IdLenteNavigation, this.cargarStock[index].MedidaEsferico, 'esferico')
    }
    else {
      this.msjLimiteCilindrico[index] = this.validacionLenteService.compararLimiteGrilla(this.cargarStock[index].IdLenteNavigation, this.cargarStock[index].MedidaCilindrico, 'cilindrico')
    }
  }

  cambiarSigno(i) {
    if (this.cargarStock[i].IdLenteNavigation.GraduacionesCilindricas == '-' && this.cargarStock[i].MedidaCilindrico != undefined) {
      if (this.cargarStock[i].MedidaCilindrico >= 0) {        
        this.cargarStock[i].MedidaCilindrico = -this.cargarStock[i].MedidaCilindrico;
        this.validacionLenteService.divisionMedida(this.cargarStock[i], this.cargarStock[i].MedidaCilindrico, 'cilindrico');
      }
    }
    else {
      console.log(this.cargarStock[i].MedidaCilindrico)
      if (this.cargarStock[i].MedidaCilindrico != undefined) {
        // this.cargarStock[i].MedidaCilindrico = +this.cargarStock[i].MedidaCilindrico;
        this.validacionLenteService.divisionMedida(this.cargarStock[i], this.cargarStock[i].MedidaCilindrico, 'cilindrico');
      }
    }
  }
}
