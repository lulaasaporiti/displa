import { TipoServicio } from './tipoServicio';

export interface Servicio {
    Id: number,
    Nombre: string,
    IdTipoServicio: number,
    IdTipoServicioNavigation: TipoServicio,
    Borrado: boolean
}