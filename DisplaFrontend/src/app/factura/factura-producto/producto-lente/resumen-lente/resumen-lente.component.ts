import { Component, Inject, OnInit, EventEmitter, Input, Output, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-resumen-lente',
  templateUrl: './resumen-lente.component.html',
  styleUrls: ['./resumen-lente.component.css']
})
export class ResumenLenteComponent implements OnInit {
  @Input() selectedLente: any[];
  @Input() selectedRecargo: any[];
  @Input() selectedServicio: any[];

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['Descripcion', 'Precio'];

  modelLente: any[] = [];

  constructor(private changeDetector: ChangeDetectorRef)  { 
  } 

  ngOnInit() {
    this.changeDetector.detectChanges();
   }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedLente != undefined && changes.selectedLente.currentValue.length > 0) {
      this.modelLente = changes.selectedLente.currentValue;
    }
    if (changes.selectedRecargo != undefined && changes.selectedRecargo.currentValue.length > 0) {
      this.dataSource.data =  this.dataSource.data.concat(changes.selectedRecargo.currentValue)
    }
    if (changes.selectedServicio != undefined && changes.selectedServicio.currentValue.length > 0) {
      this.dataSource.data =  this.dataSource.data.concat(changes.selectedServicio.currentValue)
    }
    console.log(this.dataSource.data)
   
  }

  ngAfterViewInit() {

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