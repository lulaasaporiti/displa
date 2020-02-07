import { TipoServicio } from './tipoServicio';
import { PrecioServicio } from './precioServicio';

export interface Servicio {
    Id: number,
    Nombre: string,
    IdTipoServicio: number,
    IdTipoServicioNavigation: TipoServicio,
    Borrado: boolean,
    PrecioServicio: PrecioServicio[]
}