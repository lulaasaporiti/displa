using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class PrecioEspecialLenteCliente
    {
        public int Id { get; set; }
        public int IdPrecioLente { get; set; }
        public int IdCliente { get; set; }

        public virtual Cliente IdClienteNavigation { get; set; }
    }
}
