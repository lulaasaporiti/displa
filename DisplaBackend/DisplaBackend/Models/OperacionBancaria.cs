using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class OperacionBancaria
    {
        public OperacionBancaria()
        {
            Cheque = new HashSet<Cheque>();
        }

        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public string Descripcion { get; set; }
        public decimal Monto { get; set; }
        public bool? Entrada { get; set; }
        public int IdCuentaBancaria { get; set; }
        public int? IdRecibo { get; set; }
        public bool? DepositaCheque { get; set; }
        public bool? EmiteCheque { get; set; }

        public virtual CuentaBancaria IdCuentaBancariaNavigation { get; set; }
        public virtual Recibo IdReciboNavigation { get; set; }
        public virtual ICollection<Cheque> Cheque { get; set; }
    }
}
