using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class ArticuloVario
    {
        public ArticuloVario()
        {
            ComprobanteItem = new HashSet<ComprobanteItem>();
            PrecioArticulo = new HashSet<PrecioArticulo>();
            VentaVirtual = new HashSet<VentaVirtual>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public int StockMinimo { get; set; }
        public decimal StockActual { get; set; }
        public decimal PrecioCosto { get; set; }
        public double PorcentajeUtilidad { get; set; }
        public int IdTipoArticulo { get; set; }
        public bool Borrado { get; set; }

        public virtual TipoArticulo IdTipoArticuloNavigation { get; set; }
        public virtual ICollection<ComprobanteItem> ComprobanteItem { get; set; }
        public virtual ICollection<PrecioArticulo> PrecioArticulo { get; set; }
        public virtual ICollection<VentaVirtual> VentaVirtual { get; set; }
    }
}
