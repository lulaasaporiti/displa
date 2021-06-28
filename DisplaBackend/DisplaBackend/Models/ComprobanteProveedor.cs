using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class ComprobanteProveedor
    {
        public ComprobanteProveedor()
        {
            ComprobanteImportacion = new HashSet<ComprobanteImportacion>();
            ComprobanteIva = new HashSet<ComprobanteIva>();
        }

        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public DateTime FechaImputacion { get; set; }
        public int? IdProveedor { get; set; }
        public int IdGasto { get; set; }
        public int Sucursal { get; set; }
        public int Numero { get; set; }
        public string Clase { get; set; }
        public decimal? Monto { get; set; }
        public int IdTipoComprobante { get; set; }
        public decimal? SobreTasaIva { get; set; }
        public decimal? MontoAdeudado { get; set; }
        public DateTime? FechaBorrado { get; set; }
        public string MotivoBorrado { get; set; }
        public int? MesTarjeta { get; set; }
        public int? AnioTarjeta { get; set; }
        public int? IdTarjeta { get; set; }
        public bool? PendienteDePago { get; set; }
        public decimal? CotizacionDolar { get; set; }
        public decimal? MontoDolar { get; set; }
        public decimal? GastoTransferencia { get; set; }
        public decimal? GastoBanco { get; set; }
        public decimal? ConceptosNoGravados { get; set; }
        public decimal? RetencionGanancias { get; set; }
        public decimal? RetencionIva { get; set; }
        public decimal? Pib { get; set; }
        public decimal? Tseh { get; set; }

        public virtual Gasto IdGastoNavigation { get; set; }
        public virtual Proveedor IdProveedorNavigation { get; set; }
        public virtual TarjetaCredito IdTarjetaNavigation { get; set; }
        public virtual TipoComprobante IdTipoComprobanteNavigation { get; set; }
        public virtual ICollection<ComprobanteImportacion> ComprobanteImportacion { get; set; }
        public virtual ICollection<ComprobanteIva> ComprobanteIva { get; set; }
    }
}
