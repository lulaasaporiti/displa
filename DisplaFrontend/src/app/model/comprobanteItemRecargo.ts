import { ComprobanteItem } from './comprobanteItem';
import { Servicio } from './servicio';

export interface ComprobanteItemRecargo {
    Id: number,
    IdRecargo: number,
    IdRecargpNavigation: Servicio
    IdComprobanteItem: number,
    IdComprobanteItemNavigation: ComprobanteItem,
    Monto: number,
}
