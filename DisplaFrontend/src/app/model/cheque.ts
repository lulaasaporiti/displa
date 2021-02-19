import { Banco } from './Banco';
import { Cliente } from './cliente';
import { Recibo } from './recibo';

export interface Cheque {
    Id: number,
    Numero: number,
    Fecha: Date,
    Importe: number,
    FechaAlta: Date,
    FechaAnulado: Date,
    MotivoAnulado: string,
    IdCliente: number,
    IdClienteNavigation: Cliente,
    IdRecibo: number,
    IdReciboNavigation: Recibo
    IdBanco: number,
    IdBancoNavigation: Banco
}
