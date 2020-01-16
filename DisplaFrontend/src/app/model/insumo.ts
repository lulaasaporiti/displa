import { TipoInsumo } from './tipoInsumo';

export interface Insumo {
    id: number,
    nombre: string,
    stockMinimo: number,
    stockActual: number,    
    borrado: boolean
    idTipoInsumo: number,
    idTipoInsumoNavigation: TipoInsumo
}