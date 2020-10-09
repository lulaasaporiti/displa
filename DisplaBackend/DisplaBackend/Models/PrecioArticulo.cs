using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class PrecioArticulo
    {
        public PrecioArticulo()
        {
            PrecioArticuloCliente = new HashSet<PrecioArticuloCliente>();
        }

        public int Id { get; set; }
        public int IdArticulo { get; set; }
        public decimal Precio { get; set; }

        public virtual ArticuloVario IdArticuloNavigation { get; set; }
        public virtual ICollection<PrecioArticuloCliente> PrecioArticuloCliente { get; set; }
    }
}
