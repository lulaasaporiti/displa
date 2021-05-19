using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class ComprobanteCliente
    {
        public ComprobanteCliente()
        {
            ComprobanteItem = new HashSet<ComprobanteItem>();
            VentaVirtual = new HashSet<VentaVirtual>();
            VentaVirtualMovimientos = new HashSet<VentaVirtualMovimientos>();
        }

        public int Id { get; set; }
        public int IdCliente { get; set; }
        public int IdTipoComprobante { get; set; }
        public DateTime Fecha { get; set; }
        public int Numero { get; set; }
        public int Sucursal { get; set; }
        public string Letra { get; set; }
        public decimal? TasaIva { get; set; }
        public decimal? MontoIibb { get; set; }
        public decimal? MontoTseh { get; set; }
        public decimal MontoTotal { get; set; }
        public decimal SubTotalFactura { get; set; }
        public decimal? PorcentajeDtoGral { get; set; }
        public decimal? MontoIvari { get; set; }
        public DateTime? FechaAnulado { get; set; }
        public int? IdUsuario { get; set; }
        public string Observaciones { get; set; }

        public virtual Cliente IdClienteNavigation { get; set; }
        public virtual TipoComprobante IdTipoComprobanteNavigation { get; set; }
        public virtual AspNetUsers IdUsuarioNavigation { get; set; }
        public virtual ICollection<ComprobanteItem> ComprobanteItem { get; set; }
        public virtual ICollection<VentaVirtual> VentaVirtual { get; set; }
        public virtual ICollection<VentaVirtualMovimientos> VentaVirtualMovimientos { get; set; }
    }
}
