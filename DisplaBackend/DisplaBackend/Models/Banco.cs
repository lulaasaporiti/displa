using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Banco
    {
        public Banco()
        {
            TarjetaCredito = new HashSet<TarjetaCredito>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Cuit { get; set; }
        public string Direccion { get; set; }

        public virtual ICollection<TarjetaCredito> TarjetaCredito { get; set; }
    }
}
