import { ComprobanteCliente } from './comprobanteCliente';
import { VentaVirtual } from './ventaVirtual';

export interface VirtualComprobante {
    Id: number,
    CantidadEntregada: number,
    IdComprobante: number,
    IdVentaVirtual: number,

    IdComprobanteNavigation: ComprobanteCliente,
    IdVentaVirtualNavigation: VentaVirtual,
}

