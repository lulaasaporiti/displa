import { ComprobanteProveedor } from "./comprobanteProveedor";

export interface ComprobanteIVA {
    Id: number,
    IdComprobanteProveedor: number,
    Alicuota: number,
    MontoIva: number,
    Neto: number,

    IdComprobanteProveedorNavigation: ComprobanteProveedor,

}