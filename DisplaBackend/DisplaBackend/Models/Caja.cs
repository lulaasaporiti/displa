using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Caja
    {
        public int Id { get; set; }
        public int NumeroCajaGrande { get; set; }
        public int NumeroCajaChica { get; set; }
        public int Cantidad { get; set; }
        public int IdMovimientoBlock { get; set; }

        public MovimientoBlock IdMovimientoBlockNavigation { get; set; }
    }
}
