import { PrecioArticulo } from './precioArticulo';
import { Cliente } from './cliente';
import { ComprobanteItem } from './comprobanteItem';
import { Servicio } from './servicio';

export interface ComprobanteItemServicio {
    Id: number,
    IdRecargo: number,
    IdRecargpNavigation: Servicio
    IdComprobanteItem: number,
    IdComprobanteItemNavigation: ComprobanteItem,
    Monto: number,
}
