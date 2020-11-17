import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, combineLatest } from 'rxjs';
import { LimiteGrilla } from 'src/app/model/limiteGrilla';
import { LimitesGrillaService } from './limites.grilla.service';

@Injectable({
    providedIn: 'root'
})
export class ValidacionLenteService {

    limiteGrillaDerecha = <LimiteGrilla>{};
    limiteGrillaIzquierda = <LimiteGrilla>{};

    constructor(
        private limitesGrillaService: LimitesGrillaService
    ) { }

    getLimitesGrilla(lente) {
        let idLimiteDerecha;
        let idLimiteIzquierda;
        let combinacion = lente.Combinacion.split("  / ");
        if (combinacion[0] == '+ +') idLimiteIzquierda = 1;
        else idLimiteIzquierda = 3;
        if (combinacion[1] == '- +') idLimiteDerecha = 2;
        else idLimiteDerecha = 4;
        combineLatest(
            this.limitesGrillaService.getById(idLimiteIzquierda),
            this.limitesGrillaService.getById(idLimiteDerecha)
        ).subscribe(result => {
            this.limiteGrillaIzquierda = result[0];
            this.limiteGrillaDerecha = result[1];
        });
        console.log(this.limiteGrillaIzquierda)
    }

    compararLimiteGrilla(lente, medida, tipoGraduacion) {
        // console.log(medida / 100)
        console.log(lente)
        console.log(this.limiteGrillaIzquierda)
        console.log(this.limiteGrillaIzquierda == undefined)
        console.log(medida)
        if (lente != undefined) {
            let combinacion = lente.Combinacion.split("  / ");
            if ((this.limiteGrillaDerecha == undefined && this.limiteGrillaIzquierda == undefined) || combinacion[0] != this.limiteGrillaIzquierda.Combinacion) {
                this.getLimitesGrilla(lente);
            }
        }
        if (medida != undefined) {
            if (tipoGraduacion == 'esferico') {
                if (medida / 100 <= this.limiteGrillaIzquierda.LimiteSuperiorEsferico && medida / 100 >= this.limiteGrillaDerecha.LimiteInferiorEsferico) {
                    return ((medida / 100) % 0.25) > 0;
                }
                else {
                    return true;
                }
            }
            else {
                if (+medida / 100 <= this.limiteGrillaDerecha.LimiteSuperiorCilindrico && +medida / 100 >= this.limiteGrillaDerecha.LimiteInferiorCilindrico) {
                    return ((+medida / 100) % 0.25) > 0;
                }
                else {
                    return true;
                }
            }
        }
    }

    compararGraduacion(lente) {
        if (+lente.MedidaCilindrico > 0 && lente.IdLenteNavigation.GraduacionesCilindricas == '-') {
            return true;
        }
        else {
            if (0 > +lente.MedidaCilindrico && lente.IdLenteNavigation.GraduacionesCilindricas == '+') {
                return true;
            }
            return false;
        }
    }

    divisionMedida(lente, medida, tipoGraduacion) {
        // console.log(medida)
        this.getLimitesGrilla(lente);
        if (tipoGraduacion == 'esferico') {
            if (medida != undefined) {
                var lala = +medida;
                console.log(parseFloat((lala / 100).toFixed(2)))
                medida = parseFloat((lala / 100).toFixed(2));
                console.log(medida)
            }
        } else {
            if (medida != undefined) {
                medida = medida / 100;
            }
        }
    }
}
