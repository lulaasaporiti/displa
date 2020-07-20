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
        public decimal Esferico { get; set; }
        public decimal Cilindrico { get; set; }

        public virtual Lente IdLenteNavigation { get; set; }
        public virtual ICollection<PrecioLenteCliente> PrecioLenteCliente { get; set; }
    }
}
