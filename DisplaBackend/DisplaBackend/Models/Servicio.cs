using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Servicio
    {
        public Servicio()
        {
            PrecioServicio = new HashSet<PrecioServicio>();
            VentaVirtual = new HashSet<VentaVirtual>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public int IdTipoServicio { get; set; }
        public bool Borrado { get; set; }

        public virtual TipoServicio IdTipoServicioNavigation { get; set; }
        public virtual ICollection<PrecioServicio> PrecioServicio { get; set; }
        public virtual ICollection<VentaVirtual> VentaVirtual { get; set; }
    }
}
