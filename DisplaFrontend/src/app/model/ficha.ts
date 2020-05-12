import { Cliente } from './Cliente';

export interface Ficha {
    Id: number,
    Fecha: Date,
    Descripcion: string,
    IdCliente: number,
    IdClienteNavigation: Cliente
}