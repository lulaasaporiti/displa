import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StockLente } from 'src/app/model/stockLente';
import { StockLenteService } from 'src/services/stock.lente.service';

@Component({
  selector: 'app-stock-alta',
  templateUrl: './stock-alta.component.html',
  styleUrls: ['./stock-alta.component.css']
})
export class StockAltaComponent implements OnInit {
  cargarStock: StockLente[] = [];
  selectedStock = new EventEmitter<StockLente[]>();
  msjCilindrico: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<StockAltaComponent>,
    private stockLenteService: StockLenteService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
  }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  agregarStock() {
    let item = <StockLente>{};
    item.IdLente = this.data.modelStock[0].IdLente;
    this.cargarStock.push(item);
  }

  eliminarUltimoStock() {
    this.cargarStock.pop();
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
      }
    });
    this.stockLenteService.saveOrUpdateStockLente(this.cargarStock)
      .subscribe(re => {
        if (re != null)
          this.dialogRef.close(true);
      });
  }

  compararGraduacion(event) {
    if (this.cargarStock[event].MedidaCilindrico > 0 && this.data.graduacionCilindrica == '-') {
      this.msjCilindrico = true;
    }
    else {
      if (0 > this.cargarStock[event].MedidaCilindrico && this.data.graduacionCilindrica == '+') {
        this.msjCilindrico = true;
      }
      this.msjCilindrico = false;
    }
  }



}
