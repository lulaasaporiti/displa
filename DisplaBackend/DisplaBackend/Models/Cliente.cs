using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class Cliente
    {
        public Cliente()
        {
            PrecioEspecialLenteCliente = new HashSet<PrecioEspecialLenteCliente>();
            PrecioEspecialServicioCliente = new HashSet<PrecioEspecialServicioCliente>();
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
        public int? IdCondicionVenta { get; set; }
        public int? IdLocalidad { get; set; }
        public int? IdCategoriaIva { get; set; }
        public string UsuarioWeb { get; set; }
        public string PasswordWeb { get; set; }
        public bool? Bloqueado { get; set; }
        public bool? Borrado { get; set; }

        public virtual CategoriaIva IdCategoriaIvaNavigation { get; set; }
        public virtual CondicionVenta IdCondicionVentaNavigation { get; set; }
        public virtual Localidad IdLocalidadNavigation { get; set; }
        public virtual PrecioEspecialArticuloCliente PrecioEspecialArticuloCliente { get; set; }
        public virtual ICollection<PrecioEspecialLenteCliente> PrecioEspecialLenteCliente { get; set; }
        public virtual ICollection<PrecioEspecialServicioCliente> PrecioEspecialServicioCliente { get; set; }
    }
}
