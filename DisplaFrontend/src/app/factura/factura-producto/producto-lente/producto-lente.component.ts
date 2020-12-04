import { Component, Inject, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LenteService } from 'src/services/lente.service';
import { ClienteService } from 'src/services/cliente.service';
import { ComprobanteItemServicio } from 'src/app/model/comprobanteItemServicio';
import { ComprobanteItemRecargo } from 'src/app/model/comprobanteItemRecargo';

@Component({
  selector: 'app-producto-lente',
  templateUrl: './producto-lente.component.html',
  styleUrls: ['./producto-lente.component.css']
})
export class ProductoLenteComponent implements OnInit {
  modelComprobanteItemLente: any[] = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  isOptional = true;
  serviciosLente: ComprobanteItemServicio[] = [];
  // selectedServicio = new EventEmitter<any[]>();
  @Output() selectedServicio = new EventEmitter<any[]>();
  constructor(
    public dialogRef: MatDialogRef<ProductoLenteComponent>,
    private lenteService: LenteService,
    private clienteService: ClienteService,
    private _formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.data.item.ComprobanteItemServicio = [];
    // let cargarGraduacion= <ComprobanteItemLente>{};
    // cargarGraduacion.MedidaEsferico = 0;
    // cargarGraduacion.MedidaCilindrico = 0;
    // this.modelComprobanteItemLente.push(cargarGraduacion);
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
    // console.log(this.modelComprobanteItemLente)
    this.changeDetector.detectChanges();
    document.getElementById("siguiente1").focus();
    // console.log(this.firstFormGroup);
    // this.firstFormGroup.setValue();
    // console.log(this.firstFormGroup)
  }

  listaServiciosComprobanteItemEvento(model: ComprobanteItemServicio[]) {
    // console.log(model);
    if (model.length > 0) {
      model.forEach(element => {
        if (!this.serviciosLente.includes(element))
          this.serviciosLente.push(element)
      });
      // console.log(this.serviciosLente)
      this.data.item.ComprobanteItemServicio = this.serviciosLente;
      this.selectedServicio.emit(this.data.item.ComprobanteItemServicio)
    }
    // console.log(this.data.item.ComprobanteItemServicio)
    this.changeDetector.detectChanges();
    document.getElementById("siguiente1").focus();
  }

  listaRecargosComprobanteItemEvento(model: any[]) {
    // this.recargosLente = model;
    this.data.item.ComprobanteItemRecargo = model;
    // console.log(this.modelComprobanteItemLente)
    this.changeDetector.detectChanges();
    document.getElementById("siguiente1").focus();
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