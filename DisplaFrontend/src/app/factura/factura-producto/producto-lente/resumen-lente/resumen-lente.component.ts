import { Component, Inject, OnInit, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-resumen-lente',
  templateUrl: './resumen-lente.component.html',
  styleUrls: ['./resumen-lente.component.css']
})
export class ResumenLenteComponent implements OnInit {
  @Input() selectedLente: any[];
  modelLente: any[] = [];



  constructor(
  ) {
  }


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedLente.currentValue.length > 0) {
      // this.modelLente = changes.selectedLente.currentValue;
      console.log(changes.selectedLente.currentValue)
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



}