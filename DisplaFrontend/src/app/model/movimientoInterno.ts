import { Cliente } from './cliente';
import { Proveedor } from './Proveedor';
import { TipoComprobante } from './tipoComprobante';
import { Usuario } from './usuario';

export interface MovimientoInterno {
    Id: number,
    IdTipoComprobante: string,
    Fecha: Date,
    FechaAnulado: Date,
    Monto: number,
    IdCliente: number,
    IdProveedor: number,
    IdClienteNavigation: Cliente,
    IdProveedorNavigation: Proveedor,
    IdTipoComprobanteNavigation: TipoComprobante,
    MotivoAnulado: string,
    Observaciones: string,
    IdUsuario: number,
    IdUsuarioAnulacion: number,
    IdUsuarioNavigation: Usuario,
    IdUsuarioAnulacionNavigation: Usuario
}