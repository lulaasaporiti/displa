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

        public Block IdBlockNavigation { get; set; }
        public Ubicacion IdUbicacionNavigation { get; set; }
        public AspNetUsers IdUsuarioNavigation { get; set; }
        public ICollection<Caja> Caja { get; set; }
    }
}
