using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Block
    {
        public Block()
        {
            MovimientoBlock = new HashSet<MovimientoBlock>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public int StockMinimo { get; set; }
        public int StockActual { get; set; }
        public double? PrecioCosto { get; set; }
        public int IdTipoBlock { get; set; }
        public bool Borrado { get; set; }

        public TipoBlock IdTipoBlockNavigation { get; set; }
        public ICollection<MovimientoBlock> MovimientoBlock { get; set; }
    }
}
