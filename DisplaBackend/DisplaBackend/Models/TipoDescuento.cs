using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class TipoDescuento
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public decimal Porcentaje { get; set; }
        public bool Borrado { get; set; }
    }
}
