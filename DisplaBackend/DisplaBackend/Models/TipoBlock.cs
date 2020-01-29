using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class TipoBlock
    {
        public TipoBlock()
        {
            Block = new HashSet<Block>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public bool Borrado { get; set; }

        public virtual ICollection<Block> Block { get; set; }
    }
}
