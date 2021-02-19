using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Cheque
    {
        public int Id { get; set; }
        public int Numero { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Importe { get; set; }
        public int? IdRecibo { get; set; }
        public int IdBanco { get; set; }
        public DateTime FechaAlta { get; set; }
        public DateTime? FechaAnulado { get; set; }
        public string MotivoAnulado { get; set; }
        public int IdCliente { get; set; }
        public int? IdOperacionBancaria { get; set; }

        public virtual Banco IdBancoNavigation { get; set; }
        public virtual Cliente IdClienteNavigation { get; set; }
        public virtual OperacionBancaria IdOperacionBancariaNavigation { get; set; }
        public virtual Recibo IdReciboNavigation { get; set; }
    }
}
