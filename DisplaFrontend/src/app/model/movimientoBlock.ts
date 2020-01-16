import { Block } from './block';
import { Ubicacion } from './Ubicacion';
import { Usuario } from './usuario';

export interface MovimientoBlock {
    id: number,
    tipoMovimiento: string,
    fecha: Date,
    base: number,
    adicion?: number,
    precio: number,
    idBlock: number,
    idBlockNavigation: Block,
    idUbicacion: number,
    idUbicacionNavigation: Ubicacion,
    idUsuario: number,
    idUsuarioNavigation: Usuario
}