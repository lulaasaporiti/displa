import { Provincia } from './provincia';

export interface Localidad {
    id: number,
    nombre: string,
    cp: string,
    borrado: boolean,
    idProvincia: number,
    idProvinciaNavigation: Provincia
}