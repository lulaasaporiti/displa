import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { LimiteGrilla } from 'src/app/model/limiteGrilla';
import { LimitesGrillaService } from './limites.grilla.service';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({
    providedIn: 'root'
})
export class ValidacionLenteService {

    limiteGrillaDerecha = <LimiteGrilla>{};
    limiteGrillaIzquierda = <LimiteGrilla>{};

    constructor(
        private limitesGrillaService: LimitesGrillaService
    ) { }

    async getLimitesGrilla(lente):Promise<void> {
        let idLimiteDerecha;
        let idLimiteIzquierda;
        console.log(lente)
        let combinacion = lente.IdLenteNavigation.Combinacion.split("  / ");
        if (combinacion[0] == '+ +') idLimiteIzquierda = 1;
        else idLimiteIzquierda = 3;
        if (combinacion[1] == '- +') idLimiteDerecha = 2;
        else idLimiteDerecha = 4;
        combineLatest(
            this.limitesGrillaService.getById(idLimiteIzquierda),
            this.limitesGrillaService.getById(idLimiteDerecha)
        ).subscribe(async result => {
            await setTimeout(() => {
                 this.limiteGrillaIzquierda = result[0];
                 this.limiteGrillaDerecha = result[1];
                // await this.limiteGrillaDerecha != undefined;
                // await this.limiteGrillaIzquierda != undefined;
            }, 100000);
        });
    }

    compararLimiteGrilla(lente, medida, tipoGraduacion) {
        if (lente != undefined) {
            let combinacion = lente.IdLenteNavigation.Combinacion.split("  / ");
            if ((this.limiteGrillaDerecha == undefined && this.limiteGrillaIzquierda == undefined) || combinacion[0] != this.limiteGrillaIzquierda.Combinacion) {
                this.getLimitesGrilla(lente);
            }
        }
        if (medida != undefined) {
            if (tipoGraduacion == 'esferico') {
                console.log(this.limiteGrillaIzquierda)
                if ((+medida / 100 <= this.limiteGrillaIzquierda.LimiteSuperiorEsferico) && (+medida / 100 >= this.limiteGrillaDerecha.LimiteInferiorEsferico)) {
                    console.log(((+medida / 100) % 0.25) != 0)
                    return ((+medida / 100) % 0.25) != 0;
                }
                else {
                    return true;
                }
            }
            else {
                if ((+medida / 100 <= this.limiteGrillaDerecha.LimiteSuperiorCilindrico) && (+medida / 100 >= this.limiteGrillaDerecha.LimiteInferiorCilindrico)) {
                    return ((+medida / 100) % 0.25) != 0;
                }
                else {
                    return true;
                }
            }
        }
    }

    //Recibe dos tipos de modelo distintos, cargaStock y modelPrecio
    compararGraduacion(stockPrecio, lente) {
        if (+stockPrecio.MedidaCilindrico > 0 && lente.GraduacionesCilindricas == '-') {
            return true;
        }
        else {
            if (0 > +stockPrecio.MedidaCilindrico && lente.GraduacionesCilindricas == '+') {
                return true;
            }
            return false;
        }
    }

    divisionMedida(lente, medida, tipoGraduacion) {
        if (medida != undefined && !medida.includes('.')) {
            if (tipoGraduacion == 'esferico') {
                lente.MedidaEsferico = (+medida / 100).toFixed(2);

            } else {
                lente.MedidaCilindrico = (+medida / 100).toFixed(2);
            }
        }
    }

}
