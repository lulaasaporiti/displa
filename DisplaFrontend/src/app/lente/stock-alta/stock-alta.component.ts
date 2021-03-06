import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockLente } from 'src/app/model/stockLente';
import { StockLenteService } from 'src/services/stock.lente.service';
import { ValidacionLenteService } from 'src/services/validacion.lente.service';

@Component({
  selector: 'app-stock-alta',
  templateUrl: './stock-alta.component.html',
  styleUrls: ['./stock-alta.component.css']
})
export class StockAltaComponent implements OnInit {
  cargarStock: StockLente[] = [];
  selectedStock = new EventEmitter<StockLente[]>();
  msjCilindrico: boolean[] = [];
  msjLimiteEsferico: boolean[] = [];
  msjLimiteCilindrico: boolean[] = [];
  msjCantidad: boolean[] = [];


  constructor(
    public dialogRef: MatDialogRef<StockAltaComponent>,
    private stockLenteService: StockLenteService,
    public validacionLenteService: ValidacionLenteService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.agregarStock();
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  agregarStock() {
    let item = <StockLente>{};
    item.IdLente = this.data.lente.Id;
    item.IdLenteNavigation = this.data.lente;
    this.cargarStock.push(item);
    this.validacionLenteService.getLimitesGrilla(item.IdLenteNavigation)
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
    this.cargarStock.forEach(cs => {
      let machearStock = this.data.modelStock.find(s => s.MedidaCilindrico == +cs.MedidaCilindrico && s.MedidaEsferico == +cs.MedidaEsferico)
      if (machearStock != null) {
        cs.Id = machearStock.Id;
        cs.Stock = cs.Stock + machearStock.Stock;
      }
    });
    this.stockLenteService.saveOrUpdateStockLente(this.cargarStock)
      .subscribe(re => {
        if (re != null)
          this.dialogRef.close(true);
      });
  }

  _keyPress(event: any) {
    let pattern = /[0-9-]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // Esto es exclusivamente para el caso de que la graduación sea positiva
  __keyPress(event: any) {
    let pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  compararLimiteGrilla(input, index, tipoGraduacion) {
    if (!input.includes('.')) {
      if (tipoGraduacion == 'esferico') {
        this.msjLimiteEsferico[index] = this.validacionLenteService.compararLimiteGrilla(this.cargarStock[index].IdLenteNavigation, this.cargarStock[index].MedidaEsferico, 'esferico')
      }
      else {
        this.msjLimiteCilindrico[index] = this.validacionLenteService.compararLimiteGrilla(this.cargarStock[index].IdLenteNavigation, this.cargarStock[index].MedidaCilindrico, 'cilindrico')
      }
    }
  }

  validarCantidad(index) {
    this.msjCantidad[index] = this.validacionLenteService.divisionCantidad(this.cargarStock[index].Stock, this.cargarStock[index].IdLenteNavigation.Fraccionado)
  }

  cambiarSigno(i) {
    if (this.data.lente.GraduacionesCilindricas == '-' && this.cargarStock[i].MedidaCilindrico != undefined) {
      if (this.cargarStock[i].MedidaCilindrico >= 0) {        
        this.cargarStock[i].MedidaCilindrico = -this.cargarStock[i].MedidaCilindrico;
        this.validacionLenteService.divisionMedida(this.cargarStock[i], this.cargarStock[i].MedidaCilindrico, 'cilindrico');
      }
    }
    else {
      if (this.cargarStock[i].MedidaCilindrico != undefined) {
        // this.cargarStock[i].MedidaCilindrico = +this.cargarStock[i].MedidaCilindrico;
        this.validacionLenteService.divisionMedida(this.cargarStock[i], this.cargarStock[i].MedidaCilindrico, 'cilindrico');
      }
    }
  }

  
}