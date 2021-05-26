using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class PrecioLente
    {
        public PrecioLente()
        {
            PrecioLenteCliente = new HashSet<PrecioLenteCliente>();
        }

        public int Id { get; set; }
        public int IdLente { get; set; }
        public decimal Precio { get; set; }
        public decimal MedidaEsferico { get; set; }
        public decimal MedidaCilindrico { get; set; }
        public decimal? CostoPar { get; set; }
        public string Moneda { get; set; }

        public virtual Lente IdLenteNavigation { get; set; }
        public virtual ICollection<PrecioLenteCliente> PrecioLenteCliente { get; set; }
    }
}
