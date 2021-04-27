import { Cliente } from './cliente';
import { CuentaBancaria } from './cuentaBancaria';
import { Usuario } from './usuario';

export interface Recibo {
    Id: number,
    Numero: number,
    Montototal: number,
    MontoEfectivo: number,
    MontoCheque: number,
    MontoInterdeposito: number,
    NroInterdeposito:number,
    Fecha: Date,
    IdCliente: number,
    IdClienteNavigation: Cliente,
    Observaciones: string,
    IdCuentaBancaria: number,
    IdCuentaBancariaNavigation: CuentaBancaria,
    FechaAnulado: Date,
    MotivoAnulado: string,
    IdUsuario: number,
    IdUsuarioAnulacion: number,
    IdUsuarioNavigation: Usuario,
    IdUsuarioAnulacionNavigation: Usuario
}