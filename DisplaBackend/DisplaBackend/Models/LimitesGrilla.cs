using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class LimitesGrilla
    {
        public int Id { get; set; }
        public string Combinacion { get; set; }
        public double LimiteInferiorEsferico { get; set; }
        public double LimiteSuperiorEsferico { get; set; }
        public double LimiteInferiorCilindrico { get; set; }
        public double LimiteSuperiorCilindrico { get; set; }
        public bool Borrado { get; set; }
    }
}
