using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Funcion
    {
        public Funcion()
        {
            InverseIdFuncionPadreNavigation = new HashSet<Funcion>();
            UsuarioFuncion = new HashSet<UsuarioFuncion>();
        }

        public int Id { get; set; }
        public string Descripcion { get; set; }
        public int? IdFuncionPadre { get; set; }

        public virtual Funcion IdFuncionPadreNavigation { get; set; }
        public virtual ICollection<Funcion> InverseIdFuncionPadreNavigation { get; set; }
        public virtual ICollection<UsuarioFuncion> UsuarioFuncion { get; set; }
    }
}
