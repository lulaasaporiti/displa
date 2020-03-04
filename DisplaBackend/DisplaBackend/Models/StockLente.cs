using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class StockLente
    {
        public double MedidaEsferico { get; set; }
        public double MedidaCilindrico { get; set; }
        public int IdLente { get; set; }
        public double Stock { get; set; }

        public virtual Lente IdLenteNavigation { get; set; }
    }
}
