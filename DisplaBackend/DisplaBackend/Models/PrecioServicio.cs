using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class PrecioServicio
    {
        public PrecioServicio()
        {
            PrecioServicioCliente = new HashSet<PrecioServicioCliente>();
        }

        public int Id { get; set; }
        public int IdServicio { get; set; }
        public double Precio { get; set; }

        public virtual Servicio IdServicioNavigation { get; set; }
        public virtual ICollection<PrecioServicioCliente> PrecioServicioCliente { get; set; }
    }
}
