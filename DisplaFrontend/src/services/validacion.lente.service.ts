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
                // console.log(+medida)
                // console.log(this.limiteGrillaDerecha.LimiteSuperiorCilindrico, "lim sup cil")
                // console.log(this.limiteGrillaDerecha.LimiteInferiorCilindrico, "lim inf cil")
                if ((+medida <= this.limiteGrillaDerecha.LimiteSuperiorCilindrico) && (+medida >= this.limiteGrillaDerecha.LimiteInferiorCilindrico)) {
                    // console.log("entra if", +medida)
                    // console.log(+medida * -1 % 0.25)
                    return (+medida * -1 % 0.25) != 0;
                }
                else {
                    // console.log("entra else")
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
        console.log(medidaEsferico, "como llega esferico")
        console.log(medidaCilindrico, "como llega cilindrico")
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
            medidaCilindrico = ((Math.abs(+medidaCilindrico) < 1) ? '0' : '') + (-1 * +medidaCilindrico * 100).toString() 
            console.log(medidaEsferico, "como termina esferico")
            console.log(medidaCilindrico, "como termina cilindrico")
        }
        return ((medidaEsferico == '0') ? '000' : (!medidaEsferico.startsWith('-') ? '+' : '') + medidaEsferico) + (medidaCilindrico != '00' ? (!medidaCilindrico.startsWith('-') ? '+' : '') + medidaCilindrico : '')
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
