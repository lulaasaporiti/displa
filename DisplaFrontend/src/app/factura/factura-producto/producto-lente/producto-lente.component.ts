import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComprobanteItemServicio } from 'src/app/model/comprobanteItemServicio';
import { ValidacionLenteService } from 'src/services/validacion.lente.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-producto-lente',
  templateUrl: './producto-lente.component.html',
  styleUrls: ['./producto-lente.component.css']
})
export class ProductoLenteComponent implements OnInit {
  modelComprobanteItemLente: any[] = [];
  comprobanteItemRecargos: any[] = [];
  comprobanteItemServicios: any[] = [];
  indiceCalibrado: number = -1;
  idServicio: number;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  isOptional = true;
  serviciosLente: ComprobanteItemServicio[] = [];
  deshabilitarBoton = false;
  // @Output() selectedServicio = new EventEmitter<any[]>();
  constructor(
    public dialogRef: MatDialogRef<ProductoLenteComponent>,
    private _formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private validacionLenteService: ValidacionLenteService,
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
    this.modelComprobanteItemLente = [];
    this.modelComprobanteItemLente = model;
    this.data.item.ComprobanteItemLente = model;
    this.changeDetector.detectChanges();
    this.chequearValidaciones();
    document.getElementById("siguiente1").focus();
  }

  listaServiciosComprobanteItemEvento(model: ComprobanteItemServicio[]) {
    if (model.length > 0) {
      model.forEach(element => {
        if (this.serviciosLente.find(c => c.IdServicio == element.IdServicio) == undefined)
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

  indiceCalibradoSelected(i: number) {
    this.indiceCalibrado = i;
  }

  idServicioSelected(i: number) {
    this.idServicio = i;
  }

  chequearValidaciones() {
    if (this.validacionLenteService.compararLimiteGrilla(this.modelComprobanteItemLente[0].IdLenteNavigation, this.modelComprobanteItemLente[0].MedidaEsferico * 100, 'esferico')
      || this.validacionLenteService.compararLimiteGrilla(this.modelComprobanteItemLente[0].IdLenteNavigation, this.modelComprobanteItemLente[0].MedidaCilindrico, 'cilindrico')
      || this.validacionLenteService.divisionCantidad(this.modelComprobanteItemLente[0].Cantidad, this.modelComprobanteItemLente[0].IdLenteNavigation.Fraccionado)) {
      this.deshabilitarBoton = true;
    }
    else {
      document.getElementById('confirmar').focus();
      this.deshabilitarBoton = false;
    }
    if (this.modelComprobanteItemLente.length > 1) {
      if (this.validacionLenteService.compararLimiteGrilla(this.modelComprobanteItemLente[0].IdLenteNavigation, this.modelComprobanteItemLente[1].MedidaEsferico * 100, 'esferico')
        || this.validacionLenteService.compararLimiteGrilla(this.modelComprobanteItemLente[0].IdLenteNavigation, this.modelComprobanteItemLente[1].MedidaCilindrico, 'cilindrico')
        || this.validacionLenteService.divisionCantidad(this.modelComprobanteItemLente[1].Cantidad, this.modelComprobanteItemLente[0].IdLenteNavigation.Fraccionado)) {
        this.deshabilitarBoton = true;
      }
      else {
        document.getElementById('confirmar').focus();
        this.deshabilitarBoton = false;
      }
    }
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