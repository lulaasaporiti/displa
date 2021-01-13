using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class TipoArticulo
    {
        public TipoArticulo()
        {
            ArticuloVario = new HashSet<ArticuloVario>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public double? IngresosBrutos { get; set; }
        public bool Borrado { get; set; }
        public decimal? Iva { get; set; }

        public virtual ICollection<ArticuloVario> ArticuloVario { get; set; }
    }
}
