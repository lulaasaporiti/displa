using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Provincia
    {
        public Provincia()
        {
            Localidad = new HashSet<Localidad>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Pais { get; set; }
        public bool Borrado { get; set; }

        public ICollection<Localidad> Localidad { get; set; }
    }
}
