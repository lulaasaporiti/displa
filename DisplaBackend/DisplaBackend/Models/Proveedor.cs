using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Proveedor
    {
        public Proveedor()
        {
            MovimientoInterno = new HashSet<MovimientoInterno>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Domicilio { get; set; }
        public string Telefonos { get; set; }
        public string Mail { get; set; }
        public int? IdLocalidad { get; set; }
        public bool? UtilizaIibb { get; set; }
        public bool Borrado { get; set; }
        public string Cuit { get; set; }

        public virtual Localidad IdLocalidadNavigation { get; set; }
        public virtual ICollection<MovimientoInterno> MovimientoInterno { get; set; }
    }
}
