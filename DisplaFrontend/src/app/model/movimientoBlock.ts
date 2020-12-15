import { Block } from './block';
import { Caja } from './caja';
import { Usuario } from './usuario';

export interface MovimientoBlock {
    Id: number,
    TipoMovimiento: string,
    Fecha: Date,
    Base: number,
    Adicion?: number,
    PrecioCosto: number,
    IdBlock: number,
    IdBlockNavigation: Block,
    IdUsuario: number,
    IdUsuarioNavigation: Usuario,
    Caja: Caja[];
}