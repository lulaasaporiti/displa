import { CuentaBancaria } from "./cuentaBancaria";
import { Recibo } from "./recibo";

export interface OperacionBancaria {
    Id: number,
    Fecha: Date,
    Descripcion: string,
    Monto: number,
    Entrada: boolean,
    DepositaCheque: boolean, 
    EmiteCheque: boolean,
    IdCuentaBancaria: number,
    IdCuentaBancariaNavigation: CuentaBancaria,
    IdRecibo: number,
    IdReciboNavigation: Recibo
}
