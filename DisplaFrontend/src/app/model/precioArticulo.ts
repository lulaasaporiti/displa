import { ArticuloVario } from './articuloVario';

export interface PrecioArticulo {
    Id: number,
    Precio: number,
    IdArticuloVario: number,
    IdArticuloVarioNavigation: ArticuloVario
}
