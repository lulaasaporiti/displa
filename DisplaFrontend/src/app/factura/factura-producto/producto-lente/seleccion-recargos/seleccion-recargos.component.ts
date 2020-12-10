import { Component, Inject, OnInit, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ComprobanteItemRecargo } from 'src/app/model/comprobanteItemRecargo';
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
  comprobanteItemRecargos: ComprobanteItemRecargo[] = [];
  @Output() selectedRecargosComprobanteItem = new EventEmitter<any[]>();



  constructor(
    private lenteService: LenteService,
    private sessionService: SessionService
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

    if (!pattern.test(inputChar)) {
      { }
      event.preventDefault();
    }
  }

  tabInventado(event: KeyboardEvent, idElement) {
    if (event.code == "Enter") {
      event.preventDefault();
      document.getElementById(idElement).focus();
    }
  }

  deshabilitarCheck(option) {
    let optionEsta = this.recargosSeleccionados.includes(option);
    if (this.recargosSeleccionados.length == 2) {
      if (optionEsta) {
        return false;
      }
      else {
        return true;
      }
      // this.sessionService.showWarning("No se pueden seleccionar más recargos para esta lente");
    }
  }

  onClicked(option) {
    let incluye = this.recargosSeleccionados.includes(option);
    let comprobanteItemRecargo = <ComprobanteItemRecargo>{};
    comprobanteItemRecargo.IdRecargo = option.Id;
    comprobanteItemRecargo.IdRecargoNavigation = option;
    if (!incluye) {
      this.recargosSeleccionados.push(option);
      this.comprobanteItemRecargos.push(comprobanteItemRecargo);
      this.selectedRecargosComprobanteItem.emit(this.comprobanteItemRecargos);
    } else {
      this.recargosSeleccionados.splice(this.recargosSeleccionados.findIndex(s => s == option), 1);
      this.comprobanteItemRecargos.splice(this.comprobanteItemRecargos.findIndex(cs => cs == comprobanteItemRecargo), 1);
      this.selectedRecargosComprobanteItem.emit(this.comprobanteItemRecargos);
    }
  }
}