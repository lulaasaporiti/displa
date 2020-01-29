using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Servicio
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int IdTipoServicio { get; set; }
        public bool Borrado { get; set; }

        public virtual TipoServicio IdTipoServicioNavigation { get; set; }
    }
}
