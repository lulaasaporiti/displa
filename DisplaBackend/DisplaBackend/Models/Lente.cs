﻿using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Lente
    {
        public Lente()
        {
            PrecioLente = new HashSet<PrecioLente>();
            RecargoLente = new HashSet<RecargoLente>();
            StockLente = new HashSet<StockLente>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string DescripcionFactura { get; set; }
        public bool ControlaStock { get; set; }
        public string Combinacion { get; set; }
        public string GraduacionesCilindricas { get; set; }
        public bool EsBifocal { get; set; }
        public bool? MediosPares { get; set; }
        public int? IdUsuario { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public double? IngresosBrutos { get; set; }
        public bool Borrado { get; set; }

        public virtual ICollection<PrecioLente> PrecioLente { get; set; }
        public virtual ICollection<RecargoLente> RecargoLente { get; set; }
        public virtual ICollection<StockLente> StockLente { get; set; }
    }
}