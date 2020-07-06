import { Component, EventEmitter, OnInit } from '@angular/core';
import { StockLente } from 'src/app/model/stockLente';
import { StockLenteService } from 'src/services/stock.lente.service';
import { LimiteGrilla } from 'src/app/model/limiteGrilla';
import { Lente } from 'src/app/model/lente';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { LenteService } from 'src/services/lente.service';
import { startWith, map } from 'rxjs/operators';


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
  lentes: Lente[];
  lentesControl = new FormControl();
  filteredLentes: Observable<Lente[]>;

  limiteGrillaDerecha = <LimiteGrilla>{};
  limiteGrillaIzquierda = <LimiteGrilla>{};
  
  constructor( 
    private lenteService: LenteService,
    private stockLenteService: StockLenteService
  ) {
    this.agregarStock();
  }

  ngOnInit() {
    this.lenteService.getLentesVigentesList().subscribe(r => {
      this.lentes = r;
      console.log(this.lentes)
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

  etIdLente(control, data) {
    if (control.value != null) data.idLente = control.value.Id;
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
          lente.Nombre.toLowerCase().indexOf(s) !== -1);
  } else {
      return [];
  }
}

  agregarStock() {
    let item = <StockLente>{};
    // item.IdLente = this.modelStock[0].IdLente;
    this.cargarStock.push(item);
    this.msjCilindrico.push(false);
    this.msjLimiteEsferico.push(false);
    this.msjLimiteCilindrico.push(false);
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
    // this.cargarStock.forEach(cs => {
    //   let machearStock = this.modelStock.find(s => s.MedidaCilindrico == +cs.MedidaCilindrico && s.MedidaEsferico == +cs.MedidaEsferico)
    //   if (machearStock != null) {
    //     cs.Id = machearStock.Id;
    //   }
    // });
    this.stockLenteService.saveOrUpdateStockLente(this.cargarStock)
      .subscribe(re => {
        // if (re != null)
          // this.dialogRef.close(true);
      });
  }

  compararLimiteGrilla(event, tipoGraduacion) {
    if (tipoGraduacion == 'esferico') {
      if (this.cargarStock[event].MedidaEsferico <= this.limiteGrillaIzquierda.LimiteSuperiorEsferico && this.cargarStock[event].MedidaEsferico >= this.limiteGrillaDerecha.LimiteInferiorEsferico) {
        if (+event % 0.25 != 0)
          this.msjLimiteEsferico[event] = true;
        else
          this.msjLimiteEsferico[event] = false;
      }
      else {
        this.msjLimiteEsferico[event] = true;
      }
    }
    else {
      if (this.cargarStock[event].MedidaCilindrico <= this.limiteGrillaDerecha.LimiteSuperiorCilindrico && this.cargarStock[event].MedidaCilindrico >= this.limiteGrillaDerecha.LimiteInferiorCilindrico) {
        if (+event % 0.25 != 0)
          this.msjLimiteCilindrico[event] = true;
        else
          this.msjLimiteCilindrico[event] = false;
      }
      else {
        this.msjLimiteCilindrico[event] = true;
      }
    }
  }

  compararGraduacion(event) {
    // if (this.cargarStock[event].MedidaCilindrico > 0 && this.graduacionCilindrica == '-') {
    //   this.msjCilindrico[event] = true;
    // }
    // else {
    //   if (0 > this.cargarStock[event].MedidaCilindrico && this.graduacionCilindrica == '+') {
    //     this.msjCilindrico[event] = true;
    //   }
    //   this.msjCilindrico[event] = false;
    // }
  }

}
