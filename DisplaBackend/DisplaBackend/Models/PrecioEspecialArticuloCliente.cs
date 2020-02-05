using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class PrecioEspecialArticuloCliente
    {
        public int Id { get; set; }
        public int IdPrecioArticulo { get; set; }
        public int IdCliente { get; set; }

        public virtual Cliente IdNavigation { get; set; }
        public virtual PrecioArticulo IdPrecioArticuloNavigation { get; set; }
    }
}
