using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Lente
    {
        public Lente()
        {
            ComprobanteItemLente = new HashSet<ComprobanteItemLente>();
            PrecioLente = new HashSet<PrecioLente>();
            RecargoLente = new HashSet<RecargoLente>();
            VentaVirtual = new HashSet<VentaVirtual>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public string DescripcionFactura { get; set; }
        public string Combinacion { get; set; }
        public string GraduacionesCilindricas { get; set; }
        public bool? MediosPares { get; set; }
        public int? IdUsuario { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public double? IngresosBrutos { get; set; }
        public bool Borrado { get; set; }

        public virtual ICollection<ComprobanteItemLente> ComprobanteItemLente { get; set; }
        public virtual ICollection<PrecioLente> PrecioLente { get; set; }
        public virtual ICollection<RecargoLente> RecargoLente { get; set; }
        public virtual ICollection<VentaVirtual> VentaVirtual { get; set; }
    }
}
