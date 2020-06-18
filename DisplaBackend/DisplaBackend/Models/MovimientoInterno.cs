using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class MovimientoInterno
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public int IdTipoComprobante { get; set; }
        public double Monto { get; set; }
        public string Observaciones { get; set; }
        public int? IdCliente { get; set; }
        public int? IdProveedor { get; set; }
        public DateTime? FechaAnulacion { get; set; }
        public string MotivoAnulado { get; set; }
    }
}
