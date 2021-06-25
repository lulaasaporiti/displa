import { Gasto } from "./Gasto"
import { Proveedor } from "./Proveedor"
import { TarjetaCredito } from "./tarjetaCredito"
import { TipoComprobante } from "./tipoComprobante"

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

    IdGastoNavigation: Gasto,
    IdProveedorNavigation: Proveedor,
    IdTarjetaNavigation: TarjetaCredito,
    IdTipoComprobanteNavigation: TipoComprobante,
}