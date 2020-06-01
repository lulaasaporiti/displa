using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Ficha
    {
        public int Id { get; set; }
        public DateTime? Fecha { get; set; }
        public string Descripcion { get; set; }
        public int IdCliente { get; set; }

        public virtual Cliente IdClienteNavigation { get; set; }
    }
}
