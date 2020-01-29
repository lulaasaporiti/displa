using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Ubicacion
    {
        public Ubicacion()
        {
            MovimientoBlock = new HashSet<MovimientoBlock>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public bool Borrado { get; set; }

        public virtual ICollection<MovimientoBlock> MovimientoBlock { get; set; }
    }
}
