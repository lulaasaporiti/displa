import { Component, Inject } from '@angular/core';
import { LimitesGrillaService } from 'src/services/limites.grilla.service';
import { LimiteGrilla } from 'src/app/model/limiteGrilla';
import { combineLatest, iif } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { StockLenteService } from 'src/services/stock.lente.service';
import { LenteService } from 'src/services/lente.service';
import { StockLente } from 'src/app/model/stockLente';
import { Lente } from 'src/app/model/lente';


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
  grilla: number[][] = [[0],[0]];
  stock: StockLente[];
  lente = <Lente>{}; 

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
      this.lente = r[0]
      this.stock = r[1];
      let combinacion = this.lente.Combinacion.split("  / ");
      let idLimiteDerecha;
      let idLimiteIzquierda;
      if (combinacion[0] == '+ +') idLimiteIzquierda = 1;
      else idLimiteIzquierda = 3;
      if (combinacion[1] == '- +') idLimiteDerecha = 2;
      else idLimiteDerecha = 4;
      combineLatest(
        this.limitesGrillaService.getById(idLimiteIzquierda),
        this.limitesGrillaService.getById(idLimiteDerecha)
      ).subscribe(result => {
        this.limiteGrillaDerecha = result[1];
        this.limiteGrillaIzquierda = result[0];

        for (let index = this.limiteGrillaDerecha.LimiteInferiorEsferico; index <= this.limiteGrillaDerecha.LimiteSuperiorEsferico; index = index + 0.25) {
          this.arrayLateralDerecho.push(index)
        }
        if (this.limiteGrillaDerecha.Combinacion == '- +') {
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

        if (this.limiteGrillaIzquierda.Combinacion == '+ +') {
          for (let index = this.limiteGrillaIzquierda.LimiteInferiorCilindrico; index <= this.limiteGrillaIzquierda.LimiteSuperiorCilindrico; index = index + 0.25) {
            this.arraySuperiorIzquierdo.push(index)
          }
        } else {
          for (let index = this.limiteGrillaIzquierda.LimiteSuperiorCilindrico; index >= this.limiteGrillaIzquierda.LimiteInferiorCilindrico; index = index - 0.25) {
            this.arraySuperiorIzquierdo.push(index)
          }
        }

        this.grilla = [this.arraySuperiorIzquierdo];
        for (let i = 0; i <= this.arrayLateralIzquierdo.length; i++) {
          this.grilla[i][0] = this.arrayLateralIzquierdo[i - 1];
          this.grilla.push([]);
        }
        // console.log(r[1])

        this.stock.forEach(s => {
          let columna = this.grilla[0].indexOf(s.MedidaCilindrico);
          let fila = 0;
          this.grilla.forEach(f => {
            if(f[0] == s.MedidaEsferico) {
              f[columna] = s.Stock;
              // console.log(fila, columna, s.Stock)
            }
          })
          // this.grilla[fila, columna].push(s.stock);
        })
        console.table(this.grilla)

      });
    })
  }
}