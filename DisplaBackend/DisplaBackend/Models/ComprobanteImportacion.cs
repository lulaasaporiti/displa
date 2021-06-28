using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class ComprobanteImportacion
    {
        public int Id { get; set; }
        public int IdComprobanteProveedor { get; set; }
        public string Despacho { get; set; }
        public decimal CotizacionDolar { get; set; }

        public virtual ComprobanteProveedor IdComprobanteProveedorNavigation { get; set; }
    }
}
