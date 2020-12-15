using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Ubicacion
    {
        public Ubicacion()
        {
            Caja = new HashSet<Caja>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public bool Borrado { get; set; }

        public virtual ICollection<Caja> Caja { get; set; }
    }
}
