using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class PrecioArticuloCliente
    {
        public int Id { get; set; }
        public int IdPrecioArticulo { get; set; }
        public int IdCliente { get; set; }
        public double? Descuento { get; set; }
        public bool? Especial { get; set; }

        public virtual Cliente IdClienteNavigation { get; set; }
        public virtual PrecioArticulo IdPrecioArticuloNavigation { get; set; }
    }
}
