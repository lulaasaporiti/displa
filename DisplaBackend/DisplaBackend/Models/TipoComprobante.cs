using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class TipoComprobante
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public string Codigo { get; set; }
    }
}
