import { Lente } from './lente';

export interface PrecioLente {
    Id: number,
    Precio: number,
    IdLente: number,
    IdLenteNavigation: Lente,
    Esferico: number,
    Cilindrico: number
}
