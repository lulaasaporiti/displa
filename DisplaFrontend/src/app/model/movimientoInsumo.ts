import { Insumo } from './insumo';
import { Usuario } from './usuario';

export interface MovimientoInsumo {
    Id: number,
    TipoMovimiento: string,
    Fecha: Date,
    Cantidad: number,
    IdInsumo: number,
    IdInsumoNavigation: Insumo,
    IdUsuario: number,
    IdUsuarioNavigation: Usuario
}