using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class TipoInsumo
    {
        public TipoInsumo()
        {
            Insumo = new HashSet<Insumo>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; }
        public bool NotificaStockMinimo { get; set; }
        public bool Borrado { get; set; }

        public ICollection<Insumo> Insumo { get; set; }
    }
}
