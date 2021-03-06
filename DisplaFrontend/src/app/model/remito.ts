import { Cliente } from "./cliente";
import { ComprobanteItem } from "./comprobanteItem";
import { Usuario } from "./usuario";
import { VentaVirtual } from "./ventaVirtual";

export interface Remito {
    Id: number,
    Numero: number,
    Fecha: Date,
    FechaFactura: Date,
    FechaAnulado: Date,
    IdCliente: number,
    IdUsuario: number,
    IdUsuarioAnulacion: number,
    IdClienteNavigation: Cliente,
    IdUsuarioNavigation: Usuario,
    IdUsuarioAnulacionNavigation: Usuario,
    MotivoAnulado: string,
    
    ComprobanteItem: ComprobanteItem[],
    VentaVirtual: VentaVirtual[]
}