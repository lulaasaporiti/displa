using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Cliente
    {
        public Cliente()
        {
            Cheque = new HashSet<Cheque>();
            ClienteBloqueo = new HashSet<ClienteBloqueo>();
            ComprobanteCliente = new HashSet<ComprobanteCliente>();
            Ficha = new HashSet<Ficha>();
            MovimientoInterno = new HashSet<MovimientoInterno>();
            PrecioArticuloCliente = new HashSet<PrecioArticuloCliente>();
            PrecioLenteCliente = new HashSet<PrecioLenteCliente>();
            PrecioServicioCliente = new HashSet<PrecioServicioCliente>();
            Recibo = new HashSet<Recibo>();
            Remito = new HashSet<Remito>();
            Sobre = new HashSet<Sobre>();
        }

        public int Id { get; set; }
        public string Optica { get; set; }
        public string Cuit { get; set; }
        public string Responsable { get; set; }
        public string Direccion { get; set; }
        public string Telefonos { get; set; }
        public bool UtilizaSobre { get; set; }
        public double MontoCredito { get; set; }
        public int? PlazoCredito { get; set; }
        public double? PorcentajeDescuentoGeneral { get; set; }
        public string Mail { get; set; }
        public int IdCondicionVenta { get; set; }
        public int? IdLocalidad { get; set; }
        public int IdCategoriaIva { get; set; }
        public string UsuarioWeb { get; set; }
        public string PasswordWeb { get; set; }
        public bool Bloqueado { get; set; }
        public bool Borrado { get; set; }
        public double SaldoActual { get; set; }

        public virtual CategoriaIva IdCategoriaIvaNavigation { get; set; }
        public virtual CondicionVenta IdCondicionVentaNavigation { get; set; }
        public virtual Localidad IdLocalidadNavigation { get; set; }
        public virtual ICollection<Cheque> Cheque { get; set; }
        public virtual ICollection<ClienteBloqueo> ClienteBloqueo { get; set; }
        public virtual ICollection<ComprobanteCliente> ComprobanteCliente { get; set; }
        public virtual ICollection<Ficha> Ficha { get; set; }
        public virtual ICollection<MovimientoInterno> MovimientoInterno { get; set; }
        public virtual ICollection<PrecioArticuloCliente> PrecioArticuloCliente { get; set; }
        public virtual ICollection<PrecioLenteCliente> PrecioLenteCliente { get; set; }
        public virtual ICollection<PrecioServicioCliente> PrecioServicioCliente { get; set; }
        public virtual ICollection<Recibo> Recibo { get; set; }
        public virtual ICollection<Remito> Remito { get; set; }
        public virtual ICollection<Sobre> Sobre { get; set; }
    }
}
