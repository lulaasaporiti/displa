import { Lente } from './lente';

export interface StockLente {
    Id: number,
    MedidaEsferico: number,
    MedidaCilindrico: number,
    IdLente: number,
    IdLenteNavigation: Lente,
    Stock: number
}
