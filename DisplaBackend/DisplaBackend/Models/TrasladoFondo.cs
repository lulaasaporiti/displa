using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class TrasladoFondo
    {
        public int Id { get; set; }
        public int IdCuentaOrigen { get; set; }
        public int IdCuentaDestino { get; set; }
        public string Descripcion { get; set; }
        public decimal Monto { get; set; }
        public DateTime Fecha { get; set; }

        public virtual CuentaBancaria IdCuentaDestinoNavigation { get; set; }
        public virtual CuentaBancaria IdCuentaOrigenNavigation { get; set; }
    }
}
