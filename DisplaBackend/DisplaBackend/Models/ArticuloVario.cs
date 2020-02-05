using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class ArticuloVario
    {
        public ArticuloVario()
        {
            PrecioArticulo = new HashSet<PrecioArticulo>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public int StockMinimo { get; set; }
        public int StockActual { get; set; }
        public double PrecioCosto { get; set; }
        public double PorcentajeUtilidad { get; set; }
        public int IdTipoArticulo { get; set; }
        public bool Borrado { get; set; }

        public virtual TipoArticulo IdTipoArticuloNavigation { get; set; }
        public virtual ICollection<PrecioArticulo> PrecioArticulo { get; set; }
    }
}
