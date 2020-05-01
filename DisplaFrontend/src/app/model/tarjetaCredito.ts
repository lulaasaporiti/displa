import { Banco } from './banco';

export interface TarjetaCredito {
    Id: number,
    Nombre: string,
    Borrado: boolean,
    IdBanco: number,
    IdBancoNavigation: Banco
}
