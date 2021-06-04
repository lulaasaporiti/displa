using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Remito
    {
        public Remito()
        {
            ComprobanteItem = new HashSet<ComprobanteItem>();
            VentaVirtual = new HashSet<VentaVirtual>();
        }

        public int Id { get; set; }
        public int Numero { get; set; }
        public DateTime Fecha { get; set; }
        public DateTime? FechaFactura { get; set; }
        public DateTime? FechaAnulado { get; set; }
        public int IdCliente { get; set; }
        public int IdUsuario { get; set; }
        public bool Impreso { get; set; }
        public string MotivoAnulado { get; set; }
        public int? IdUsuarioAnulacion { get; set; }

        public virtual Cliente IdClienteNavigation { get; set; }
        public virtual AspNetUsers IdUsuarioAnulacionNavigation { get; set; }
        public virtual AspNetUsers IdUsuarioNavigation { get; set; }
        public virtual ICollection<ComprobanteItem> ComprobanteItem { get; set; }
        public virtual ICollection<VentaVirtual> VentaVirtual { get; set; }
    }
}
