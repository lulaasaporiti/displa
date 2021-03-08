import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
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
        combineLatest([
            this.limitesGrillaService.getById(idLimiteIzquierda),
            this.limitesGrillaService.getById(idLimiteDerecha)
        ]).subscribe(result => {
            this.limiteGrillaIzquierda = result[0];
            this.limiteGrillaDerecha = result[1];
        });
    }

    compararLimiteGrilla(lente, medida, tipoGraduacion) {
        if (lente != undefined) {
            let combinacion = lente.Combinacion.split("  / ");
            if ((this.limiteGrillaDerecha == undefined && this.limiteGrillaIzquierda == undefined) || combinacion[0] != this.limiteGrillaIzquierda.Combinacion) {
                this.getLimitesGrilla(lente);
            }
        }
        if (medida != undefined) {
            if (tipoGraduacion == 'esferico') {
                if ((+medida / 100 <= this.limiteGrillaIzquierda.LimiteSuperiorEsferico) && (+medida / 100 >= this.limiteGrillaDerecha.LimiteInferiorEsferico)) {
                    return ((+medida / 100) % 0.25) != 0;
                }
                else {
                    return true;
                }
            }
            else {
                if ((+medida <= this.limiteGrillaDerecha.LimiteSuperiorCilindrico) && (+medida >= this.limiteGrillaDerecha.LimiteInferiorCilindrico)) {
                    return (+medida % 0.25) != 0;
                }
                else {
                    console.log("else")
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
        if (medida != undefined || medida != null) {
            if (!medida.toString().includes('.')) {
                if (tipoGraduacion == 'esferico') {
                    lente.MedidaEsferico = (+medida / 100).toFixed(2);
    
                } else {
                    lente.MedidaCilindrico = (+medida / 100).toFixed(2);
                }
            }  
        }
    }

    divisionCantidad(cantidad) {
        if (cantidad != undefined || cantidad != null) {
            return (+cantidad % 0.50) != 0;
        }
    }


    conversionMedidas(graduacionCilindrico, medidaEsferico, medidaCilindrico) {
        if (graduacionCilindrico) { //graduacion cilindrica positiva
            medidaCilindrico = Math.abs(medidaCilindrico);
            if (medidaEsferico < 0) {
               medidaEsferico = medidaEsferico - medidaCilindrico;
            }
            else {
               medidaEsferico = medidaEsferico + medidaCilindrico;
            }
        }
        else { //graduacion cilindrica negativa
            if (medidaEsferico > 0) {
                medidaCilindrico = (-1 * medidaCilindrico).toFixed(3);
                medidaEsferico = (medidaEsferico + medidaCilindrico).toFixed(3);
            }
            else {
            }
        }
        return medidaEsferico.toString() + medidaCilindrico.toString()
    }

}
