import { Lente } from './lente';

export interface StockLente {
    MedidaEsferico: number,
    MedidaCilindrico: number,
    IdLente: number,
    IdLenteNavigation: Lente,
    Stock: number
}
