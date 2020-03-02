import { Component, Inject } from '@angular/core';
import { LimitesGrillaService } from 'src/services/limites.grilla.service';
import { LimiteGrilla } from 'src/app/model/limiteGrilla';
import { combineLatest } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { StockLenteService } from 'src/services/stock.lente.service';
import { LenteService } from 'src/services/lente.service';

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
  idLente: number;
  grilla: number[][];

  constructor(
    private limitesGrillaService: LimitesGrillaService,
    private stockLenteService: StockLenteService,
    private lenteService: LenteService,
    private router: Router,
    private segment: ActivatedRoute

  ) {
    this.segment.queryParams.subscribe((params: Params) => {
      this.idLente = +params['id']; // (+) converts string 'id' to a number;
    });
    combineLatest(
      this.lenteService.getById(this.idLente),
      this.stockLenteService.getStockLenteList(this.idLente)
    ).subscribe(r => {
      let combinacion = r[0].Combinacion.split("  / ");
      let idLimiteDerecha;
      let idLimiteIzquierda;
      if (combinacion[0] == '+ +') idLimiteDerecha = 1;
      else idLimiteDerecha = 3;
      if (combinacion[1] == '- +') idLimiteIzquierda = 2;
      else idLimiteIzquierda = 4;
      combineLatest(
        this.limitesGrillaService.getById(idLimiteDerecha),
        this.limitesGrillaService.getById(idLimiteIzquierda)
      ).subscribe(result => {
        this.limiteGrillaDerecha = result[0];
        this.limiteGrillaIzquierda = result[1];

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

        // console.log(r[1])
        this.grilla = [this.arraySuperiorDerecho];
        for (let i = 0; i <= this.arrayLateralDerecho.length; i++) {
          this.grilla[i][0] = this.arrayLateralDerecho[i - 1];
          this.grilla.push([]);
        }
        console.table(this.grilla)
      });



    })
  }
}