import { Component, Inject, OnInit, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Lente } from 'src/app/model/lente';
import { LenteService } from 'src/services/lente.service';
import { LimitesGrillaService } from 'src/services/limites.grilla.service';
import { LimiteGrilla } from 'src/app/model/limiteGrilla';
import { ClienteService } from 'src/services/cliente.service';
import { ComprobanteItemLente } from 'src/app/model/comprobanteItemLente';

@Component({
  selector: 'app-producto-lente',
  templateUrl: './producto-lente.component.html',
  styleUrls: ['./producto-lente.component.css']
})
export class ProductoLenteComponent implements OnInit {
  modelComprobanteItemLente:  any[] = [];
  servicios: string[] = ['CAL O', 'CAL M', 'CAL B', 'CAL L', 'CAL P', 'CAL F', 'CAL L', 'OTROS'];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isOptional = true;

  constructor(
    public dialogRef: MatDialogRef<ProductoLenteComponent>,
    private lenteService: LenteService,
    private clienteService: ClienteService,
    private _formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any) {
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
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  listaComprobanteItemEvento(model : any[]){
    this.modelComprobanteItemLente = model;
    // console.log(this.modelComprobanteItemLente)
    this.changeDetector.detectChanges();
    document.getElementById("siguiente1").focus();
    // console.log(this.firstFormGroup);
    // this.firstFormGroup.setValue();
    // console.log(this.firstFormGroup)
}

  lenteEvento(){
  }

  tabInventado(event: KeyboardEvent, idElement)
  {
    if (event.code == "Enter") {
      event.preventDefault();
      document.getElementById(idElement).focus();
      if(idElement == "remove"){
        document.getElementById(idElement).style.backgroundColor="#e0e0e0";
      }
    }
  }


}