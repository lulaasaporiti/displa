import { ComprobanteCliente } from './comprobanteCliente';
import { ArticuloVario } from './articuloVario';


export interface ComprobanteItem {
    Id: number,
    IdComprobante: number,
    IdComprobanteNavigation: ComprobanteCliente,
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
