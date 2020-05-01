import { ArticuloVario } from './articuloVario';

export interface PrecioArticulo {
    Id: number,
    Precio: number,
    IdArticulo: number,
    IdArticuloNavigation: ArticuloVario,
}
