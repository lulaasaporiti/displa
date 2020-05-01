using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class TarjetaCredito
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int IdBanco { get; set; }
        public bool? Borrado { get; set; }

        public virtual Banco IdBancoNavigation { get; set; }
    }
}
