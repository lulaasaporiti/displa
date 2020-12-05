import { Cliente } from './cliente';
import { Usuario } from './usuario';

export interface Sobre {
    Id: number,
    Numero: number,
    Entregas: number,
    Observaciones: string,
    Fecha: Date,
    IdCliente: number,
    IdClienteNavigation: Cliente,
    IdUsuario: number,
    IdUsuarioNavigation: Usuario
}