using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class TipoServicio
    {
        public TipoServicio()
        {
            Servicio = new HashSet<Servicio>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public double? IngresosBrutos { get; set; }
        public bool Borrado { get; set; }

        public virtual ICollection<Servicio> Servicio { get; set; }
    }
}
