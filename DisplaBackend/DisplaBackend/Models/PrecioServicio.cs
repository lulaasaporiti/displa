using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class PrecioServicio
    {
        public PrecioServicio()
        {
            PrecioEspecialServicioCliente = new HashSet<PrecioEspecialServicioCliente>();
        }

        public int Id { get; set; }
        public int IdServicio { get; set; }
        public double Precio { get; set; }

        public virtual Servicio IdServicioNavigation { get; set; }
        public virtual ICollection<PrecioEspecialServicioCliente> PrecioEspecialServicioCliente { get; set; }
    }
}
