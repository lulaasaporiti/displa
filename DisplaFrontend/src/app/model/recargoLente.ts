import { Lente } from './lente';

export interface RecargoLente {
    Id: number,
    IdLente: number,
    IdLenteNavigation: Lente,
    Descripcion: string,
    Porcentaje: number,

}
