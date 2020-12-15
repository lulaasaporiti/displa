import { MovimientoBlock } from './movimientoBlock';
import { Ubicacion } from './Ubicacion';

export interface Caja {
    Id: number,
    NumeroCajaGrande: number,
    NumeroCajaChica: number,
    Cantidad: number,
    CambioUbicacion: boolean,
    IdMovimientoBlock: number,
    IdMovimientoBlockNavigation: MovimientoBlock,
    IdUbicacion: number,
    IdUbicacionNavigation: Ubicacion,
}