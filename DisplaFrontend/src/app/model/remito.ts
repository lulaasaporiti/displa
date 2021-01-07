import { Cliente } from "./cliente";
import { ComprobanteItem } from "./comprobanteItem";
import { Usuario } from "./usuario";

export interface Remito {
    Id: number,
    Fecha: Date,
    FechaFactura: Date,
    FechaAnulado: Date,
    IdCliente: number,
    IdUsuario: number,
    IdClienteNavigation: Cliente,
    IdUsuarioNavigation: Usuario,

    ComprobanteItem: ComprobanteItem[],
}