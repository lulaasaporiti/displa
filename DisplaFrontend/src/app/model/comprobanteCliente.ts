import { Cliente } from './Cliente';
import { TipoComprobante } from './tipoComprobante';

export interface ComprobanteCliente {
    Id: number,
    IdCliente: number,
    IdClienteNavigation: Cliente,
    IdTipoComprobante: number,
    IdTipoComprobanteNavigation: TipoComprobante,
    Fecha: Date,
    Numero: number,
    Sucursal: number, 
    Letra: string,
    TasaIva: number, 
    MontoIIBB: number,
    MontoTSEH: number,
    MontoTotal: number,
    SubtotalFactura: number,
    PorcentajeDtoGral: number,
    MontoIVARI: number
}