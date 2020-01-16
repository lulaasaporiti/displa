﻿using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Insumo
    {
        public Insumo()
        {
            InsumoProveedor = new HashSet<InsumoProveedor>();
            MovimientoInsumo = new HashSet<MovimientoInsumo>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public double PrecioCosto { get; set; }
        public int StockMinimo { get; set; }
        public int StockActual { get; set; }
        public int IdTipoInsumo { get; set; }
        public bool Borrado { get; set; }

        public TipoInsumo IdTipoInsumoNavigation { get; set; }
        public ICollection<InsumoProveedor> InsumoProveedor { get; set; }
        public ICollection<MovimientoInsumo> MovimientoInsumo { get; set; }
    }
}
