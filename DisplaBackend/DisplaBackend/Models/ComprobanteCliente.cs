using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class ComprobanteCliente
    {
        public ComprobanteCliente()
        {
            ComprobanteItem = new HashSet<ComprobanteItem>();
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

        public virtual Cliente IdClienteNavigation { get; set; }
        public virtual TipoComprobante IdTipoComprobanteNavigation { get; set; }
        public virtual ICollection<ComprobanteItem> ComprobanteItem { get; set; }
    }
}
