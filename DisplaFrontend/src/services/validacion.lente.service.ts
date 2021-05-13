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
        if (lente.Combinacion != undefined) {
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
    }

    compararLimiteGrilla(lente, medida, tipoGraduacion) {
        if (lente != undefined) {
            let combinacion = lente.Combinacion.split("  / ");
            if ((this.limiteGrillaDerecha == undefined && this.limiteGrillaIzquierda == undefined) || combinacion[0] != this.limiteGrillaIzquierda.Combinacion) {
                this.getLimitesGrilla(lente);
            }
        }
        if (medida != undefined) {
            // console.log(+medida)
            // console.log(this.limiteGrillaIzquierda.LimiteSuperiorEsferico, "lim sup esf")
            // console.log(this.limiteGrillaDerecha.LimiteInferiorEsferico, "lim inf esf")
            if (tipoGraduacion == 'esferico') {
                if ((+medida / 100 <= this.limiteGrillaIzquierda.LimiteSuperiorEsferico) && (+medida / 100 >= this.limiteGrillaDerecha.LimiteInferiorEsferico)) {
                    return ((+medida / 100) % 0.25) != 0;
                }
                else {
                    return true;
                }
            }
            else {
                if (lente.GraduacionesCilindricas == '-') {
                    if ((Math.abs(+medida) >= Math.abs(this.limiteGrillaDerecha.LimiteSuperiorCilindrico)) && (Math.abs(+medida) <= Math.abs(this.limiteGrillaDerecha.LimiteInferiorCilindrico))) {
                        // console.log("entra if", +medida)
                        // console.log(+medida * -1 % 0.25)
                        return (+medida * -1 % 0.25) != 0;
                    }
                    else {
                        // console.log("entra else")
                        return true;
                    }
                }
                else {
                    if ((Math.abs(+medida) <= Math.abs(this.limiteGrillaDerecha.LimiteSuperiorCilindrico)) && (Math.abs(+medida) >= Math.abs(this.limiteGrillaDerecha.LimiteInferiorCilindrico))) {
                        // console.log("entra if", +medida)
                        // console.log(+medida * -1 % 0.25)
                        return (+medida * -1 % 0.25) != 0;
                    }
                    else {
                        // console.log("entra else")
                        return true;
                    }
                }
                //ESTO ES LA VALIDACION VIEJA ANTES DE CAMBIAR EL CAMBIO DE SIGNO AUTOMATICO Y QUE PUEDAN PONER + O - 
                // console.log(this.limiteGrillaDerecha.LimiteSuperiorCilindrico, "lim sup cil")
                // console.log(this.limiteGrillaDerecha.LimiteInferiorCilindrico, "lim inf cil")
                // if ((+medida <= this.limiteGrillaDerecha.LimiteSuperiorCilindrico) && (+medida >= this.limiteGrillaDerecha.LimiteInferiorCilindrico)) {
                //     console.log("entra if", +medida)
                //     console.log(+medida * -1 % 0.25)
                //     return (+medida * -1 % 0.25) != 0;
                // }
                // else {
                //     console.log("entra else")
                //     return true;
                // }
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

    divisionCantidad(cantidad, fraccionado) {
        if (cantidad != undefined || cantidad != null) {
            if (fraccionado == true)
                return (+cantidad % 0.50) != 0;
            else
                return (+cantidad % 1) != 0;
        }
    }

    conversionMedidas(medidaEsferico, medidaCilindrico, lente) {
        if (+medidaEsferico == 0 && +medidaCilindrico == 0) {
            return "000";
        }
        else {
            if ((lente.GraduacionesCilindricas == '-' && +medidaCilindrico > 0) || (lente.GraduacionesCilindricas == '+' && +medidaCilindrico < 0)) {
                medidaEsferico = +medidaEsferico + +medidaCilindrico;
                medidaCilindrico = ((Math.abs(+medidaCilindrico) < 1) ? '0' : '') + (-1 * +medidaCilindrico)
            } 
        }
        return ((medidaEsferico == '0') ? '000' : (!medidaEsferico.toString().startsWith('-') ? '+' : '') + (+medidaEsferico * 100).toString()) + (medidaCilindrico != '0.00' ? (!medidaCilindrico.toString().startsWith('-') ? '+' : '') + (+medidaCilindrico * 100).toString() : '')
    }
}
