import { Provincia } from './provincia';

export interface Localidad {
    Id: number,
    Nombre: string,
    Cp: string,
    Borrado: boolean,
    IdProvincia: number,
    IdProvinciaNavigation: Provincia
}