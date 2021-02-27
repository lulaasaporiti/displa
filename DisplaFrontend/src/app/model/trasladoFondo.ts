import { CuentaBancaria } from "./cuentaBancaria";

export interface TrasladoFondo {
    Id: number,
    IdCuentaOrigen: number,
    IdCuentaDestino: number,
    IdCuentaDestinoNavigation: CuentaBancaria,
    IdCuentaOrigenNavigation: CuentaBancaria,
    Descripcion: string;
    Monto: number;
    Fecha: Date,
}