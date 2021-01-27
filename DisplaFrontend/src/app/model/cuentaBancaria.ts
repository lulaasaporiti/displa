import { Banco } from "./Banco";

export interface CuentaBancaria {
    Id: number,
    Numero: string,
    SaldoInicial: number,
    FechaApertura: Date,
    IdBancoNavigation: Banco
}