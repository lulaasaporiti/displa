import { Cliente } from './cliente';
import { PrecioLente } from './precioLente';

export interface PrecioLenteCliente {
    Id: number,
    IdPrecioLente: number,
    IdPrecioLenteNavigation: PrecioLente
    IdCliente: number,
    IdClienteNavigation: Cliente,
    Descuento: number,
    Especial: boolean
}
