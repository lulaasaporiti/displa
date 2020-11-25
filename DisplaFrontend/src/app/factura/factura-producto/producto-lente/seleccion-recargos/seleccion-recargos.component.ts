import { Component, Inject, OnInit, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { RecargoLente } from 'src/app/model/recargoLente';
import { LenteService } from 'src/services/lente.service';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-seleccion-recargos',
  templateUrl: './seleccion-recargos.component.html',
  styleUrls: ['./seleccion-recargos.component.css']
})
export class SeleccionRecargosComponent implements OnInit {
  @Input() selectedLente: any[];
  dataSource = new MatTableDataSource<RecargoLente>();
  displayedColumns: string[] = ['Descripcion', 'Porcentaje', 'Seleccionar'];
  modelLente: any[] = [];
  recargosSeleccionados: RecargoLente[];
  


  constructor(
    private lenteService: LenteService,
    private sessionService: SessionService,
    ) {
  }


  ngOnInit() {
    this.recargosSeleccionados = [];
  }

  ngOnChanges(changes: SimpleChanges) {
      if (changes.selectedLente.currentValue.length > 0) {
        this.modelLente = changes.selectedLente.currentValue;
        this.lenteService.getRecargoLente(changes.selectedLente.currentValue[0].IdLente)
          .subscribe(r => {
            this.dataSource.data = r;
          })
      }
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

  deshabilitarCheck(option){
    let optionEsta = this.recargosSeleccionados.includes(option);
      if (this.recargosSeleccionados.length == 2) {
        if (optionEsta){
          return false;
        }
        else {
          return true;
        }
        // this.sessionService.showWarning("No se pueden seleccionar más recargos para esta lente");
    }

  }

  onClicked(option, event) {
    let incluye = this.recargosSeleccionados.includes(option);

    if (!incluye) {
        this.recargosSeleccionados.push(option);
    } else {
        this.recargosSeleccionados = this.recargosSeleccionados.filter(n => n != option);
    }
}


  // traerPrecio(i){
  //   console.log(i)
  //   this.clienteService.getPrecioLenteFactura(this.data.idCliente, this.modelComprobanteItemLente[+i].IdLente, this.modelComprobanteItemLente[+i].Esferico, this.modelComprobanteItemLente[+i].Cilindrico)
  //   .subscribe(result => {
  //     this.mostrarPrecio = true;
  //     this.modelComprobanteItemLente[+i].Precio = result;
  //     this.modelComprobanteItemLente[+i].Cantidad = 1;
  //     if (i == 0)
  //       this.modelComprobanteItemLente[0].Sobre = 0;
  //   })
  // }


}