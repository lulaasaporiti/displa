import { ArticuloVario } from './articuloVario';
import { Usuario } from './usuario';
import { VentaVirtual } from './ventaVirtual';

export interface VentaVirtualMovimientos {
    Id: number,
    Cantidad: number,
    Entrega: boolean,
    IdVentaVirtual: number,
    IdUsuario: number,

    IdVentaVirtualNavigation: VentaVirtual,
    IdUsuarioNavigation: Usuario
}