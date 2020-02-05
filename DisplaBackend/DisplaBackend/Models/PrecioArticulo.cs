using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class PrecioArticulo
    {
        public PrecioArticulo()
        {
            PrecioEspecialArticuloCliente = new HashSet<PrecioEspecialArticuloCliente>();
        }

        public int Id { get; set; }
        public int IdArticulo { get; set; }
        public double Precio { get; set; }

        public virtual ArticuloVario IdArticuloNavigation { get; set; }
        public virtual ICollection<PrecioEspecialArticuloCliente> PrecioEspecialArticuloCliente { get; set; }
    }
}
