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
        }

        public int Id { get; set; }
        public int IdCliente { get; set; }
        public int IdTipoComprobante { get; set; }
        public DateTime Fecha { get; set; }
        public int Numero { get; set; }
        public int Sucursal { get; set; }
        public string Letra { get; set; }
        public int? TasaIva { get; set; }
        public int? MontoIibb { get; set; }
        public int? MontoTseh { get; set; }
        public double MontoTotal { get; set; }
        public double SubTotalFactura { get; set; }
        public int? PorcentajeDtoGral { get; set; }
        public double? MontoIvari { get; set; }
        public DateTime? FechaAnulado { get; set; }
        public int? IdUsuario { get; set; }
        public string Observaciones { get; set; }

        public virtual Cliente IdClienteNavigation { get; set; }
        public virtual TipoComprobante IdTipoComprobanteNavigation { get; set; }
        public virtual AspNetUsers IdUsuarioNavigation { get; set; }
        public virtual ICollection<ComprobanteItem> ComprobanteItem { get; set; }
        public virtual ICollection<VentaVirtual> VentaVirtual { get; set; }
    }
}
