import { MovimientoBlock } from './movimientoBlock';

export interface Ubicacion {
    id: number,
    numeroCajaGrande: number,
    numeroCajaChica: number,
    cantidad: number,
    idMovimientoBlock: number,
    idMovimientoBlockNavigation: MovimientoBlock
}