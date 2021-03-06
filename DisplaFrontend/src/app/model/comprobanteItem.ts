import { ComprobanteCliente } from './comprobanteCliente';
import { ArticuloVario } from './articuloVario';
import { Servicio } from './servicio';
import { ComprobanteItemLente } from './comprobanteItemLente';
import { Remito } from './remito';
import { ComprobanteItemRecargo } from './comprobanteItemRecargo';
import { ComprobanteItemServicio } from './comprobanteItemServicio';


export interface ComprobanteItem {
    Id: number,
    IdComprobante: number,
    IdComprobanteNavigation: ComprobanteCliente,
    IdRemito: number,
    IdRemitoNavigation: Remito,
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
    VentaVirtual: boolean,

    ComprobanteItemLente: ComprobanteItemLente[]
    ComprobanteItemServicio: ComprobanteItemServicio[]
    ComprobanteItemRecargo: ComprobanteItemRecargo[]
    Remito: Remito[]
}
