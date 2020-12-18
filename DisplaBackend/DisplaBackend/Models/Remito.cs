﻿using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Remito
    {
        public Remito()
        {
            ComprobanteItem = new HashSet<ComprobanteItem>();
        }

        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public DateTime? FechaFactura { get; set; }
        public DateTime? FechaAnulado { get; set; }
        public int IdCliente { get; set; }
        public int IdUsuario { get; set; }

        public virtual Cliente IdClienteNavigation { get; set; }
        public virtual AspNetUsers IdUsuarioNavigation { get; set; }
        public virtual ICollection<ComprobanteItem> ComprobanteItem { get; set; }
    }
}
