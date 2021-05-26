import { Lente } from './lente';

export interface PrecioLente {
    Id: number,
    Precio: number,
    IdLente: number,
    IdLenteNavigation: Lente,
    MedidaEsferico: number,
    MedidaCilindrico: number,
    CostoPar: number,
    Moneda: string,
}
