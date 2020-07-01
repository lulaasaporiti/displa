using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class ClienteBloqueo
    {
        public int Id { get; set; }
        public int IdCliente { get; set; }
        public string Motivo { get; set; }
        public DateTime Fecha { get; set; }

        public virtual Cliente IdClienteNavigation { get; set; }
    }
}
