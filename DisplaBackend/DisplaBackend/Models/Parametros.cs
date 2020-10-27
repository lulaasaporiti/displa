using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Parametros
    {
        public int Id { get; set; }
        public decimal? Dolar { get; set; }
        public decimal? Euro { get; set; }
        public int? NumeroSucursal { get; set; }
        public int? NumeroComprobanteA { get; set; }
        public int? NumeroComprobanteB { get; set; }
        public int? CantidadProductoDiferentes { get; set; }
        public int? CantidadProductoDiferentesRemito { get; set; }
        public string Observaciones { get; set; }
        public int? NumeroRecibo { get; set; }
        public int? NumeroHojaIvaventas { get; set; }
        public int? TasaIvaproveedores { get; set; }
        public int? SobretasaIvaproveedores { get; set; }
        public int? NumeroHojaIvacompras { get; set; }
        public int? IngresosBrutos { get; set; }
        public int? MontoBaseRetenciones { get; set; }
        public int? PorcentajeRetenciones { get; set; }
        public int? NumeroCertificadoRetencion { get; set; }
        public int? NumeroNotaCreditoA { get; set; }
        public int? NumeroNotaCreditoB { get; set; }
        public int? NumeroNotaDebitoA { get; set; }
        public int? NumeroNotaDebitoB { get; set; }
        public int? MontoMinimo { get; set; }
        public int? MontoMaximoProductosDiferentes { get; set; }
        public int? MontoMaximoComprobante { get; set; }
    }
}
