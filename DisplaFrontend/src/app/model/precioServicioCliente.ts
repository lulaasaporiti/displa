import { PrecioArticulo } from './precioArticulo';
import { Cliente } from './cliente';
import { PrecioServicio } from './precioServicio';

export interface PrecioServicioCliente {
    Id: number,
    IdPrecioServicio: number,
    IdPrecioServicioNavigation: PrecioServicio
    IdCliente: number,
    IdClienteNavigation: Cliente,
    Descuento: number,
    Especial: boolean
}
