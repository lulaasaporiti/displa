using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DisplaBackend.DAOs;
using DisplaBackend.Helpers;
using DisplaBackend.Models;
using DisplaBackend.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;


namespace DisplaBackend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        //public object OperativoRepository { get; private set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureDevelopmentServices(IServiceCollection services)
        {
            //Development
            services.AddMvc().AddJsonOptions(options => {
                options.SerializerSettings.ContractResolver = new DefaultContractResolver { NamingStrategy = new CamelCaseNamingStrategy() };
                //options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });
            var connection = Configuration.GetConnectionString("DisplaApiConnection");
            services.AddDbContext<DisplaNEWContext>(options => options.UseSqlServer(connection));
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connection));

            StartupConfigureServices(services);
        }

        public void ConfigureStagingServices(IServiceCollection services)
        {
            //Staging
            services.AddMvc().AddJsonOptions(options => {
                //options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                ////options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });
            var connection = Configuration.GetConnectionString("DisplaApiConnection");
            services.AddDbContext<DisplaNEWContext>(options => options.UseSqlServer(connection));
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connection));

            StartupConfigureServices(services);
        }

        public void ConfigureProductionServices(IServiceCollection services)
        {
            services.AddMvc().AddJsonOptions(options => {
                //options.SerializerSettings.ContractResolver = new DefaultContractResolver { NamingStrategy = new CamelCaseNamingStrategy() };
                //options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });
            //Producción
            var connection = Configuration.GetConnectionString("DisplaApiConnection");
            services.AddDbContext<DisplaNEWContext>(options => options.UseSqlServer(connection));
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connection));

            StartupConfigureServices(services);
        }

        public void ConfigureQAServices(IServiceCollection services)
        {
            services.AddMvc().AddJsonOptions(options => {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });
            var connection = Configuration.GetConnectionString("DisplaApiConnection");
            services.AddDbContext<DisplaNEWContext>(options => options.UseSqlServer(connection));
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connection));

            StartupConfigureServices(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void ConfigureDevelopment(IApplicationBuilder app, IHostingEnvironment env, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("DisplaAPIPolicy");

            app.UseMvc();

            //CreateRoles(serviceProvider).Wait();
        }

        public void ConfigureStaging(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("DisplaAPIPolicy");

            app.UseMvc();
        }

        public void ConfigureProduction(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("DisplaAPIPolicy");

            app.UseMvc();
        }

        public void ConfigureQA(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("DisplaAPIPolicy");

            app.UseMvc();
        }

        private void StartupConfigureServices(IServiceCollection services)
        {
            services.AddMvc().AddJsonOptions(options => {
                options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });

            //******************** Tuto de identity Individual user accounts
            services.AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.Configure<IdentityOptions>(options =>
            {
                // Password settings
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                options.Password.RequiredUniqueChars = 0;

                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 10;
                options.Lockout.AllowedForNewUsers = true;

                // User settings
                options.User.RequireUniqueEmail = true;
            });

            services.ConfigureApplicationCookie(options =>
            {
                // Cookie settings
                options.Cookie.HttpOnly = true;
                options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
                // If the LoginPath isn't set, ASP.NET Core defaults 
                // the path to /Account/Login.
                options.LoginPath = "/Account/Login";
                // If the AccessDeniedPath isn't set, ASP.NET Core defaults 
                // the path to /Account/AccessDenied.
                options.AccessDeniedPath = "/Account/AccessDenied";
                options.SlidingExpiration = true;
            });

            //services.AddTransient<IEmailSender, EmailSender>();
            //********************FIN Tuto de identity Individual user accounts

            // Aca van los services y los DAO
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IAccountDAO, AccountDAO>();
            services.AddScoped<IArticuloVarioService, ArticuloVarioService>();
            services.AddScoped<IArticuloVarioDAO, ArticuloVarioDAO>();
            services.AddScoped<IBancoService, BancoService>();
            services.AddScoped<IBancoDAO, BancoDAO>();
            services.AddScoped<IBlockService, BlockService>();
            services.AddScoped<IBlockDAO, BlockDAO>();
            services.AddScoped<ICajaService, CajaService>();
            services.AddScoped<ICajaDAO, CajaDAO>();
            services.AddScoped<ICategoriaIVAService, CategoriaIVAService>();
            services.AddScoped<ICategoriaIVADAO, CategoriaIVADAO>();
            services.AddScoped<IClienteService, ClienteService>();
            services.AddScoped<IClienteDAO, ClienteDAO>();
            services.AddScoped<IComprobanteClienteService, ComprobanteClienteService>();
            services.AddScoped<IComprobanteClienteDAO, ComprobanteClienteDAO>();
            services.AddScoped<ICondicionVentaService, CondicionVentaService>();
            services.AddScoped<ICondicionVentaDAO, CondicionVentaDAO>();
            services.AddScoped<ICuentaBancariaService, CuentaBancariaService>();
            services.AddScoped<ICuentaBancariaDAO, CuentaBancariaDAO>();
            services.AddScoped<IEstadisticaService, EstadisticaService>();
            services.AddScoped<IEstadisticaDAO, EstadisticaDAO>();
            services.AddScoped<IGastoService, GastoService>();
            services.AddScoped<IGastoDAO, GastoDAO>();
            services.AddScoped<IInsumoService, InsumoService>();
            services.AddScoped<IInsumoDAO, InsumoDAO>();
            services.AddScoped<ILenteService, LenteService>();
            services.AddScoped<ILenteDAO, LenteDAO>();
            services.AddScoped<ILimitesGrillaService, LimitesGrillaService>();
            services.AddScoped<ILimitesGrillaDAO, LimitesGrillaDAO>();
            services.AddScoped<ILocalidadService, LocalidadService>();
            services.AddScoped<ILocalidadDAO, LocalidadDAO>();
            services.AddScoped<IMovimientoBlockService, MovimientoBlockService>();
            services.AddScoped<IMovimientoBlockDAO, MovimientoBlockDAO>();
            services.AddScoped<IMovimientoInsumoService, MovimientoInsumoService>();
            services.AddScoped<IMovimientoInsumoDAO, MovimientoInsumoDAO>();
            services.AddScoped<IParametroService, ParametroService>();
            services.AddScoped<IParametroDAO, ParametroDAO>();
            services.AddScoped<IProveedorService, ProveedorService>();
            services.AddScoped<IProveedorDAO, ProveedorDAO>();
            services.AddScoped<IProvinciaService, ProvinciaService>();
            services.AddScoped<IProvinciaDAO, ProvinciaDAO>();
            services.AddScoped<IReciboService, ReciboService>();
            services.AddScoped<IReciboDAO, ReciboDAO>();
            services.AddScoped<IRemitoService, RemitoService>();
            services.AddScoped<IRemitoDAO, RemitoDAO>();
            services.AddScoped<IServicioService, ServicioService>();
            services.AddScoped<IServicioDAO, ServicioDAO>();
            services.AddScoped<ISobreService, SobreService>();
            services.AddScoped<ISobreDAO, SobreDAO>();
            services.AddScoped<IStockLenteService, StockLenteService>();
            services.AddScoped<ITarjetaCreditoService, TarjetaCreditoService>();
            services.AddScoped<ITarjetaCreditoDAO, TarjetaCreditoDAO>();
            services.AddScoped<IStockLenteDAO, StockLenteDAO>();
            services.AddScoped<ITipoArticuloService, TipoArticuloService>();
            services.AddScoped<ITipoArticuloDAO, TipoArticuloDAO>();
            services.AddScoped<ITipoBlockService, TipoBlockService>();
            services.AddScoped<ITipoBlockDAO, TipoBlockDAO>();
            services.AddScoped<ITipoComprobanteService, TipoComprobanteService>();
            services.AddScoped<ITipoComprobanteDAO, TipoComprobanteDAO>();
            services.AddScoped<ITipoInsumoService, TipoInsumoService>();
            services.AddScoped<ITipoInsumoDAO, TipoInsumoDAO>();
            services.AddScoped<ITipoServicioService, TipoServicioService>();
            services.AddScoped<ITipoServicioDAO, TipoServicioDAO>();
            services.AddScoped<IUbicacionService, UbicacionService>();
            services.AddScoped<IUbicacionDAO, UbicacionDAO>();
            services.AddScoped<IVentaVirtualService, VentaVirtualService>();
            services.AddScoped<IVentaVirtualDAO, VentaVirtualDAO>();

            services.AddCors();
            services.AddCors(options =>
            {
                options.AddPolicy("DisplaAPIPolicy", builder =>
                {
                    builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                });

            });
        }


        private async Task CreateRoles(IServiceProvider serviceProvider)
        {
            //adding customs roles : Question 1
            var RoleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
            var UserManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            string[] roleNames = { "Admin", "Empleado", "Administrativo" };
            IdentityResult roleResult;

            foreach (var roleName in roleNames)
            {
                var roleExist = await RoleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    //create the roles and seed them to the database: Question 2
                    roleResult = await RoleManager.CreateAsync(new ApplicationRole(roleName));
                }
            }
        }

        private object IOperativoService(IServiceProvider arg)
        {
            throw new NotImplementedException();
        }
    }
}
