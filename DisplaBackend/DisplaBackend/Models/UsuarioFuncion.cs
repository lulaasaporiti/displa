using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class UsuarioFuncion
    {
        public int IdUsuario { get; set; }
        public int IdFuncion { get; set; }

        public virtual Funcion IdFuncionNavigation { get; set; }
        public virtual AspNetUsers IdUsuarioNavigation { get; set; }
    }
}
