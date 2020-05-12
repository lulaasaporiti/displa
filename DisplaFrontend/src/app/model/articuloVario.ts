import { TipoArticulo } from './tipoArticulo';
import { PrecioArticulo } from './precioArticulo';

export interface ArticuloVario {
    Id: number,
    Nombre: string,
    StockMinimo: number,
    StockActual: number,
    PrecioCosto: number,
    PorcentajeUtilidad: number,
    IdTipoArticulo: number,
    IdTipoArticuloNavigation: TipoArticulo,
    Borrado: boolean,
    PrecioArticulo: PrecioArticulo[]
}