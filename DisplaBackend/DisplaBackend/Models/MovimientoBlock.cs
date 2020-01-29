using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class MovimientoBlock
    {
        public MovimientoBlock()
        {
            Caja = new HashSet<Caja>();
        }

        public int Id { get; set; }
        public int IdBlock { get; set; }
        public int IdUbicacion { get; set; }
        public string TipoMovimiento { get; set; }
        public int IdUsuario { get; set; }
        public DateTime Fecha { get; set; }
        public double Base { get; set; }
        public double? Adicion { get; set; }
        public double Precio { get; set; }

        public virtual Block IdBlockNavigation { get; set; }
        public virtual Ubicacion IdUbicacionNavigation { get; set; }
        public virtual AspNetUsers IdUsuarioNavigation { get; set; }
        public virtual ICollection<Caja> Caja { get; set; }
    }
}
