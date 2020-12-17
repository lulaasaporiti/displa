import { Cliente } from './Cliente';
import { ComprobanteItem } from './comprobanteItem';
import { TipoComprobante } from './tipoComprobante';
import { Usuario } from './usuario';
import { VentaVirtual } from './ventaVirtual';

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
    Observaciones: string,
    MontoIVARI: number,
    IdUsuario: number,
    IdUsuarioNavigation: Usuario,

    ComprobanteItem: ComprobanteItem[],
    VentaVirtual: VentaVirtual[]
}