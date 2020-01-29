using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DisplaBackend.Models
{
    public partial class DisplaNEWContext : DbContext
    {
        public DisplaNEWContext()
        {
        }

        public DisplaNEWContext(DbContextOptions<DisplaNEWContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AspNetRoleClaims> AspNetRoleClaims { get; set; }
        public virtual DbSet<AspNetRoles> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaims> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogins> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUserRoles> AspNetUserRoles { get; set; }
        public virtual DbSet<AspNetUsers> AspNetUsers { get; set; }
        public virtual DbSet<AspNetUserTokens> AspNetUserTokens { get; set; }
        public virtual DbSet<Block> Block { get; set; }
        public virtual DbSet<Caja> Caja { get; set; }
        public virtual DbSet<Insumo> Insumo { get; set; }
        public virtual DbSet<InsumoProveedor> InsumoProveedor { get; set; }
        public virtual DbSet<Localidad> Localidad { get; set; }
        public virtual DbSet<MovimientoBlock> MovimientoBlock { get; set; }
        public virtual DbSet<MovimientoInsumo> MovimientoInsumo { get; set; }
        public virtual DbSet<Proveedor> Proveedor { get; set; }
        public virtual DbSet<Provincia> Provincia { get; set; }
        public virtual DbSet<TipoBlock> TipoBlock { get; set; }
        public virtual DbSet<TipoInsumo> TipoInsumo { get; set; }
        public virtual DbSet<Ubicacion> Ubicacion { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AspNetRoles>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.NormalizedName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetUserClaims>(entity =>
            {
                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserClaims)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserLogins>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserLogins)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserRoles>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId });

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AspNetUserRoles_AspNetRoles");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUsers>(entity =>
            {
                entity.Property(e => e.Activo)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Apellido).HasMaxLength(100);

                entity.Property(e => e.Email).HasMaxLength(256);

                entity.Property(e => e.Nombre).HasMaxLength(100);

                entity.Property(e => e.NormalizedEmail).HasMaxLength(256);

                entity.Property(e => e.NormalizedUserName).HasMaxLength(256);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetUserTokens>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });
            });

            modelBuilder.Entity<Block>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Borrado).HasColumnName("borrado");

                entity.Property(e => e.IdTipoBlock).HasColumnName("idTipoBlock");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(100);

                entity.Property(e => e.PrecioCosto).HasColumnName("precioCosto");

                entity.Property(e => e.StockActual).HasColumnName("stockActual");

                entity.Property(e => e.StockMinimo).HasColumnName("stockMinimo");

                entity.HasOne(d => d.IdTipoBlockNavigation)
                    .WithMany(p => p.Block)
                    .HasForeignKey(d => d.IdTipoBlock)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Block_TipoBlock");
            });

            modelBuilder.Entity<Caja>(entity =>
            {
                entity.HasIndex(e => e.Id)
                    .HasName("IX_Caja")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cantidad).HasColumnName("cantidad");

                entity.Property(e => e.IdMovimientoBlock).HasColumnName("idMovimientoBlock");

                entity.Property(e => e.NumeroCajaChica).HasColumnName("numeroCajaChica");

                entity.Property(e => e.NumeroCajaGrande).HasColumnName("numeroCajaGrande");

                entity.HasOne(d => d.IdMovimientoBlockNavigation)
                    .WithMany(p => p.Caja)
                    .HasForeignKey(d => d.IdMovimientoBlock)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Caja_MovimientoBlock");
            });

            modelBuilder.Entity<Insumo>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Borrado).HasColumnName("borrado");

                entity.Property(e => e.IdTipoInsumo).HasColumnName("idTipoInsumo");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(150);

                entity.Property(e => e.PrecioCosto).HasColumnName("precioCosto");

                entity.Property(e => e.StockActual).HasColumnName("stockActual");

                entity.Property(e => e.StockMinimo).HasColumnName("stockMinimo");

                entity.HasOne(d => d.IdTipoInsumoNavigation)
                    .WithMany(p => p.Insumo)
                    .HasForeignKey(d => d.IdTipoInsumo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Insumo_TipoInsumo");
            });

            modelBuilder.Entity<InsumoProveedor>(entity =>
            {
                entity.HasKey(e => new { e.IdInsumo, e.IdProveedor });

                entity.Property(e => e.IdInsumo).HasColumnName("idInsumo");

                entity.Property(e => e.IdProveedor).HasColumnName("idProveedor");

                entity.HasOne(d => d.IdInsumoNavigation)
                    .WithMany(p => p.InsumoProveedor)
                    .HasForeignKey(d => d.IdInsumo)
                    .HasConstraintName("FK_InsumoProveedor_Insumo");
            });

            modelBuilder.Entity<Localidad>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Borrado).HasColumnName("borrado");

                entity.Property(e => e.Cp)
                    .IsRequired()
                    .HasColumnName("cp")
                    .HasMaxLength(50);

                entity.Property(e => e.IdProvincia).HasColumnName("idProvincia");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(150);

                entity.HasOne(d => d.IdProvinciaNavigation)
                    .WithMany(p => p.Localidad)
                    .HasForeignKey(d => d.IdProvincia)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Localidad_Provincia");
            });

            modelBuilder.Entity<MovimientoBlock>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Adicion).HasColumnName("adicion");

                entity.Property(e => e.Base).HasColumnName("base");

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasColumnType("date");

                entity.Property(e => e.IdBlock).HasColumnName("idBlock");

                entity.Property(e => e.IdUbicacion).HasColumnName("idUbicacion");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Precio).HasColumnName("precio");

                entity.Property(e => e.TipoMovimiento)
                    .IsRequired()
                    .HasColumnName("tipoMovimiento")
                    .HasMaxLength(50);

                entity.HasOne(d => d.IdBlockNavigation)
                    .WithMany(p => p.MovimientoBlock)
                    .HasForeignKey(d => d.IdBlock)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MovimientoBlock_Block");

                entity.HasOne(d => d.IdUbicacionNavigation)
                    .WithMany(p => p.MovimientoBlock)
                    .HasForeignKey(d => d.IdUbicacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MovimientoBlock_Ubicacion");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.MovimientoBlock)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MovimientoBlock_AspNetUsers");
            });

            modelBuilder.Entity<MovimientoInsumo>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cantidad).HasColumnName("cantidad");

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasColumnType("date");

                entity.Property(e => e.IdInsumo).HasColumnName("idInsumo");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.TipoMovimiento)
                    .IsRequired()
                    .HasColumnName("tipoMovimiento")
                    .HasMaxLength(50);

                entity.HasOne(d => d.IdInsumoNavigation)
                    .WithMany(p => p.MovimientoInsumo)
                    .HasForeignKey(d => d.IdInsumo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MovimientoInsumo_Insumo");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.MovimientoInsumo)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MovimientoInsumo_AspNetUsers");
            });

            modelBuilder.Entity<Proveedor>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Borrado).HasColumnName("borrado");

                entity.Property(e => e.Domicilio)
                    .HasColumnName("domicilio")
                    .HasMaxLength(200);

                entity.Property(e => e.IdLocalidad).HasColumnName("idLocalidad");

                entity.Property(e => e.Mail)
                    .HasColumnName("mail")
                    .HasMaxLength(50);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(150);

                entity.Property(e => e.Telefonos)
                    .HasColumnName("telefonos")
                    .HasMaxLength(100);

                entity.Property(e => e.UtilizaIibb)
                    .HasColumnName("utilizaIIBB")
                    .HasDefaultValueSql("((0))");

                entity.HasOne(d => d.IdLocalidadNavigation)
                    .WithMany(p => p.Proveedor)
                    .HasForeignKey(d => d.IdLocalidad)
                    .HasConstraintName("FK_Proveedor_Localidad");
            });

            modelBuilder.Entity<Provincia>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Borrado).HasColumnName("borrado");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(100);

                entity.Property(e => e.Pais)
                    .HasColumnName("pais")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TipoBlock>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Borrado).HasColumnName("borrado");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<TipoInsumo>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Borrado).HasColumnName("borrado");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(100);

                entity.Property(e => e.NotificaStockMinimo).HasColumnName("notificaStockMinimo");
            });

            modelBuilder.Entity<Ubicacion>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Borrado).HasColumnName("borrado");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(100);
            });
        }
    }
}
