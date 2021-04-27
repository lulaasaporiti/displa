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
        public virtual DbSet<Cheque> Cheque { get; set; }
        public virtual DbSet<Cliente> Cliente { get; set; }
        public virtual DbSet<ClienteBloqueo> ClienteBloqueo { get; set; }
        public virtual DbSet<ComprobanteCliente> ComprobanteCliente { get; set; }
        public virtual DbSet<ComprobanteItem> ComprobanteItem { get; set; }
        public virtual DbSet<ComprobanteItemLente> ComprobanteItemLente { get; set; }
        public virtual DbSet<ComprobanteItemRecargo> ComprobanteItemRecargo { get; set; }
        public virtual DbSet<ComprobanteItemServicio> ComprobanteItemServicio { get; set; }
        public virtual DbSet<CondicionVenta> CondicionVenta { get; set; }
        public virtual DbSet<CuentaBancaria> CuentaBancaria { get; set; }
        public virtual DbSet<EstadoCheque> EstadoCheque { get; set; }
        public virtual DbSet<Ficha> Ficha { get; set; }
        public virtual DbSet<Gasto> Gasto { get; set; }
        public virtual DbSet<Insumo> Insumo { get; set; }
        public virtual DbSet<InsumoProveedor> InsumoProveedor { get; set; }
        public virtual DbSet<Lente> Lente { get; set; }
        public virtual DbSet<LimitesGrilla> LimitesGrilla { get; set; }
        public virtual DbSet<Localidad> Localidad { get; set; }
        public virtual DbSet<MovimientoBlock> MovimientoBlock { get; set; }
        public virtual DbSet<MovimientoCaja> MovimientoCaja { get; set; }
        public virtual DbSet<MovimientoInsumo> MovimientoInsumo { get; set; }
        public virtual DbSet<MovimientoInterno> MovimientoInterno { get; set; }
        public virtual DbSet<OperacionBancaria> OperacionBancaria { get; set; }
        public virtual DbSet<Parametros> Parametros { get; set; }
        public virtual DbSet<PrecioArticulo> PrecioArticulo { get; set; }
        public virtual DbSet<PrecioArticuloCliente> PrecioArticuloCliente { get; set; }
        public virtual DbSet<PrecioLente> PrecioLente { get; set; }
        public virtual DbSet<PrecioLenteCliente> PrecioLenteCliente { get; set; }
        public virtual DbSet<PrecioServicio> PrecioServicio { get; set; }
        public virtual DbSet<PrecioServicioCliente> PrecioServicioCliente { get; set; }
        public virtual DbSet<Proveedor> Proveedor { get; set; }
        public virtual DbSet<Provincia> Provincia { get; set; }
        public virtual DbSet<RecargoLente> RecargoLente { get; set; }
        public virtual DbSet<Recibo> Recibo { get; set; }
        public virtual DbSet<Remito> Remito { get; set; }
        public virtual DbSet<Servicio> Servicio { get; set; }
        public virtual DbSet<Sobre> Sobre { get; set; }
        public virtual DbSet<StockLente> StockLente { get; set; }
        public virtual DbSet<TarjetaCredito> TarjetaCredito { get; set; }
        public virtual DbSet<TipoArticulo> TipoArticulo { get; set; }
        public virtual DbSet<TipoBlock> TipoBlock { get; set; }
        public virtual DbSet<TipoComprobante> TipoComprobante { get; set; }
        public virtual DbSet<TipoDescuento> TipoDescuento { get; set; }
        public virtual DbSet<TipoInsumo> TipoInsumo { get; set; }
        public virtual DbSet<TipoServicio> TipoServicio { get; set; }
        public virtual DbSet<TrasladoFondo> TrasladoFondo { get; set; }
        public virtual DbSet<Ubicacion> Ubicacion { get; set; }
        public virtual DbSet<VentaVirtual> VentaVirtual { get; set; }
        public virtual DbSet<VentaVirtualMovimientos> VentaVirtualMovimientos { get; set; }
        public virtual DbSet<VirtualComprobante> VirtualComprobante { get; set; }

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

                entity.Property(e => e.PrecioCosto)
                    .HasColumnName("precioCosto")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.StockActual)
                    .HasColumnName("stockActual")
                    .HasColumnType("decimal(10, 1)");

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

                entity.Property(e => e.CambioUbicacion).HasColumnName("cambioUbicacion");

                entity.Property(e => e.Cantidad).HasColumnName("cantidad");

                entity.Property(e => e.IdMovimientoBlock).HasColumnName("idMovimientoBlock");

                entity.Property(e => e.IdUbicacion).HasColumnName("idUbicacion");

                entity.Property(e => e.NumeroCajaChica).HasColumnName("numeroCajaChica");

                entity.Property(e => e.NumeroCajaGrande).HasColumnName("numeroCajaGrande");

                entity.HasOne(d => d.IdMovimientoBlockNavigation)
                    .WithMany(p => p.Caja)
                    .HasForeignKey(d => d.IdMovimientoBlock)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Caja_MovimientoBlock");

                entity.HasOne(d => d.IdUbicacionNavigation)
                    .WithMany(p => p.Caja)
                    .HasForeignKey(d => d.IdUbicacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Caja_Ubicacion");
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

            modelBuilder.Entity<Cheque>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasColumnType("datetime");

                entity.Property(e => e.FechaAlta)
                    .HasColumnName("fechaAlta")
                    .HasColumnType("datetime");

                entity.Property(e => e.FechaAnulado)
                    .HasColumnName("fechaAnulado")
                    .HasColumnType("datetime");

                entity.Property(e => e.IdBanco).HasColumnName("idBanco");

                entity.Property(e => e.IdCliente).HasColumnName("idCliente");

                entity.Property(e => e.IdEstado).HasColumnName("idEstado");

                entity.Property(e => e.IdOperacionBancaria).HasColumnName("idOperacionBancaria");

                entity.Property(e => e.IdRecibo).HasColumnName("idRecibo");

                entity.Property(e => e.Importe)
                    .HasColumnName("importe")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.MotivoAnulado)
                    .HasColumnName("motivoAnulado")
                    .HasMaxLength(500);

                entity.Property(e => e.Numero).HasColumnName("numero");

                entity.HasOne(d => d.IdBancoNavigation)
                    .WithMany(p => p.Cheque)
                    .HasForeignKey(d => d.IdBanco)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Cheque_Banco");

                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.Cheque)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Cheque_Cliente");

                entity.HasOne(d => d.IdEstadoNavigation)
                    .WithMany(p => p.Cheque)
                    .HasForeignKey(d => d.IdEstado)
                    .HasConstraintName("FK_Cheque_EstadoCheque");

                entity.HasOne(d => d.IdOperacionBancariaNavigation)
                    .WithMany(p => p.Cheque)
                    .HasForeignKey(d => d.IdOperacionBancaria)
                    .HasConstraintName("FK_Cheque_OperacionBancaria");

                entity.HasOne(d => d.IdReciboNavigation)
                    .WithMany(p => p.Cheque)
                    .HasForeignKey(d => d.IdRecibo)
                    .HasConstraintName("FK_Cheque_Recibo");
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

            modelBuilder.Entity<ClienteBloqueo>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasColumnType("date");

                entity.Property(e => e.IdCliente).HasColumnName("idCliente");

                entity.Property(e => e.Manual).HasColumnName("manual");

                entity.Property(e => e.Motivo)
                    .IsRequired()
                    .HasColumnName("motivo")
                    .HasMaxLength(500);

                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.ClienteBloqueo)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ClienteBloqueo_Cliente");
            });

            modelBuilder.Entity<ComprobanteCliente>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasColumnType("datetime");

                entity.Property(e => e.FechaAnulado)
                    .HasColumnName("fechaAnulado")
                    .HasColumnType("datetime");

                entity.Property(e => e.IdCliente).HasColumnName("idCliente");

                entity.Property(e => e.IdTipoComprobante).HasColumnName("idTipoComprobante");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Letra)
                    .IsRequired()
                    .HasColumnName("letra")
                    .HasMaxLength(5);

                entity.Property(e => e.MontoIibb).HasColumnName("montoIIBB");

                entity.Property(e => e.MontoIvari).HasColumnName("montoIVARI");

                entity.Property(e => e.MontoTotal).HasColumnName("montoTotal");

                entity.Property(e => e.MontoTseh).HasColumnName("montoTSEH");

                entity.Property(e => e.Numero).HasColumnName("numero");

                entity.Property(e => e.Observaciones)
                    .HasColumnName("observaciones")
                    .HasMaxLength(2000);

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

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.ComprobanteCliente)
                    .HasForeignKey(d => d.IdUsuario)
                    .HasConstraintName("FK_ComprobanteCliente_AspNetUsers");
            });

            modelBuilder.Entity<ComprobanteItem>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cantidad)
                    .HasColumnName("cantidad")
                    .HasColumnType("decimal(10, 1)");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(250);

                entity.Property(e => e.EntregaVentaVirtual).HasColumnName("entregaVentaVirtual");

                entity.Property(e => e.IdArticulo).HasColumnName("idArticulo");

                entity.Property(e => e.IdComprobante).HasColumnName("idComprobante");

                entity.Property(e => e.IdRemito).HasColumnName("idRemito");

                entity.Property(e => e.IdServicio).HasColumnName("idServicio");

                entity.Property(e => e.Iibb).HasColumnName("IIBB");

                entity.Property(e => e.Monto)
                    .HasColumnName("monto")
                    .HasColumnType("decimal(10, 2)");

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
                    .HasConstraintName("FK_ComprobanteItem_ComprobanteCliente");

                entity.HasOne(d => d.IdRemitoNavigation)
                    .WithMany(p => p.ComprobanteItem)
                    .HasForeignKey(d => d.IdRemito)
                    .HasConstraintName("FK_ComprobanteItem_Remito");

                entity.HasOne(d => d.IdServicioNavigation)
                    .WithMany(p => p.ComprobanteItem)
                    .HasForeignKey(d => d.IdServicio)
                    .HasConstraintName("FK_ComprobanteItem_Servicio");
            });

            modelBuilder.Entity<ComprobanteItemLente>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cantidad)
                    .HasColumnName("cantidad")
                    .HasColumnType("decimal(10, 1)");

                entity.Property(e => e.IdComprobanteItem).HasColumnName("idComprobanteItem");

                entity.Property(e => e.IdLente).HasColumnName("idLente");

                entity.Property(e => e.MedidaCilindrico)
                    .HasColumnName("medidaCilindrico")
                    .HasColumnType("decimal(3, 2)");

                entity.Property(e => e.MedidaEsferico)
                    .HasColumnName("medidaEsferico")
                    .HasColumnType("decimal(3, 2)");

                entity.Property(e => e.Precio)
                    .HasColumnName("precio")
                    .HasColumnType("decimal(10, 2)");

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

            modelBuilder.Entity<ComprobanteItemRecargo>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdComprobanteItem).HasColumnName("idComprobanteItem");

                entity.Property(e => e.IdRecargo).HasColumnName("idRecargo");

                entity.Property(e => e.Monto)
                    .HasColumnName("monto")
                    .HasColumnType("decimal(10, 2)");

                entity.HasOne(d => d.IdComprobanteItemNavigation)
                    .WithMany(p => p.ComprobanteItemRecargo)
                    .HasForeignKey(d => d.IdComprobanteItem)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RecargoComprobanteItem_ComprobanteItem");

                entity.HasOne(d => d.IdRecargoNavigation)
                    .WithMany(p => p.ComprobanteItemRecargo)
                    .HasForeignKey(d => d.IdRecargo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RecargoComprobanteItem_RecargoLente");
            });

            modelBuilder.Entity<ComprobanteItemServicio>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdComprobanteItem).HasColumnName("idComprobanteItem");

                entity.Property(e => e.IdServicio).HasColumnName("idServicio");

                entity.Property(e => e.Monto)
                    .HasColumnName("monto")
                    .HasColumnType("decimal(10, 2)");

                entity.HasOne(d => d.IdComprobanteItemNavigation)
                    .WithMany(p => p.ComprobanteItemServicio)
                    .HasForeignKey(d => d.IdComprobanteItem)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ComprobanteItemServicio_ComprobanteItem");

                entity.HasOne(d => d.IdServicioNavigation)
                    .WithMany(p => p.ComprobanteItemServicio)
                    .HasForeignKey(d => d.IdServicio)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ComprobanteItemServicio_Servicio");
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

            modelBuilder.Entity<CuentaBancaria>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Borrado)
                    .HasColumnName("borrado")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.FechaApertura)
                    .HasColumnName("fechaApertura")
                    .HasColumnType("date");

                entity.Property(e => e.IdBanco).HasColumnName("idBanco");

                entity.Property(e => e.Numero)
                    .IsRequired()
                    .HasColumnName("numero")
                    .HasMaxLength(10);

                entity.Property(e => e.SaldoInicial)
                    .HasColumnName("saldoInicial")
                    .HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.IdBancoNavigation)
                    .WithMany(p => p.CuentaBancaria)
                    .HasForeignKey(d => d.IdBanco)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CuentaBancaria_Banco");
            });

            modelBuilder.Entity<EstadoCheque>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(150);
            });

            modelBuilder.Entity<Ficha>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion");

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

            modelBuilder.Entity<Gasto>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(150);
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

                entity.Property(e => e.DescripcionFactura)
                    .HasColumnName("descripcionFactura")
                    .HasMaxLength(50);

                entity.Property(e => e.FechaCreacion)
                    .HasColumnName("fechaCreacion")
                    .HasColumnType("date");

                entity.Property(e => e.Fraccionado)
                    .IsRequired()
                    .HasColumnName("fraccionado")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.GraduacionesCilindricas)
                    .HasColumnName("graduacionesCilindricas")
                    .HasMaxLength(1);

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.IngresosBrutos).HasColumnName("ingresosBrutos");

                entity.Property(e => e.Iva)
                    .HasColumnName("IVA")
                    .HasColumnType("decimal(4, 2)");

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

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.MovimientoBlock)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MovimientoBlock_AspNetUsers");
            });

            modelBuilder.Entity<MovimientoCaja>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(200);

                entity.Property(e => e.Efectivo).HasColumnName("efectivo");

                entity.Property(e => e.Entrada).HasColumnName("entrada");

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasColumnType("date");

                entity.Property(e => e.FechaAnulado)
                    .HasColumnName("fechaAnulado")
                    .HasColumnType("date");

                entity.Property(e => e.IdRecibo).HasColumnName("idRecibo");

                entity.Property(e => e.IdReciboProveedor).HasColumnName("idReciboProveedor");

                entity.Property(e => e.Monto)
                    .HasColumnName("monto")
                    .HasColumnType("decimal(10, 2)");
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

            modelBuilder.Entity<OperacionBancaria>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DepositaCheque).HasColumnName("depositaCheque");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(200);

                entity.Property(e => e.EmiteCheque).HasColumnName("emiteCheque");

                entity.Property(e => e.Entrada)
                    .IsRequired()
                    .HasColumnName("entrada")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasColumnType("datetime");

                entity.Property(e => e.IdCuentaBancaria).HasColumnName("idCuentaBancaria");

                entity.Property(e => e.IdRecibo).HasColumnName("idRecibo");

                entity.Property(e => e.Monto)
                    .HasColumnName("monto")
                    .HasColumnType("decimal(10, 2)");

                entity.HasOne(d => d.IdCuentaBancariaNavigation)
                    .WithMany(p => p.OperacionBancaria)
                    .HasForeignKey(d => d.IdCuentaBancaria)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OperacionBancaria_CuentaBancaria");

                entity.HasOne(d => d.IdReciboNavigation)
                    .WithMany(p => p.OperacionBancaria)
                    .HasForeignKey(d => d.IdRecibo)
                    .HasConstraintName("FK_OperacionBancaria_Recibo");
            });

            modelBuilder.Entity<Parametros>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CantidadProductoDiferentes).HasColumnName("cantidadProductoDiferentes");

                entity.Property(e => e.CantidadProductoDiferentesRemito).HasColumnName("cantidadProductoDiferentesRemito");

                entity.Property(e => e.Dolar)
                    .HasColumnName("dolar")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.Euro)
                    .HasColumnName("euro")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.IngresosBrutos).HasColumnName("ingresosBrutos");

                entity.Property(e => e.LimiteVentaVirtual).HasColumnName("limiteVentaVirtual");

                entity.Property(e => e.MontoBaseRetenciones).HasColumnName("montoBaseRetenciones");

                entity.Property(e => e.MontoMaximoComprobante).HasColumnName("montoMaximoComprobante");

                entity.Property(e => e.MontoMaximoProductosDiferentes).HasColumnName("montoMaximoProductosDiferentes");

                entity.Property(e => e.MontoMinimo).HasColumnName("montoMinimo");

                entity.Property(e => e.NumeroCertificadoRetencion).HasColumnName("numeroCertificadoRetencion");

                entity.Property(e => e.NumeroComprobanteA).HasColumnName("numeroComprobanteA");

                entity.Property(e => e.NumeroComprobanteB).HasColumnName("numeroComprobanteB");

                entity.Property(e => e.NumeroHojaIvacompras).HasColumnName("numeroHojaIVACompras");

                entity.Property(e => e.NumeroHojaIvaventas).HasColumnName("numeroHojaIVAVentas");

                entity.Property(e => e.NumeroNotaCreditoA).HasColumnName("numeroNotaCreditoA");

                entity.Property(e => e.NumeroNotaCreditoB).HasColumnName("numeroNotaCreditoB");

                entity.Property(e => e.NumeroNotaDebitoA).HasColumnName("numeroNotaDebitoA");

                entity.Property(e => e.NumeroNotaDebitoB).HasColumnName("numeroNotaDebitoB");

                entity.Property(e => e.NumeroRecibo).HasColumnName("numeroRecibo");

                entity.Property(e => e.NumeroSucursal).HasColumnName("numeroSucursal");

                entity.Property(e => e.Observaciones)
                    .HasColumnName("observaciones")
                    .HasMaxLength(1500);

                entity.Property(e => e.PorcentajeRetenciones).HasColumnName("porcentajeRetenciones");

                entity.Property(e => e.SobretasaIvaproveedores).HasColumnName("sobretasaIVAProveedores");

                entity.Property(e => e.TasaIvaproveedores).HasColumnName("tasaIVAProveedores");
            });

            modelBuilder.Entity<PrecioArticulo>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdArticulo).HasColumnName("idArticulo");

                entity.Property(e => e.Precio)
                    .HasColumnName("precio")
                    .HasColumnType("decimal(10, 2)");

                entity.HasOne(d => d.IdArticuloNavigation)
                    .WithMany(p => p.PrecioArticulo)
                    .HasForeignKey(d => d.IdArticulo)
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
                    .HasConstraintName("FK_PrecioArticuloCliente_Cliente");

                entity.HasOne(d => d.IdPrecioArticuloNavigation)
                    .WithMany(p => p.PrecioArticuloCliente)
                    .HasForeignKey(d => d.IdPrecioArticulo)
                    .HasConstraintName("FK_PrecioArticuloCliente_PrecioArticulo");
            });

            modelBuilder.Entity<PrecioLente>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CostoPar)
                    .HasColumnName("costoPar")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.IdLente).HasColumnName("idLente");

                entity.Property(e => e.MedidaCilindrico)
                    .HasColumnName("medidaCilindrico")
                    .HasColumnType("decimal(6, 2)");

                entity.Property(e => e.MedidaEsferico)
                    .HasColumnName("medidaEsferico")
                    .HasColumnType("decimal(6, 2)");

                entity.Property(e => e.Precio)
                    .HasColumnName("precio")
                    .HasColumnType("decimal(10, 2)");

                entity.HasOne(d => d.IdLenteNavigation)
                    .WithMany(p => p.PrecioLente)
                    .HasForeignKey(d => d.IdLente)
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
                    .HasConstraintName("FK_PrecioLenteCliente_Cliente");

                entity.HasOne(d => d.IdPrecioLenteNavigation)
                    .WithMany(p => p.PrecioLenteCliente)
                    .HasForeignKey(d => d.IdPrecioLente)
                    .HasConstraintName("FK_PrecioLenteCliente_PrecioLente");
            });

            modelBuilder.Entity<PrecioServicio>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdServicio).HasColumnName("idServicio");

                entity.Property(e => e.Precio)
                    .HasColumnName("precio")
                    .HasColumnType("decimal(10, 2)");

                entity.HasOne(d => d.IdServicioNavigation)
                    .WithMany(p => p.PrecioServicio)
                    .HasForeignKey(d => d.IdServicio)
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
                    .HasConstraintName("FK_PrecioServicioCliente_Cliente");

                entity.HasOne(d => d.IdPrecioServicioNavigation)
                    .WithMany(p => p.PrecioServicioCliente)
                    .HasForeignKey(d => d.IdPrecioServicio)
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
                    .HasConstraintName("FK_RecargoLente_Lente");
            });

            modelBuilder.Entity<Recibo>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasColumnType("datetime");

                entity.Property(e => e.FechaAnulado)
                    .HasColumnName("fechaAnulado")
                    .HasColumnType("datetime");

                entity.Property(e => e.IdCliente).HasColumnName("idCliente");

                entity.Property(e => e.IdCuentaBancaria).HasColumnName("idCuentaBancaria");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.IdUsuarioAnulacion).HasColumnName("idUsuarioAnulacion");

                entity.Property(e => e.MontoCheque)
                    .HasColumnName("montoCheque")
                    .HasColumnType("decimal(10, 2)")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.MontoEfectivo)
                    .HasColumnName("montoEfectivo")
                    .HasColumnType("decimal(10, 2)")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.MontoInterdeposito)
                    .HasColumnName("montoInterdeposito")
                    .HasColumnType("decimal(10, 2)")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.MotivoAnulado)
                    .HasColumnName("motivoAnulado")
                    .HasMaxLength(150);

                entity.Property(e => e.NroInterdeposito)
                    .HasColumnName("nroInterdeposito")
                    .HasMaxLength(200);

                entity.Property(e => e.Numero).HasColumnName("numero");

                entity.Property(e => e.Observaciones)
                    .HasColumnName("observaciones")
                    .HasMaxLength(500);

                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.Recibo)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Recibo_Cliente");

                entity.HasOne(d => d.IdCuentaBancariaNavigation)
                    .WithMany(p => p.Recibo)
                    .HasForeignKey(d => d.IdCuentaBancaria)
                    .HasConstraintName("FK_Recibo_CuentaBancaria");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.ReciboIdUsuarioNavigation)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Recibo_AspNetUsers");

                entity.HasOne(d => d.IdUsuarioAnulacionNavigation)
                    .WithMany(p => p.ReciboIdUsuarioAnulacionNavigation)
                    .HasForeignKey(d => d.IdUsuarioAnulacion)
                    .HasConstraintName("FK_Recibo_AspNetUsersAnulacion");
            });

            modelBuilder.Entity<Remito>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasColumnType("datetime");

                entity.Property(e => e.FechaAnulado)
                    .HasColumnName("fechaAnulado")
                    .HasColumnType("datetime");

                entity.Property(e => e.FechaFactura)
                    .HasColumnName("fechaFactura")
                    .HasColumnType("datetime");

                entity.Property(e => e.IdCliente).HasColumnName("idCliente");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.IdUsuarioAnulacion).HasColumnName("idUsuarioAnulacion");

                entity.Property(e => e.Impreso).HasColumnName("impreso");

                entity.Property(e => e.MotivoAnulado)
                    .HasColumnName("motivoAnulado")
                    .HasMaxLength(150);

                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.Remito)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Remito_Cliente");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.RemitoIdUsuarioNavigation)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Remito_AspNetUsers");

                entity.HasOne(d => d.IdUsuarioAnulacionNavigation)
                    .WithMany(p => p.RemitoIdUsuarioAnulacionNavigation)
                    .HasForeignKey(d => d.IdUsuarioAnulacion)
                    .HasConstraintName("FK_Remito_AspNetUsersAnulacion");
            });

            modelBuilder.Entity<Servicio>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Borrado).HasColumnName("borrado");

                entity.Property(e => e.DescripcionFactura)
                    .HasColumnName("descripcionFactura")
                    .HasMaxLength(10);

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

            modelBuilder.Entity<Sobre>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Entregas).HasColumnName("entregas");

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasColumnType("date");

                entity.Property(e => e.IdCliente).HasColumnName("idCliente");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Numero).HasColumnName("numero");

                entity.Property(e => e.Observaciones)
                    .HasColumnName("observaciones")
                    .HasMaxLength(250);

                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.Sobre)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Sobre_Cliente");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Sobre)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Sobre_AspNetUsers");
            });

            modelBuilder.Entity<StockLente>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdLente).HasColumnName("idLente");

                entity.Property(e => e.MedidaCilindrico)
                    .HasColumnName("medidaCilindrico")
                    .HasColumnType("decimal(6, 2)");

                entity.Property(e => e.MedidaEsferico)
                    .HasColumnName("medidaEsferico")
                    .HasColumnType("decimal(6, 2)");

                entity.Property(e => e.Stock)
                    .HasColumnName("stock")
                    .HasColumnType("decimal(10, 1)");

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

                entity.Property(e => e.Iva)
                    .HasColumnName("IVA")
                    .HasColumnType("decimal(4, 2)");

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

            modelBuilder.Entity<TipoDescuento>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Borrado).HasColumnName("borrado");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(150);

                entity.Property(e => e.Porcentaje)
                    .HasColumnName("porcentaje")
                    .HasColumnType("decimal(5, 2)");
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

            modelBuilder.Entity<TrasladoFondo>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(250);

                entity.Property(e => e.Fecha)
                    .HasColumnName("fecha")
                    .HasColumnType("date");

                entity.Property(e => e.IdCuentaDestino).HasColumnName("idCuentaDestino");

                entity.Property(e => e.IdCuentaOrigen).HasColumnName("idCuentaOrigen");

                entity.Property(e => e.Monto)
                    .HasColumnName("monto")
                    .HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.IdCuentaDestinoNavigation)
                    .WithMany(p => p.TrasladoFondoIdCuentaDestinoNavigation)
                    .HasForeignKey(d => d.IdCuentaDestino)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TrasladoFondo_CuentaBancariaDestino");

                entity.HasOne(d => d.IdCuentaOrigenNavigation)
                    .WithMany(p => p.TrasladoFondoIdCuentaOrigenNavigation)
                    .HasForeignKey(d => d.IdCuentaOrigen)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TrasladoFondo_CuentaBancariaOrigen");
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

            modelBuilder.Entity<VentaVirtual>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CantidadEntregada)
                    .HasColumnName("cantidadEntregada")
                    .HasColumnType("decimal(6, 2)");

                entity.Property(e => e.CantidadVendida)
                    .HasColumnName("cantidadVendida")
                    .HasColumnType("decimal(6, 2)");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(250);

                entity.Property(e => e.IdArticulo).HasColumnName("idArticulo");

                entity.Property(e => e.IdComprobante).HasColumnName("idComprobante");

                entity.Property(e => e.IdLente).HasColumnName("idLente");

                entity.Property(e => e.IdServicio).HasColumnName("idServicio");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Impreso).HasColumnName("impreso");

                entity.Property(e => e.Monto)
                    .HasColumnName("monto")
                    .HasColumnType("decimal(10, 2)");

                entity.HasOne(d => d.IdArticuloNavigation)
                    .WithMany(p => p.VentaVirtual)
                    .HasForeignKey(d => d.IdArticulo)
                    .HasConstraintName("FK_VentaVirtual_ArticuloVario");

                entity.HasOne(d => d.IdComprobanteNavigation)
                    .WithMany(p => p.VentaVirtual)
                    .HasForeignKey(d => d.IdComprobante)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_VentaVirtual_ComprobanteCliente");

                entity.HasOne(d => d.IdLenteNavigation)
                    .WithMany(p => p.VentaVirtual)
                    .HasForeignKey(d => d.IdLente)
                    .HasConstraintName("FK_VentaVirtual_Lente");

                entity.HasOne(d => d.IdServicioNavigation)
                    .WithMany(p => p.VentaVirtual)
                    .HasForeignKey(d => d.IdServicio)
                    .HasConstraintName("FK_VentaVirtual_Servicio");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.VentaVirtual)
                    .HasForeignKey(d => d.IdUsuario)
                    .HasConstraintName("FK_VentaVirtual_AspNetUsers");
            });

            modelBuilder.Entity<VentaVirtualMovimientos>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cantidad)
                    .HasColumnName("cantidad")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.Entrega).HasColumnName("entrega");

                entity.Property(e => e.IdComprobanteCliente).HasColumnName("idComprobanteCliente");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.IdVentaVirtual).HasColumnName("idVentaVirtual");

                entity.HasOne(d => d.IdComprobanteClienteNavigation)
                    .WithMany(p => p.VentaVirtualMovimientos)
                    .HasForeignKey(d => d.IdComprobanteCliente)
                    .HasConstraintName("FK_VentaVirtualMovimientos_ComprobanteCliente");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.VentaVirtualMovimientos)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_VentaVirtualMovimientos_AspNetUsers");

                entity.HasOne(d => d.IdVentaVirtualNavigation)
                    .WithMany(p => p.VentaVirtualMovimientos)
                    .HasForeignKey(d => d.IdVentaVirtual)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_VentaVirtualMovimientos_VentaVirtual");
            });

            modelBuilder.Entity<VirtualComprobante>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CantidadEntregada)
                    .HasColumnName("cantidadEntregada")
                    .HasColumnType("decimal(6, 2)");

                entity.Property(e => e.IdComprobante).HasColumnName("idComprobante");

                entity.Property(e => e.IdVentaVirtual).HasColumnName("idVentaVirtual");
            });
        }
    }
}
