import { Servicio } from './servicio';

export interface PrecioServicio {
    Id: number,
    Precio: number,
    IdServicio: number,
    IdServicioNavigation: Servicio
}
