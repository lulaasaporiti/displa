import { ComprobanteImportacion } from "./comprobanteImportacion"
import { ComprobanteIVA } from "./comprobanteIVA"
import { Gasto } from "./Gasto"
import { Proveedor } from "./Proveedor"
import { TarjetaCredito } from "./tarjetaCredito"
import { TipoComprobante } from "./tipoComprobante"
import { Usuario } from "./usuario"

export interface ComprobanteProveedor {
    Id: number,
    Fecha: Date,
    FechaImputacion: Date,
    IdProveedor: number,
    IdGasto: number,
    Sucursal: number,
    Numero: number,
    Clase: string,
    Monto: number,
    IdTipoComprobante: number,
    Neto: number,
    Iva: number,
    ConceptosNoGravados: number,
    RetencionGanancias: number,
    RetencionIva: number,
    TasaIva: number,
    SobreTasaIva: number,
    MontoAdeudado: number,
    FechaBorrado: Date,
    MotivoBorrado: string,
    MesTarjeta: number,
    AnioTarjeta: number,
    IdTarjeta: number,
    PendienteDePago: boolean,
    Pib: number,
    CotizacionDolar: number,
    MontoDolar: number,
    GastoTransferencia: number,
    GastoBanco: number,
    MultiTasasIva: boolean,
    Tseh: number,
    NombreProveedor: string,
    IdUsuario: number,
    IdUsuarioAnulacion: number,

    IdGastoNavigation: Gasto,
    IdProveedorNavigation: Proveedor,
    IdTarjetaNavigation: TarjetaCredito,
    IdTipoComprobanteNavigation: TipoComprobante,
    IdUsuarioNavigation: Usuario,
    IdUsuarioAnulacionNavigation: Usuario, 

    ComprobanteImportacion: ComprobanteImportacion[];
    ComprobanteIva: ComprobanteIVA[];
}
