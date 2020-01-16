import { TipoBlock } from './tipoBlock';

export interface Block {
    id: number,
    nombre: string,
    stockMinimo: number,
    stockActual: number,    
    precioCosto?: number,
    borrado: boolean
    idTipoBlock: number,
    idTipoBlockNavigation: TipoBlock
}