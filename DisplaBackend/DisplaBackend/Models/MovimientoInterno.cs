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
        public DateTime? FechaAnulado { get; set; }
        public string MotivoAnulado { get; set; }
        public int? IdUsuario { get; set; }
        public int? IdUsuarioAnulacion { get; set; }

        public virtual Cliente IdClienteNavigation { get; set; }
        public virtual Proveedor IdProveedorNavigation { get; set; }
        public virtual TipoComprobante IdTipoComprobanteNavigation { get; set; }
        public virtual AspNetUsers IdUsuarioAnulacionNavigation { get; set; }
        public virtual AspNetUsers IdUsuarioNavigation { get; set; }
    }
}
