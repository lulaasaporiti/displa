﻿using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class RecargoLente
    {
        public int Id { get; set; }
        public int IdLente { get; set; }
        public string Descripcion { get; set; }
        public double Porcentaje { get; set; }

        public virtual Lente IdLenteNavigation { get; set; }
    }
}
