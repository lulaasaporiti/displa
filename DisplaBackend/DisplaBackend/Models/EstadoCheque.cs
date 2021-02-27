using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class EstadoCheque
    {
        public EstadoCheque()
        {
            Cheque = new HashSet<Cheque>();
        }

        public int Id { get; set; }
        public string Descripcion { get; set; }

        public virtual ICollection<Cheque> Cheque { get; set; }
    }
}
