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

    conversionMedidas(medidaEsferico, medidaCilindrico) {
        console.log(medidaEsferico, "como llega")
        console.log(medidaCilindrico, "como llega")
        if (+medidaEsferico == 0 && +medidaCilindrico == 0) {
            return "000";
        }
        else {
            //     if (graduacionCilindrico) { //graduacion cilindrica positiva
            //         medidaEsferico = medidaEsferico + medidaCilindrico;
            //         medidaCilindrico = Math.abs(medidaCilindrico);
            //     }
            //     else { //graduacion cilindrica negativa
            medidaEsferico = (+medidaEsferico * 100 + +medidaCilindrico * 100).toString();
            medidaCilindrico = (-1 * +medidaCilindrico * 100).toString();
            console.log(medidaEsferico, "como termina")
            console.log(medidaCilindrico, "como termina")
        }
        return (!medidaEsferico.startsWith('-') ? '+' : '') + medidaEsferico + (!medidaCilindrico.startsWith('-') ? '+' : '') + medidaCilindrico
    }
}

// Procedure Invertir(CilindricoPositivo:boolean; var medEsferico, medCilindrico: real);
// begin
//  if CilindricoPositivo then
//  begin
//     if medCilindrico < 0 then
//     begin
//       medEsferico:= medEsferico+medCilindrico;
//       medCilindrico:=abs(medCilindrico);
//     end;
//  end
//  else
//    begin
//         if medCilindrico > 0 then
//         begin
//            medEsferico:=medEsferico+medCilindrico;
//            medCilindrico:= -1 * medCilindrico;
//         end;
//    end;
// end;
