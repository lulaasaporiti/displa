using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class StockLente
    {
        public int Id { get; set; }
        public decimal MedidaEsferico { get; set; }
        public decimal MedidaCilindrico { get; set; }
        public int IdLente { get; set; }
        public int Stock { get; set; }
    }
}
