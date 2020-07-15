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
        public decimal? Esferico { get; set; }
        public decimal? Cilindrico { get; set; }
        public double Precio { get; set; }

        public virtual ComprobanteItem IdComprobanteItemNavigation { get; set; }
        public virtual Lente IdLenteNavigation { get; set; }
    }
}
