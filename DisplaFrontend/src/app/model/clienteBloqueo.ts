import { Cliente } from './Cliente';

export interface ClienteBloqueo {
  Id: number,
  IdCliente: number,
  Motivo: string, 
  Fecha: Date,

  IdClienteNavigation: Cliente
}