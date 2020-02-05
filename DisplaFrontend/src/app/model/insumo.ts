import { TipoInsumo } from './tipoInsumo';

export interface Insumo {
    Id: number,
    Nombre: string,
    StockMinimo: number,
    StockActual: number,    
    Borrado: boolean
    IdTipoInsumo: number,
    IdTipoInsumoNavigation: TipoInsumo
}