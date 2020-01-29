using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class CondicionVenta
    {
        public CondicionVenta()
        {
            Cliente = new HashSet<Cliente>();
        }

        public int Id { get; set; }
        public string Descripcion { get; set; }

        public virtual ICollection<Cliente> Cliente { get; set; }
    }
}
