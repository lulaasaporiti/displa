using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class ComprobanteItemRecargo
    {
        public int Id { get; set; }
        public int IdRecargo { get; set; }
        public int IdComprobanteItem { get; set; }
        public decimal Monto { get; set; }

        public virtual ComprobanteItem IdComprobanteItemNavigation { get; set; }
        public virtual RecargoLente IdRecargoNavigation { get; set; }
    }
}
