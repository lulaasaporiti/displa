import { Component, Inject, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComprobanteItemServicio } from 'src/app/model/comprobanteItemServicio';

@Component({
  selector: 'app-producto-lente',
  templateUrl: './producto-lente.component.html',
  styleUrls: ['./producto-lente.component.css']
})
export class ProductoLenteComponent implements OnInit {
  modelComprobanteItemLente: any[] = [];
  comprobanteItemRecargos: any[] = [];
  comprobanteItemServicios: any[] = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  isOptional = true;
  serviciosLente: ComprobanteItemServicio[] = [];
  // @Output() selectedServicio = new EventEmitter<any[]>();
  constructor(
    public dialogRef: MatDialogRef<ProductoLenteComponent>,
    private _formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.data.item.ComprobanteItemServicio = [];
  }


  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ''
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ''
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ''
    });
    this.fourthFormGroup = this._formBuilder.group({
      thirdCtrl: ''
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  listaComprobanteItemEvento(model: any[]) {
    this.modelComprobanteItemLente = model;
    this.data.item.ComprobanteItemLente = model;
    this.changeDetector.detectChanges();
    document.getElementById("siguiente1").focus();
  }

  listaServiciosComprobanteItemEvento(model: ComprobanteItemServicio[]) {
    if (model.length > 0) {
      model.forEach(element => {
        if (!this.serviciosLente.includes(element))
          this.serviciosLente.push(element)
      });
      this.comprobanteItemServicios = model;
      this.data.item.ComprobanteItemServicio = this.serviciosLente;
    }
    this.changeDetector.detectChanges();
  }

  listaRecargosComprobanteItemEvento(model: any[]) {
    this.comprobanteItemRecargos = model;
    this.data.item.ComprobanteItemRecargo = model;
    this.changeDetector.detectChanges();
  }

  tabInventado(event: KeyboardEvent, idElement) {
    if (event.code == "Enter") {
      event.preventDefault();
      document.getElementById(idElement).focus();
      if (idElement == "remove") {
        document.getElementById(idElement).style.backgroundColor = "#e0e0e0";
      }
    }
  }
}