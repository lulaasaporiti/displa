using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class PrecioEspecialServicioCliente
    {
        public int Id { get; set; }
        public int IdPrecioServicio { get; set; }
        public int IdCliente { get; set; }

        public virtual Cliente IdClienteNavigation { get; set; }
        public virtual PrecioServicio IdPrecioServicioNavigation { get; set; }
    }
}
