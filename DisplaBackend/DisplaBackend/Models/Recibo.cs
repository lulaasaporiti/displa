using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Recibo
    {
        public int Id { get; set; }
        public int IdCliente { get; set; }
        public DateTime Fecha { get; set; }
        public decimal? MontoEfectivo { get; set; }
        public decimal? MontoCheque { get; set; }
        public string Observaciones { get; set; }
        public decimal? MontoInterdeposito { get; set; }
        public int? IdCuentaBancaria { get; set; }
        public string NroInterdeposito { get; set; }

        public virtual Cliente IdClienteNavigation { get; set; }
        public virtual CuentaBancaria IdCuentaBancariaNavigation { get; set; }
    }
}
