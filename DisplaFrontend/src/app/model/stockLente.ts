import { Lente } from './lente';

export interface Caja {
    MedidaEsferico: number,
    MedidaCilindrico: number,
    idLente: number,
    IdLenteNavigation: Lente,
    stock: number
}
