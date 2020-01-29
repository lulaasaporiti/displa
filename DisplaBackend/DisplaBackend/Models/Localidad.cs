using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Localidad
    {
        public Localidad()
        {
            Cliente = new HashSet<Cliente>();
            Proveedor = new HashSet<Proveedor>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Cp { get; set; }
        public int IdProvincia { get; set; }
        public bool Borrado { get; set; }

        public virtual Provincia IdProvinciaNavigation { get; set; }
        public virtual ICollection<Cliente> Cliente { get; set; }
        public virtual ICollection<Proveedor> Proveedor { get; set; }
    }
}
