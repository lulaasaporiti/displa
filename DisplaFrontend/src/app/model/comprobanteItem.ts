import { ComprobanteCliente } from './comprobanteCliente';
import { ArticuloVario } from './articuloVario';
import { Servicio } from './servicio';


export interface ComprobanteItem {
    Id: number,
    IdComprobante: number,
    IdComprobanteNavigation: ComprobanteCliente,
    IdServicio: number,
    IdServicioNavigation: Servicio,
    IdArticulo: number,
    IdArticuloNavigation: ArticuloVario,
    NumeroSobre: number,
    Descripcion: string,
    Cantidad: number,
    Monto: number,
    IIBB: number,
    Recargo: number,
    EntregaVentaVirtual: boolean,
    VentaVirtual: boolean
}
