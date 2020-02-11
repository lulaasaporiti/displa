﻿using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class PrecioLente
    {
        public int Id { get; set; }
        public int IdLente { get; set; }
        public double Precio { get; set; }
        public int Esferico { get; set; }
        public int Cilindrico { get; set; }

        public virtual Lente IdLenteNavigation { get; set; }
    }
}
