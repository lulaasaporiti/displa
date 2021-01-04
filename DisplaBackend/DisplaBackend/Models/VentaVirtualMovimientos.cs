using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class VentaVirtualMovimientos
    {
        public int Id { get; set; }
        public int IdVentaVirtual { get; set; }
        public decimal? Cantidad { get; set; }
        public bool Entrega { get; set; }
        public int IdUsuario { get; set; }

        public virtual AspNetUsers IdUsuarioNavigation { get; set; }
        public virtual VentaVirtual IdVentaVirtualNavigation { get; set; }
    }
}
