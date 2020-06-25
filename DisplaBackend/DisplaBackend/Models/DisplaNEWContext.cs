﻿using System;
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

        public virtual DbSet<ArticuloVario> ArticuloVario { get; set; }
        public virtual DbSet<AspNetRoleClaims> AspNetRoleClaims { get; set; }
        public virtual DbSet<AspNetRoles> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaims> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogins> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUserRoles> AspNetUserRoles { get; set; }
        public virtual DbSet<AspNetUserTokens> AspNetUserTokens { get; set; }
        public virtual DbSet<AspNetUsers> AspNetUsers { get; set; }
        public virtual DbSet<Banco> Banco { get; set; }
        public virtual DbSet<Block> Block { get; set; }
        public virtual DbSet<Caja> Caja { get; set; }
        public virtual DbSet<CategoriaIva> CategoriaIva { get; set; }
        public virtual DbSet<Cliente> Cliente { get; set; }
        public virtual DbSet<ComprobanteCliente> ComprobanteCliente { get; set; }
        public virtual DbSet<ComprobanteItem> ComprobanteItem { get; set; }
        public virtual DbSet<ComprobanteItemLente> ComprobanteItemLente { get; set; }
        public virtual DbSet<CondicionVenta> CondicionVenta { get; set; }
        public virtual DbSet<Ficha> Ficha { get; set; }
        public virtual DbSet<Insumo> Insumo { get; set; }
        public virtual DbSet<InsumoProveedor> InsumoProveedor { get; set; }
        public virtual DbSet<Lente> Lente { get; set; }
        public virtual DbSet<LimitesGrilla> LimitesGrilla { get; set; }
        public virtual DbSet<Localidad> Localidad { get; set; }
        public virtual DbSet<MovimientoBlock> MovimientoBlock { get; set; }
        public virtual DbSet<MovimientoInsumo> MovimientoInsumo { get; set; }
        public virtual DbSet<MovimientoInterno> MovimientoInterno { get; set; }
        public virtual DbSet<PrecioArticulo> PrecioArticulo { get; set; }
        public virtual DbSet<PrecioArticuloCliente> PrecioArticuloCliente { get; set; }
        public virtual DbSet<PrecioLente> PrecioLente { get; set; }
        public virtual DbSet<PrecioLenteCliente> PrecioLenteCliente { get; set; }
        public virtual DbSet<PrecioServicio> PrecioServicio { get; set; }
        public virtual DbSet<PrecioServicioCliente> PrecioServicioCliente { get; set; }
        public virtual DbSet<Proveedor> Proveedor { get; set; }
        public virtual DbSet<Provincia> Provincia { get; set; }
        public virtual DbSet<RecargoLente> RecargoLente { get; set; }
        public virtual DbSet<Servicio> Servicio { get; set; }
        public virtual DbSet<StockLente> StockLente { get; set; }
        public virtual DbSet<TarjetaCredito> TarjetaCredito { get; set; }
        public virtual DbSet<TipoArticulo> TipoArticulo { get; set; }
        public virtual DbSet<TipoBlock> TipoBlock { get; set; }
        public virtual DbSet<TipoComprobante> TipoComprobante { get; set; }
        public virtual DbSet<TipoInsumo> TipoInsumo { get; set; }
        public virtual DbSet<TipoServicio> TipoServicio { get; set; }
        public virtual DbSet<Ubicacion> Ubicacion { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<ArticuloVario>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Borrado).HasColumnName("borrado");

                entity.Property(e => e.IdTipoArticulo).HasColumnName("idTipoArticulo");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(200);

                entity.Property(e => e.PorcentajeUtilidad).HasColumnName("porcentajeUtilidad");

                entity.Property(e => e.PrecioCosto).HasColumnName("precioCosto");

                entity.Property(e => e.StockActual).HasColumnName("stockActual");

                entity.Property(e => e.StockMinimo).HasColumnName("stockMinimo");

                entity.HasOne(d => d.IdTipoArticuloNavigation)
                    .WithMany(p => p.ArticuloVario)
                    .HasForeignKey(d => d.IdTipoArticulo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ArticuloVario_TipoArticulo");
            });

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

            modelBuilder.Entity<AspNetUserTokens>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });
            });

            modelBuilder.Entity<AspNetUsers>(entity =>
            {
                entity.Property(e => e.Activo)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Apellido).HasMaxLength(100);

                entity.Property(e => e.Email).HasMaxLength(256);

                entity.Property(e => e.EmailConfirmed)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Nombre).HasMaxLength(100);

                entity.Property(e => e.NormalizedEmail).HasMaxLength(256);

                entity.Property(e => e.NormalizedUserName).HasMaxLength(256);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(256);
            });

            modelBuilder.Entity<Banco>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Borrado)
                    .HasColumnName("borrado")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Cuit)
                    .HasColumnName("cuit")
                    .HasMaxLength(50);

                entity.Property(e => e.Direccion)
                    .HasColumnName("direccion")
                    .HasMaxLength(50);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(100);
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

            modelBuilder.Entity<CategoriaIva>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Borrado).HasColumnName("borrado");

                entity.Property(e => e.CodigoRece).HasColumnName("codigoRECE");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(50);

                entity.Property(e => e.Discrimina)
                    .HasColumnName("discrimina")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Recateg)
                    .HasColumnName("recateg")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.SobreTasa).HasColumnName("sobreTasa");

                entity.Property(e => e.Tasa).HasColumnName("tasa");
            });

            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Bloqueado).HasColumnName("bloqueado");

                entity.Property(e => e.Borrado).HasColumnName("borrado");

                entity.Property(e => e.Cuit)
                    .IsRequired()
                    .HasColumnName("cuit")
                    .HasMaxLength(50);

                entity.Property(e => e.Direccion)
                    .HasColumnName("direccion")
                    .HasMaxLength(100);

                entity.Property(e => e.IdCategoriaIva).HasColumnName("idCategoriaIva");

                entity.Property(e => e.IdCondicionVenta).HasColumnName("idCondicionVenta");

                entity.Property(e => e.IdLocalidad).HasColumnName("idLocalidad");

                entity.Property(e => e.Mail)
                    .HasColumnName("mail")
                    .HasMaxLength(50);

                entity.Property(e => e.MontoCredito).HasColumnName("montoCredito");

                entity.Property(e => e.Optica)
                    .IsRequired()
                    .HasColumnName("optica")
                    .HasMaxLength(100);

                entity.Property(e => e.PasswordWeb)
                    .HasColumnName("passwordWeb")
                    .HasMaxLength(50);

                entity.Property(e => e.PlazoCredito).HasColumnName("plazoCredito");

                entity.Property(e => e.PorcentajeDescuentoGeneral).HasColumnName("porcentajeDescuentoGeneral");

                entity.Property(e => e.Responsable)
                    .HasColumnName("responsable")
                    .HasMaxLength(100);

                entity.Property(e => e.SaldoActual).HasColumnName("saldoActual");

                entity.Property(e => e.Telefonos)
                    .HasColumnName("telefonos")
                    .HasMaxLength(50);

                entity.Property(e => e.UsuarioWeb)
                    .HasColumnName("usuarioWeb")
                    .HasMaxLength(50);

                entity.Property(e => e.UtilizaSobre).HasColumnName("utilizaSobre");

                entity.HasOne(d => d.IdCategoriaIvaNavigation)
                    .WithMany(p => p.Cliente)
                    .HasForeignKey(d => d.IdCategoriaIva)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Cliente_CategoriaIva");

                entity.HasOne(d => d.IdCondicionVentaNavigation)
                    .WithMany(p => p.Cliente)
                    .HasForeignKey(d => d.IdCondicionVenta)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Cliente_CondicionVenta");

                entity.HasOne(d => d.IdLocalidadNavigation)
                    .WithMany(p => p.Cliente)
                    .HasForeignKey(d => d.IdLocalidad)
                    .HasConstraintName("FK_Cliente_Localidad");
            });

            modelBuilder.Entity<ComprobanteCliente>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasColumnType("date");

                entity.Property(e => e.IdCliente).HasColumnName("idCliente");

                entity.Property(e => e.IdTipoComprobante).HasColumnName("idTipoComprobante");

                entity.Property(e => e.Letra)
                    .IsRequired()
                    .HasColumnName("letra")
                    .HasMaxLength(5);

                entity.Property(e => e.MontoIibb).HasColumnName("montoIIBB");

                entity.Property(e => e.MontoIvari).HasColumnName("montoIVARI");

                entity.Property(e => e.MontoTotal).HasColumnName("montoTotal");

                entity.Property(e => e.MontoTseh).HasColumnName("montoTSEH");

                entity.Property(e => e.Numero).HasColumnName("numero");

                entity.Property(e => e.PorcentajeDtoGral).HasColumnName("porcentajeDtoGral");

                entity.Property(e => e.SubTotalFactura).HasColumnName("subTotalFactura");

                entity.Property(e => e.Sucursal).HasColumnName("sucursal");

                entity.Property(e => e.TasaIva).HasColumnName("tasaIVA");

                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.ComprobanteCliente)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ComprobanteCliente_Cliente");

                entity.HasOne(d => d.IdTipoComprobanteNavigation)
                    .WithMany(p => p.ComprobanteCliente)
                    .HasForeignKey(d => d.IdTipoComprobante)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ComprobanteCliente_TipoComprobante");
            });

            modelBuilder.Entity<ComprobanteItem>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cantidad).HasColumnName("cantidad");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(250);

                entity.Property(e => e.EntregaVentaVirtual).HasColumnName("entregaVentaVirtual");

                entity.Property(e => e.IdArticulo).HasColumnName("idArticulo");

                entity.Property(e => e.IdComprobante).HasColumnName("idComprobante");

                entity.Property(e => e.Iibb).HasColumnName("IIBB");

                entity.Property(e => e.Monto).HasColumnName("monto");

                entity.Property(e => e.NumeroSobre).HasColumnName("numeroSobre");

                entity.Property(e => e.Recargo)
                    .HasColumnName("recargo")
                    .HasMaxLength(50);

                entity.Property(e => e.VentaVirtual).HasColumnName("ventaVirtual");

                entity.HasOne(d => d.IdArticuloNavigation)
                    .WithMany(p => p.ComprobanteItem)
                    .HasForeignKey(d => d.IdArticulo)
                    .HasConstraintName("FK_ComprobanteItem_ArticuloVario");

                entity.HasOne(d => d.IdComprobanteNavigation)
                    .WithMany(p => p.ComprobanteItem)
                    .HasForeignKey(d => d.IdComprobante)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ComprobanteItem_ComprobanteCliente");
            });

            modelBuilder.Entity<ComprobanteItemLente>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cantidad).HasColumnName("cantidad");

                entity.Property(e => e.Cilindrico).HasColumnName("cilindrico");

                entity.Property(e => e.Esferico).HasColumnName("esferico");

                entity.Property(e => e.IdComprobanteItem).HasColumnName("idComprobanteItem");

                entity.Property(e => e.IdLente).HasColumnName("idLente");

                entity.Property(e => e.Precio).HasColumnName("precio");

                entity.HasOne(d => d.IdComprobanteItemNavigation)
                    .WithMany(p => p.ComprobanteItemLente)
                    .HasForeignKey(d => d.IdComprobanteItem)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ComprobanteItemLente_ComprobanteItem");

                entity.HasOne(d => d.IdLenteNavigation)
                    .WithMany(p => p.ComprobanteItemLente)
                    .HasForeignKey(d => d.IdLente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ComprobanteItemLente_Lente");
            });

            modelBuilder.Entity<CondicionVenta>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Borrado).HasColumnName("borrado");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Ficha>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(500);

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasColumnType("date");

                entity.Property(e => e.IdCliente).HasColumnName("idCliente");

                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.Ficha)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Ficha_Cliente");
            });

            modelBuilder.Entity<Insumo>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

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

            modelBuilder.Entity<Lente>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Borrado).HasColumnName("borrado");

                entity.Property(e => e.Combinacion)
                    .HasColumnName("combinacion")
                    .HasMaxLength(10);

                entity.Property(e => e.ControlaStock).HasColumnName("controlaStock");

                entity.Property(e => e.DescripcionFactura)
                    .HasColumnName("descripcionFactura")
                    .HasMaxLength(50);

                entity.Property(e => e.EsBifocal).HasColumnName("esBifocal");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnName("fechaCreacion")
                    .HasColumnType("date");

                entity.Property(e => e.GraduacionesCilindricas)
                    .HasColumnName("graduacionesCilindricas")
                    .HasMaxLength(1);

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.IngresosBrutos).HasColumnName("ingresosBrutos");

                entity.Property(e => e.MediosPares)
                    .HasColumnName("mediosPares")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<LimitesGrilla>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Borrado).HasColumnName("borrado");

                entity.Property(e => e.Combinacion)
                    .IsRequired()
                    .HasColumnName("combinacion")
                    .HasMaxLength(50);

                entity.Property(e => e.LimiteInferiorCilindrico).HasColumnName("limiteInferiorCilindrico");

                entity.Property(e => e.LimiteInferiorEsferico).HasColumnName("limiteInferiorEsferico");

                entity.Property(e => e.LimiteSuperiorCilindrico).HasColumnName("limiteSuperiorCilindrico");

                entity.Property(e => e.LimiteSuperiorEsferico).HasColumnName("limiteSuperiorEsferico");
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

            modelBuilder.Entity<MovimientoInterno>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasColumnType("date");

                entity.Property(e => e.FechaAnulacion)
                    .HasColumnName("fechaAnulacion")
                    .HasColumnType("date");

                entity.Property(e => e.IdCliente).HasColumnName("idCliente");

                entity.Property(e => e.IdProveedor).HasColumnName("idProveedor");

                entity.Property(e => e.IdTipoComprobante).HasColumnName("idTipoComprobante");

                entity.Property(e => e.Monto).HasColumnName("monto");

                entity.Property(e => e.MotivoAnulado)
                    .HasColumnName("motivoAnulado")
                    .HasMaxLength(500);

                entity.Property(e => e.Observaciones)
                    .HasColumnName("observaciones")
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<PrecioArticulo>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdArticulo).HasColumnName("idArticulo");

                entity.Property(e => e.Precio).HasColumnName("precio");

                entity.HasOne(d => d.IdArticuloNavigation)
                    .WithMany(p => p.PrecioArticulo)
                    .HasForeignKey(d => d.IdArticulo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrecioArticulo_ArticuloVario");
            });

            modelBuilder.Entity<PrecioArticuloCliente>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Descuento).HasColumnName("descuento");

                entity.Property(e => e.Especial).HasColumnName("especial");

                entity.Property(e => e.IdCliente).HasColumnName("idCliente");

                entity.Property(e => e.IdPrecioArticulo).HasColumnName("idPrecioArticulo");

                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.PrecioArticuloCliente)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrecioArticuloCliente_Cliente");

                entity.HasOne(d => d.IdPrecioArticuloNavigation)
                    .WithMany(p => p.PrecioArticuloCliente)
                    .HasForeignKey(d => d.IdPrecioArticulo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrecioArticuloCliente_PrecioArticulo");
            });

            modelBuilder.Entity<PrecioLente>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cilindrico).HasColumnName("cilindrico");

                entity.Property(e => e.Esferico).HasColumnName("esferico");

                entity.Property(e => e.IdLente).HasColumnName("idLente");

                entity.Property(e => e.Precio).HasColumnName("precio");

                entity.HasOne(d => d.IdLenteNavigation)
                    .WithMany(p => p.PrecioLente)
                    .HasForeignKey(d => d.IdLente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrecioLente_Lente");
            });

            modelBuilder.Entity<PrecioLenteCliente>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Descuento).HasColumnName("descuento");

                entity.Property(e => e.Especial).HasColumnName("especial");

                entity.Property(e => e.IdCliente).HasColumnName("idCliente");

                entity.Property(e => e.IdPrecioLente).HasColumnName("idPrecioLente");

                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.PrecioLenteCliente)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrecioLenteCliente_Cliente");

                entity.HasOne(d => d.IdPrecioLenteNavigation)
                    .WithMany(p => p.PrecioLenteCliente)
                    .HasForeignKey(d => d.IdPrecioLente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrecioLenteCliente_PrecioLente");
            });

            modelBuilder.Entity<PrecioServicio>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdServicio).HasColumnName("idServicio");

                entity.Property(e => e.Precio).HasColumnName("precio");

                entity.HasOne(d => d.IdServicioNavigation)
                    .WithMany(p => p.PrecioServicio)
                    .HasForeignKey(d => d.IdServicio)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrecioServicio_Servicio");
            });

            modelBuilder.Entity<PrecioServicioCliente>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Descuento).HasColumnName("descuento");

                entity.Property(e => e.Especial).HasColumnName("especial");

                entity.Property(e => e.IdCliente).HasColumnName("idCliente");

                entity.Property(e => e.IdPrecioServicio).HasColumnName("idPrecioServicio");

                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.PrecioServicioCliente)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrecioServicioCliente_Cliente");

                entity.HasOne(d => d.IdPrecioServicioNavigation)
                    .WithMany(p => p.PrecioServicioCliente)
                    .HasForeignKey(d => d.IdPrecioServicio)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrecioServicioCliente_PrecioServicio");
            });

            modelBuilder.Entity<Proveedor>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Borrado).HasColumnName("borrado");

                entity.Property(e => e.Cuit)
                    .IsRequired()
                    .HasColumnName("cuit")
                    .HasMaxLength(50);

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

            modelBuilder.Entity<RecargoLente>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(150);

                entity.Property(e => e.IdLente).HasColumnName("idLente");

                entity.Property(e => e.Porcentaje).HasColumnName("porcentaje");

                entity.HasOne(d => d.IdLenteNavigation)
                    .WithMany(p => p.RecargoLente)
                    .HasForeignKey(d => d.IdLente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RecargoLente_Lente");
            });

            modelBuilder.Entity<Servicio>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Borrado).HasColumnName("borrado");

                entity.Property(e => e.IdTipoServicio).HasColumnName("idTipoServicio");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(200);

                entity.HasOne(d => d.IdTipoServicioNavigation)
                    .WithMany(p => p.Servicio)
                    .HasForeignKey(d => d.IdTipoServicio)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Servicio_TipoServicio");
            });

            modelBuilder.Entity<StockLente>(entity =>
            {
                entity.HasKey(e => new { e.MedidaEsferico, e.MedidaCilindrico, e.IdLente });

                entity.Property(e => e.MedidaEsferico).HasColumnName("medidaEsferico");

                entity.Property(e => e.MedidaCilindrico).HasColumnName("medidaCilindrico");

                entity.Property(e => e.IdLente).HasColumnName("idLente");

                entity.Property(e => e.Stock).HasColumnName("stock");

                entity.HasOne(d => d.IdLenteNavigation)
                    .WithMany(p => p.StockLente)
                    .HasForeignKey(d => d.IdLente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StockLente_Lente");
            });

            modelBuilder.Entity<TarjetaCredito>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Borrado)
                    .HasColumnName("borrado")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.IdBanco).HasColumnName("idBanco");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(50);

                entity.HasOne(d => d.IdBancoNavigation)
                    .WithMany(p => p.TarjetaCredito)
                    .HasForeignKey(d => d.IdBanco)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TarjetaCredito_Banco");
            });

            modelBuilder.Entity<TipoArticulo>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Borrado).HasColumnName("borrado");

                entity.Property(e => e.IngresosBrutos).HasColumnName("ingresosBrutos");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(100);
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

            modelBuilder.Entity<TipoComprobante>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Codigo)
                    .IsRequired()
                    .HasColumnName("codigo")
                    .HasMaxLength(10);

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(150);
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

            modelBuilder.Entity<TipoServicio>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Borrado).HasColumnName("borrado");

                entity.Property(e => e.IngresosBrutos).HasColumnName("ingresosBrutos");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(100);
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
