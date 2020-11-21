using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class ComprobanteItemLente
    {
        public int Id { get; set; }
        public int IdLente { get; set; }
        public int IdComprobanteItem { get; set; }
        public double Cantidad { get; set; }
        public decimal? MedidaEsferico { get; set; }
        public decimal? MedidaCilindrico { get; set; }
        public double Precio { get; set; }

        public virtual ComprobanteItem IdComprobanteItemNavigation { get; set; }
        public virtual Lente IdLenteNavigation { get; set; }
    }
}
