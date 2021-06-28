using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class ComprobanteIva
    {
        public int Id { get; set; }
        public int IdComprobanteProveedor { get; set; }
        public decimal Alicuota { get; set; }
        public decimal MontoIva { get; set; }
        public decimal Neto { get; set; }

        public virtual ComprobanteProveedor IdComprobanteProveedorNavigation { get; set; }
    }
}
