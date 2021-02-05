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
  @Input() selectedIndex: any[];
  @Input() selectedIndexServicio: any[];


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
    console.log(changes)
    if (changes.selectedLente != undefined && changes.selectedLente.currentValue.length > 0) {
      this.modelLente = changes.selectedLente.currentValue;
    }
    if (changes.selectedRecargo != undefined && changes.selectedRecargo.currentValue != undefined) {
      this.modelRecargo = changes.selectedRecargo.currentValue;
    }
    if (changes.selectedServicio != undefined) {
      this.modelServicio = changes.selectedServicio.currentValue;
      // console.log(this.modelServicio)
    }
    if (changes.selectedIndex != undefined && changes.selectedIndex.currentValue >= 0) {
      this.modelServicio = this.modelServicio.splice(changes.selectedIndex.currentValue, 1);
      console.log("model servicio resumen")
      console.log(this.modelServicio)
    }
    if (changes.selectedIndexServicio != undefined && changes.selectedIndexServicio.currentValue >= 0) {
      this.modelServicio = this.modelServicio.splice(changes.selectedIndexServicio.currentValue, 1);
    }
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