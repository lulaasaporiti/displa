import { Cliente } from './cliente';
import { Proveedor } from './Proveedor';
import { TipoComprobante } from './tipoComprobante';

export interface MovimientoInterno {
    Id: number,
    IdTipoComprobante: string,
    Fecha: Date,
    FechaAnulacion: Date,
    Monto: number,
    IdCliente: number,
    IdProveedor: number,
    IdClienteNavigation: Cliente,
    IdProveedorNavigation: Proveedor,
    IdTipoComprobanteNavigation: TipoComprobante,
    MotivoAnulado: string,
    Observaciones: string
}