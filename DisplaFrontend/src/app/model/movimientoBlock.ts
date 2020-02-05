import { Block } from './block';
import { Ubicacion } from './Ubicacion';
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
    IdUbicacion: number,
    IdUbicacionNavigation: Ubicacion,
    IdUsuario: number,
    IdUsuarioNavigation: Usuario
}