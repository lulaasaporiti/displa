import { Recibo } from "./recibo";

export interface MovimientoCaja {
    Id: number,
    Fecha: Date,
    Descripcion: string,
    Monto: number,
    Entrada: boolean,
    IdRecibo: number,
    IdReciboNavigation: Recibo,
    IdReciboProveedor: number,
    // IdReciboProveedorNavigation:
    FechaAnulado: Date,
    Efectivo: boolean
}