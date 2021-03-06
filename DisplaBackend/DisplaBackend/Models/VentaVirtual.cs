﻿using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class VentaVirtual
    {
        public VentaVirtual()
        {
            VentaVirtualMovimientos = new HashSet<VentaVirtualMovimientos>();
        }

        public int Id { get; set; }
        public string Descripcion { get; set; }
        public decimal CantidadVendida { get; set; }
        public decimal CantidadEntregada { get; set; }
        public int? IdComprobante { get; set; }
        public int? IdRemito { get; set; }
        public int? IdArticulo { get; set; }
        public int? IdLente { get; set; }
        public bool Impreso { get; set; }
        public int? IdUsuario { get; set; }
        public int? IdServicio { get; set; }
        public decimal Monto { get; set; }

        public virtual ArticuloVario IdArticuloNavigation { get; set; }
        public virtual ComprobanteCliente IdComprobanteNavigation { get; set; }
        public virtual Lente IdLenteNavigation { get; set; }
        public virtual Remito IdRemitoNavigation { get; set; }
        public virtual Servicio IdServicioNavigation { get; set; }
        public virtual AspNetUsers IdUsuarioNavigation { get; set; }
        public virtual ICollection<VentaVirtualMovimientos> VentaVirtualMovimientos { get; set; }
    }
}
