using System;
using System.Collections.Generic;

namespace DisplaBackend.Models
{
    public partial class AspNetUsers
    {
        public AspNetUsers()
        {
            AspNetUserClaims = new HashSet<AspNetUserClaims>();
            AspNetUserLogins = new HashSet<AspNetUserLogins>();
            AspNetUserRoles = new HashSet<AspNetUserRoles>();
            ComprobanteCliente = new HashSet<ComprobanteCliente>();
            MovimientoBlock = new HashSet<MovimientoBlock>();
            MovimientoInsumo = new HashSet<MovimientoInsumo>();
            Remito = new HashSet<Remito>();
            Sobre = new HashSet<Sobre>();
            VentaVirtual = new HashSet<VentaVirtual>();
            VentaVirtualMovimientos = new HashSet<VentaVirtualMovimientos>();
        }

        public int Id { get; set; }
        public int AccessFailedCount { get; set; }
        public string ConcurrencyStamp { get; set; }
        public string Email { get; set; }
        public bool? EmailConfirmed { get; set; }
        public bool LockoutEnabled { get; set; }
        public DateTimeOffset? LockoutEnd { get; set; }
        public string NormalizedEmail { get; set; }
        public string NormalizedUserName { get; set; }
        public string PasswordHash { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public string SecurityStamp { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public string UserName { get; set; }
        public bool? Activo { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }

        public virtual ICollection<AspNetUserClaims> AspNetUserClaims { get; set; }
        public virtual ICollection<AspNetUserLogins> AspNetUserLogins { get; set; }
        public virtual ICollection<AspNetUserRoles> AspNetUserRoles { get; set; }
        public virtual ICollection<ComprobanteCliente> ComprobanteCliente { get; set; }
        public virtual ICollection<MovimientoBlock> MovimientoBlock { get; set; }
        public virtual ICollection<MovimientoInsumo> MovimientoInsumo { get; set; }
        public virtual ICollection<Remito> Remito { get; set; }
        public virtual ICollection<Sobre> Sobre { get; set; }
        public virtual ICollection<VentaVirtual> VentaVirtual { get; set; }
        public virtual ICollection<VentaVirtualMovimientos> VentaVirtualMovimientos { get; set; }
    }
}
