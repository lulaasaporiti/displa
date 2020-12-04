import { Component, Inject, OnInit, EventEmitter, Input, Output, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-resumen-lente',
  templateUrl: './resumen-lente.component.html',
  styleUrls: ['./resumen-lente.component.css']
})
export class ResumenLenteComponent implements OnInit {
  @Input() selectedLente: any[];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['Descripcion'];

  modelLente: any[] = [];

  constructor(private changeDetector: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any)  { 
      // console.log(data)
     } 

  ngOnInit() {
    this.changeDetector.detectChanges();
    // console.log(this.data.item)
   }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedLente != undefined && changes.selectedLente.currentValue.length > 0) {
      this.modelLente = changes.selectedLente.currentValue;
    }
    console.log(changes)
   
    // this.dataSource.data.concat(this.data.item.ComprobanteItemRecargo);
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