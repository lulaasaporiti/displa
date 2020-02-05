import { TipoBlock } from './tipoBlock';

export interface Block {
    Id: number,
    Nombre: string,
    StockMinimo: number,
    StockActual: number,    
    PrecioCosto?: number,
    Borrado: boolean
    IdTipoBlock: number,
    IdTipoBlockNavigation: TipoBlock
}