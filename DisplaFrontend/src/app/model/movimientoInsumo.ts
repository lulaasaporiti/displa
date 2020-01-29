import { Insumo } from './insumo';
import { Usuario } from './usuario';

export interface MovimientoInsumo {
    id: number,
    tipoMovimiento: string,
    fecha: Date,
    cantidad: number,
    idInsumo: number,
    idInsumoNavigation: Insumo,
    idUsuario: number,
    idUsuarioNavigation: Usuario
}