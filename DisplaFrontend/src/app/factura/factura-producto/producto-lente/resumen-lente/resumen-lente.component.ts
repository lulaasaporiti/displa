import { Component, OnInit, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-resumen-lente',
  templateUrl: './resumen-lente.component.html',
  styleUrls: ['./resumen-lente.component.css']
})
export class ResumenLenteComponent implements OnInit {
  @Input() selectedLente: any[];
  @Input() selectedRecargo: any[];
  @Input() selectedServicio: any[];
  @Input() selectedIndiceCalibrados: any[];
  @Input() selectedIdServicio: any[];


  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['Descripcion', 'Precio'];

  modelLente: any[] = [];
  modelRecargo: any[] = [];
  modelServicio: any[] = [];

  constructor(private changeDetector: ChangeDetectorRef)  { 
  } 

  ngOnInit() {
    this.changeDetector.detectChanges();
   }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.modelServicio)
    if (changes.selectedLente != undefined && changes.selectedLente.currentValue.length > 0) {
      this.modelLente = changes.selectedLente.currentValue;
    }
    if (changes.selectedRecargo != undefined && changes.selectedRecargo.currentValue != undefined) {
      this.modelRecargo = changes.selectedRecargo.currentValue;
    }
    if (changes.selectedServicio != undefined) {
      this.modelServicio = changes.selectedServicio.currentValue;
    }
    if (changes.selectedIndiceCalibrados != undefined && changes.selectedIndiceCalibrados.currentValue >= 0) {
      this.modelServicio.splice(changes.selectedIndiceCalibrados.currentValue, 1);
    }
    if (changes.selectedIdServicio != undefined && changes.selectedIdServicio.currentValue >= 0) {
      // console.log("selectidSERvicio")
      // console.log(changes.selectedIdServicio.currentValue)
      let i = this.modelServicio.findIndex(s => s.IdServicio == changes.selectedIdServicio.currentValue);
      this.modelServicio.splice(i, 1);
      // console.log(i)
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