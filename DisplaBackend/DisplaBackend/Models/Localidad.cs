using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Localidad
    {
        public Localidad()
        {
            Proveedor = new HashSet<Proveedor>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Cp { get; set; }
        public int IdProvincia { get; set; }

        public Provincia IdProvinciaNavigation { get; set; }
        public ICollection<Proveedor> Proveedor { get; set; }
    }
}
