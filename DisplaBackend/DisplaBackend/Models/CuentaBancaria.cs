using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class CuentaBancaria
    {
        public CuentaBancaria()
        {
            OperacionBancaria = new HashSet<OperacionBancaria>();
            Recibo = new HashSet<Recibo>();
        }

        public int Id { get; set; }
        public string Numero { get; set; }
        public decimal? SaldoInicial { get; set; }
        public DateTime FechaApertura { get; set; }
        public int IdBanco { get; set; }
        public bool? Borrado { get; set; }

        public virtual Banco IdBancoNavigation { get; set; }
        public virtual ICollection<OperacionBancaria> OperacionBancaria { get; set; }
        public virtual ICollection<Recibo> Recibo { get; set; }
    }
}
