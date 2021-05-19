using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class CategoriaIva
    {
        public CategoriaIva()
        {
            Cliente = new HashSet<Cliente>();
        }

        public int Id { get; set; }
        public string Descripcion { get; set; }
        public decimal? Tasa { get; set; }
        public decimal? SobreTasa { get; set; }
        public bool? Discrimina { get; set; }
        public bool? Recateg { get; set; }
        public int? CodigoRece { get; set; }
        public bool Borrado { get; set; }

        public virtual ICollection<Cliente> Cliente { get; set; }
    }
}
