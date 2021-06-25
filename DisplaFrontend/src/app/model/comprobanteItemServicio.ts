import { ComprobanteItem } from './comprobanteItem';
import { Servicio } from './servicio';

export interface ComprobanteItemServicio {
    Id: number,
    IdServicio: number,
    IdServicioNavigation: Servicio,
    IdComprobanteItem: number,
    IdComprobanteItemNavigation: ComprobanteItem,
    Monto: number,
}
