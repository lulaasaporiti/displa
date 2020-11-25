using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class ComprobanteItem
    {
        public ComprobanteItem()
        {
            ComprobanteItemLente = new HashSet<ComprobanteItemLente>();
            ComprobanteItemRecargo = new HashSet<ComprobanteItemRecargo>();
            ComprobanteItemServicio = new HashSet<ComprobanteItemServicio>();
            Remito = new HashSet<Remito>();
        }

        public int Id { get; set; }
        public int IdComprobante { get; set; }
        public int? IdArticulo { get; set; }
        public int? IdServicio { get; set; }
        public int? NumeroSobre { get; set; }
        public string Descripcion { get; set; }
        public int Cantidad { get; set; }
        public double Monto { get; set; }
        public int? Iibb { get; set; }
        public string Recargo { get; set; }
        public bool EntregaVentaVirtual { get; set; }
        public bool VentaVirtual { get; set; }

        public virtual ArticuloVario IdArticuloNavigation { get; set; }
        public virtual ComprobanteCliente IdComprobanteNavigation { get; set; }
        public virtual Servicio IdServicioNavigation { get; set; }
        public virtual ICollection<ComprobanteItemLente> ComprobanteItemLente { get; set; }
        public virtual ICollection<ComprobanteItemRecargo> ComprobanteItemRecargo { get; set; }
        public virtual ICollection<ComprobanteItemServicio> ComprobanteItemServicio { get; set; }
        public virtual ICollection<Remito> Remito { get; set; }
    }
}
