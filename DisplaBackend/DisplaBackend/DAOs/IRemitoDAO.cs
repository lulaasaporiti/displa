using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IRemitoDAO
    {
        List<Remito> GetRemitosPendientesCliente(int idCliente);
        List<Remito> GetRemitosVigentes();
        Task<bool> SaveOrUpdate(Remito remito);
        bool Delete(Remito remito);
        Remito GetById(int idRemito);
        List<dynamic> BuscarItemRemito(int idLente, int idArticulo, string libre, DateTime desde, DateTime hasta);
        List<dynamic> BuscarRemito(int idCliente, DateTime fechaDesde, DateTime fechaHasta);
        List<dynamic> BuscarRemitosAnulados(DateTime fechaDesde, DateTime fechaHasta);
    }

    public class RemitoDAO : IRemitoDAO
    {
        private readonly DisplaNEWContext _context;

        public RemitoDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<Remito> GetRemitosPendientesCliente(int idCliente)
        {
            return _context.Remito
                .Where(r =>  r.IdCliente == idCliente && r.FechaFactura == null)
                .Include(r => r.ComprobanteItem)
                .ToList();
        }

        public List<Remito> GetRemitosVigentes()
        {
            return _context.Remito
                 .Include(r => r.ComprobanteItem)
                .ToList();
        }

        public async Task<bool> SaveOrUpdate(Remito remito)
        {
            try
            {
                if (remito.Id == 0)
                {
                    remito.Fecha = DateTime.Now;
                    remito.IdClienteNavigation = null;
                    //////////////agregar el navigation de lente en null cuando lo terminemos.//////////
                    foreach (var c in remito.ComprobanteItem.ToList())
                    {
                        if (c.IdArticuloNavigation != null)
                        {
                            c.IdArticuloNavigation.StockActual = c.IdArticuloNavigation.StockActual - c.Cantidad;
                            _context.ArticuloVario.Update(c.IdArticuloNavigation);
                        }
                        c.IdServicioNavigation = null;
                        c.IdArticuloNavigation = null;


                        if (c.ComprobanteItemLente.Count > 0)
                        {
                            foreach (var cl in c.ComprobanteItemLente)
                            {
                                StockLente lente = _context.StockLente.FirstOrDefault(st => st.IdLente == cl.IdLente && st.MedidaCilindrico == cl.MedidaCilindrico && st.MedidaEsferico == cl.MedidaEsferico);
                                if (lente != null)
                                {
                                    lente.Stock = lente.Stock - cl.Cantidad;
                                    _context.StockLente.Update(lente);
                                }
                            }
                        }
                    }
                    var servicios = remito.ComprobanteItem.Select(c => c.ComprobanteItemServicio);
                    var recargos = remito.ComprobanteItem.Select(c => c.ComprobanteItemRecargo);
                    if (servicios != null)
                    {
                        foreach (var s in servicios.ElementAt(0).ToArray())
                        {
                            s.IdServicioNavigation = null;
                            _context.ComprobanteItemServicio.Add(s);
                        }
                    }
                    if (recargos != null)
                    {
                        foreach (var r in recargos.ElementAt(0).ToArray())
                        {
                            r.IdRecargoNavigation = null;
                            _context.ComprobanteItemRecargo.Add(r);
                        }
                    }
                    //foreach (var v in comprobanteCliente.VentaVirtual.ToList())
                    //{
                    //    v.IdArticuloNavigation = null;
                    //    v.IdServicioNavigation = null;
                    //}
                    remito = _context.Add(remito).Entity;


                }
                else
                {
                    remito = _context.Remito.Update(remito).Entity;

                }
                return await _context.SaveChangesAsync() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public Remito GetById(int idRemito)
        {
            return _context.Remito
                .Include(r => r.IdClienteNavigation)
                .Include(r => r.IdUsuarioNavigation)
                .Include(r => r.IdUsuarioAnulacionNavigation)
                .Include(r => r.ComprobanteItem).FirstOrDefault(u => u.Id == idRemito);
        }

        public bool Delete(Remito remito)
        {
            try
            {
                remito = _context.Remito.Update(remito).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }

        public List<dynamic> BuscarItemRemito(int idLente, int idArticulo, string libre, DateTime desde, DateTime hasta)
        {
            if (idLente > 0)
            {
                return _context.Remito
                    .Include(r => r.IdClienteNavigation)
                    .Include(r => r.ComprobanteItem)
                    .Where(re => re.Fecha >= desde && re.Fecha <= hasta.AddDays(1) && re.FechaAnulado == null && re.FechaFactura == null && 
                    re.ComprobanteItem.Any(ci => ci.ComprobanteItemLente.Any(cl => cl.IdLente == idLente)))
                   .Select(ca => new {
                       Id = ca.Id,
                       Fecha = ca.Fecha,
                       FechaAnulado = ca.FechaAnulado,
                       IdClienteNavigation = ca.IdClienteNavigation.Optica,
                       IdComprobanteItem = ca.ComprobanteItem.Where(ci => ci.ComprobanteItemLente.Any(cil => cil.IdLente == idLente)).Select(c => c.Id),
                       Producto = ca.ComprobanteItem.Where(ci => ci.ComprobanteItemLente.Any(cil => cil.IdLente == idLente)).Select(c => c.Descripcion)
                   })
                    .OrderByDescending(c => c.Fecha)
                    .ToList<dynamic>();
            }
            if (idArticulo > 0)
            {
                return _context.Remito
                    .Include(r => r.IdClienteNavigation)
                    .Include(r => r.ComprobanteItem)
                    .Where(re => re.Fecha >= desde && re.Fecha <= hasta.AddDays(1) && re.FechaAnulado == null && re.FechaFactura == null &&
                    re.ComprobanteItem.Any(ci => ci.IdArticulo == idArticulo))
                    .Select(ca => new {
                        Id = ca.Id,
                        Fecha = ca.Fecha,
                        FechaAnulado = ca.FechaAnulado,
                        IdClienteNavigation = ca.IdClienteNavigation.Optica,
                        IdComprobanteItem = ca.ComprobanteItem.Where(ci => ci.IdArticulo == idArticulo).Select(c => c.Id),
                        Producto = ca.ComprobanteItem.Where(ci => ci.IdArticulo == idArticulo).Select(a => a.IdArticuloNavigation.Nombre)
                    })
                    .OrderByDescending(c => c.Fecha)
                    .ToList<dynamic>();
            }
            if (libre != null)
            {
                return _context.Remito
                    .Include(r => r.IdClienteNavigation)
                    .Include(r => r.ComprobanteItem)
                    .Where(re => re.Fecha >= desde && re.Fecha <= hasta.AddDays(1) && re.FechaAnulado == null && re.FechaFactura == null &&
                    re.ComprobanteItem.Any(ci => ci.Descripcion.Contains(libre)))
                    .Select(ca => new {
                        Id = ca.Id,
                        Fecha = ca.Fecha,
                        FechaAnulado = ca.FechaAnulado,
                        IdClienteNavigation = ca.IdClienteNavigation.Optica,
                        IdComprobanteItem = ca.ComprobanteItem.Where(ci => ci.Descripcion.Contains(libre)).Select(c => c.Id),
                        Producto = ca.ComprobanteItem.Where(ci => ci.Descripcion.Contains(libre)).Select(c => c.Descripcion)
                    })
                    .OrderByDescending(c => c.Fecha)
                    .ToList<dynamic>();
            }
            return null;
        }

        public List<dynamic> BuscarRemito(int idCliente, DateTime fechaDesde, DateTime fechaHasta)
        {
            if (idCliente > 0)
            {
                return _context.Remito
                    .Include(c => c.IdClienteNavigation)
                    .Include(c => c.ComprobanteItem)
                    .Where(cc => cc.Fecha >= fechaDesde && cc.Fecha <= fechaHasta.AddDays(1) && idCliente == cc.IdCliente)
                   .Select(ca => new
                   {
                       Id = ca.Id,
                       Fecha = ca.Fecha,
                       FechaFactura = ca.FechaFactura,
                       FechaAnulado = ca.FechaAnulado,
                       //Numero = ca.Numero,
                       IdClienteNavigation = ca.IdClienteNavigation.Optica,
                       MontoTotal = 0 /*ca.ComprobanteItem.Sum(ci => ci.Monto)*/,
                       IdTipoComprobanteNavigation = "Remito"
                   })
                    .OrderByDescending(c => c.Fecha)
                    .ToList<dynamic>();
            }
            else
            {
                return _context.Remito
                    .Include(c => c.IdClienteNavigation)
                    .Include(c => c.ComprobanteItem)
                    .Where(cc => cc.Fecha >= fechaDesde && cc.Fecha <= fechaHasta.AddDays(1))
                   .Select(ca => new
                   {
                       Id = ca.Id,
                       Fecha = ca.Fecha,
                       FechaFactura = ca.FechaFactura,
                       FechaAnulado = ca.FechaAnulado,
                       //Numero = ca.Numero,
                       IdClienteNavigation = ca.IdClienteNavigation.Optica,
                       MontoTotal = 0 /*ca.ComprobanteItem.Sum(ci => ci.Monto)*/,
                       IdTipoComprobanteNavigation = "Remito"
                   })
                    .OrderByDescending(c => c.Fecha)
                    .ToList<dynamic>();
            }
        }

        public List<dynamic> BuscarRemitosAnulados(DateTime fechaDesde, DateTime fechaHasta)
        {
            return _context.Remito
                .Include(c => c.IdClienteNavigation)
                .Include(c => c.ComprobanteItem)
                .Where(cc => cc.Fecha >= fechaDesde && cc.Fecha <= fechaHasta.AddDays(1) && cc.FechaAnulado != null)
               .Select(ca => new
               {
                   Id = ca.Id,
                   Fecha = ca.Fecha,
                   FechaFactura = ca.FechaFactura,
                   FechaAnulado = ca.FechaAnulado,
                   IdClienteNavigation = ca.IdClienteNavigation.Optica,
                   MontoTotal = ca.ComprobanteItem.Sum(ci => ci.Monto),
                   IdTipoComprobanteNavigation = "Remito"
               })
                .OrderByDescending(c => c.Fecha)
                .ToList<dynamic>();

        }
    }
}
