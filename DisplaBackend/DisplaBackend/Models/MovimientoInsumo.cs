﻿using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class MovimientoInsumo
    {
        public int Id { get; set; }
        public int IdInsumo { get; set; }
        public string TipoMovimiento { get; set; }
        public int IdUsuario { get; set; }
        public DateTime Fecha { get; set; }
        public int Cantidad { get; set; }

        public virtual Insumo IdInsumoNavigation { get; set; }
        public virtual AspNetUsers IdUsuarioNavigation { get; set; }
    }
}
