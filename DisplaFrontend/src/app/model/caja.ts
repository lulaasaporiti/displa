import { MovimientoBlock } from './movimientoBlock';

export interface Caja {
    Id: number,
    NumeroCajaGrande: number,
    NumeroCajaChica: number,
    Cantidad: number,
    IdMovimientoBlock: number,
    IdMovimientoBlockNavigation: MovimientoBlock
}