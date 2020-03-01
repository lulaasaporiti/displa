import { Component, Inject } from '@angular/core';
import { LimitesGrillaService } from 'src/services/limites.grilla.service';
import { LimiteGrilla } from 'src/app/model/limiteGrilla';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.css']
})
export class GrillaComponent {
  limiteGrillaDerecha = <LimiteGrilla>{};
  limiteGrillaIzquierda = <LimiteGrilla>{};
  arraySuperiorDerecho: number[] = [];
  arrayLateralDerecho: number[] = [];
  arraySuperiorIzquierdo: number[] = [];
  arrayLateralIzquierdo: number[] = [];

  constructor(
    private limitesGrillaService: LimitesGrillaService
  ) {

    combineLatest(
      this.limitesGrillaService.getById(1),
      this.limitesGrillaService.getById(2)
    ).subscribe(result => {
      this.limiteGrillaDerecha = result[0].LimiteInferiorEsferico;
      this.limiteGrillaIzquierda = result[0].LimiteSuperiorEsferico;

      for (let index = this.limiteGrillaDerecha.LimiteInferiorEsferico; index <= this.limiteGrillaDerecha.LimiteSuperiorEsferico; index = index + 0.25) {
        this.arrayLateralDerecho.push(index)
      }
      if (result[0].Combinacion == '+ +') {
        for (let index = this.limiteGrillaDerecha.LimiteInferiorCilindrico; index <= this.limiteGrillaDerecha.LimiteSuperiorCilindrico; index = index + 0.25) {
          this.arraySuperiorDerecho.push(index)
        }
      } else {
        for (let index = this.limiteGrillaDerecha.LimiteSuperiorCilindrico; index >= this.limiteGrillaDerecha.LimiteInferiorCilindrico; index = index - 0.25) {
          this.arraySuperiorDerecho.push(index)
        }
      }

      for (let index = this.limiteGrillaIzquierda.LimiteSuperiorEsferico; index >= this.limiteGrillaIzquierda.LimiteInferiorEsferico; index = index - 0.25) {
        this.arrayLateralIzquierdo.push(index)
      }

      if (result[1].Combinacion == '- +') {
        for (let index = this.limiteGrillaIzquierda.LimiteInferiorCilindrico; index <= this.limiteGrillaIzquierda.LimiteSuperiorCilindrico; index = index + 0.25) {
          this.arraySuperiorIzquierdo.push(index)
        }
      } else {
        for (let index = this.limiteGrillaIzquierda.LimiteSuperiorCilindrico; index >= this.limiteGrillaIzquierda.LimiteInferiorCilindrico; index = index - 0.25) {
          this.arraySuperiorIzquierdo.push(index)
        }
      }

      console.log(this.arrayLateralDerecho);
      console.log(this.arraySuperiorDerecho);

      console.log(this.arrayLateralIzquierdo);
      console.log(this.arraySuperiorIzquierdo);
    })
  }
}