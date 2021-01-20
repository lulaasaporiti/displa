import { Cliente } from './cliente';

export interface Recibo {
    Id: number,
    Numero: number,
    MontoEfectivo: number,
    MontoCheque: number,
    MontoInterdeposito: number,
    NroInterdeposito:number,
    Fecha: Date,
    IdCliente: number,
    IdClienteNavigation: Cliente,
    Observaciones: string,
    IdCuentaBancaria: number
}