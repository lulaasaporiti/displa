﻿using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class InsumoProveedor
    {
        public int IdInsumo { get; set; }
        public int IdProveedor { get; set; }

        public Insumo IdInsumoNavigation { get; set; }
    }
}
