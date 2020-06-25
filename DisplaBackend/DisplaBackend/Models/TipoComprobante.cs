﻿using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class TipoComprobante
    {
        public TipoComprobante()
        {
            ComprobanteCliente = new HashSet<ComprobanteCliente>();
        }

        public int Id { get; set; }
        public string Descripcion { get; set; }
        public string Codigo { get; set; }

        public virtual ICollection<ComprobanteCliente> ComprobanteCliente { get; set; }
    }
}
