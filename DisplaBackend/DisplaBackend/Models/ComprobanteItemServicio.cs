using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class ComprobanteItemServicio
    {
        public int Id { get; set; }
        public int IdServicio { get; set; }
        public int IdComprobanteItem { get; set; }
        public decimal Monto { get; set; }

        public virtual ComprobanteItem IdComprobanteItemNavigation { get; set; }
        public virtual Servicio IdServicioNavigation { get; set; }
    }
}
