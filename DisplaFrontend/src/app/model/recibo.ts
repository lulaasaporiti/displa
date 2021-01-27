import { Cliente } from './cliente';
import { CuentaBancaria } from './cuentaBancaria';

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
    IdCuentaBancaria: number,
    IdCuentaBancariaNavigation: CuentaBancaria
}