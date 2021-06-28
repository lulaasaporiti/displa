using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Gasto
    {
        public Gasto()
        {
            ComprobanteProveedor = new HashSet<ComprobanteProveedor>();
        }

        public int Id { get; set; }
        public string Descripcion { get; set; }

        public virtual ICollection<ComprobanteProveedor> ComprobanteProveedor { get; set; }
    }
}
