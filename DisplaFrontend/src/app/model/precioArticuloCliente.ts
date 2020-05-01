import { PrecioArticulo } from './precioArticulo';
import { Cliente } from './cliente';

export interface PrecioArticuloCliente {
    Id: number,
    IdPrecioArticulo: number,
    IdPrecioArticuloNavigation: PrecioArticulo
    IdCliente: number,
    IdClienteNavigation: Cliente,
    Descuento: number,
    Especial: boolean
}
