using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class VirtualComprobante
    {
        public int Id { get; set; }
        public int IdComprobante { get; set; }
        public int IdVentaVirtual { get; set; }
        public decimal CantidadEntregada { get; set; }
    }
}
