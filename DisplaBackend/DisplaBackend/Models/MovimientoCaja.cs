using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class MovimientoCaja
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public string Descripcion { get; set; }
        public decimal Monto { get; set; }
        public bool Entrada { get; set; }
        public int? IdRecibo { get; set; }
        public int? IdReciboProveedor { get; set; }
        public DateTime? FechaAnulado { get; set; }
        public bool Efectivo { get; set; }
    }
}
