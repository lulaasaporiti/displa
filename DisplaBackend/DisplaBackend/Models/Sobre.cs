using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Sobre
    {
        public int Id { get; set; }
        public int Numero { get; set; }
        public int Entregas { get; set; }
        public string Observaciones { get; set; }
        public DateTime Fecha { get; set; }
        public int IdCliente { get; set; }
        public int IdUsuario { get; set; }

        public virtual Cliente IdClienteNavigation { get; set; }
        public virtual AspNetUsers IdUsuarioNavigation { get; set; }
    }
}
