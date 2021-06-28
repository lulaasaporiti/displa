import { ComprobanteProveedor } from "./comprobanteProveedor";

export interface ComprobanteImportacion {
    Id: number,
    IdComprobanteProveedor: number,
    Despacho: number, 
    CotizacionDolar: number,

    IdComprobanteProveedorNavigation: ComprobanteProveedor,

}