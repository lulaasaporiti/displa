using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IComprobanteClienteDAO
    {
        List<ComprobanteCliente> GetComprobantesCliente();
        List<ComprobanteCliente> GetComprobantesClienteVigentes();
        Task<bool> SaveOrUpdate(ComprobanteCliente comprobanteCliente);
        bool Delete(ComprobanteCliente comprobanteCliente);
        ComprobanteCliente GetById(int idComprobanteCliente);

    }

    public class ComprobanteClienteDAO : IComprobanteClienteDAO
    {
        private readonly DisplaNEWContext _context;

        public ComprobanteClienteDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<ComprobanteCliente> GetComprobantesCliente()
        {
            return _context.ComprobanteCliente
                .Include(c => c.ComprobanteItem)
                .Include(c => c.IdTipoComprobanteNavigation)
                .Include(c => c.VentaVirtual)
                .ToList();
        }

        public List<ComprobanteCliente> GetComprobantesClienteVigentes()
        {
            return _context.ComprobanteCliente
                .Include(c => c.ComprobanteItem)
                .Include(c => c.IdTipoComprobanteNavigation)
                .Include(c => c.VentaVirtual)
                .ToList();
        }

        public async Task<bool> SaveOrUpdate(ComprobanteCliente comprobanteCliente)
        {
            try
            {
                //var clienteBBDD = _context.Cliente.Where(c => c.Id == comprobanteCliente.IdCliente).FirstOrDefault();
                //if (clienteBBDD.PorcentajeDescuentoGeneral != comprobanteCliente.IdClienteNavigation.PorcentajeDescuentoGeneral)
                //{
                //    clienteBBDD.PorcentajeDescuentoGeneral = comprobanteCliente.IdClienteNavigation.PorcentajeDescuentoGeneral;
                //    _context.Cliente.Update(clienteBBDD);
                //    comprobanteCliente.IdClienteNavigation = null;
                //}
                if (comprobanteCliente.Id == 0)
                {
                    comprobanteCliente.Fecha = DateTime.Now;
                    comprobanteCliente.Sucursal = 5;
                    //////////////agregar el navigation de lente en null cuando lo terminemos.//////////
                    foreach (var c in comprobanteCliente.ComprobanteItem.ToList())
                    {
                        if (c.IdArticuloNavigation != null)
                        {
                            var articulo = c.IdArticuloNavigation;
                            c.IdArticuloNavigation = null;
                            articulo.StockActual = articulo.StockActual - c.Cantidad;
                            _context.Entry(articulo).State = EntityState.Modified;
                        }
                        c.IdServicioNavigation = null;

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
                    var servicios = comprobanteCliente.ComprobanteItem.Select(c => c.ComprobanteItemServicio);
                    var recargos = comprobanteCliente.ComprobanteItem.Select(c => c.ComprobanteItemRecargo);
                    if (servicios.Count() > 0) {
                        foreach (var s in servicios.ElementAt(0).ToArray())
                        {
                            s.IdServicioNavigation = null;
                            _context.ComprobanteItemServicio.Add(s);
                        }
                    }
                    if (recargos.Count() > 0)
                    {
                        foreach (var r in recargos.ElementAt(0).ToArray())
                        {
                            r.IdRecargoNavigation = null;
                            _context.ComprobanteItemRecargo.Add(r);
                        }
                    }
                    foreach (var v in comprobanteCliente.VentaVirtual.ToList())
                    {
                        v.IdArticuloNavigation = null;
                        v.IdServicioNavigation = null;
                    }
                    comprobanteCliente = _context.Add(comprobanteCliente).Entity;

                    
                }
                else
                {
                    comprobanteCliente = _context.ComprobanteCliente.Update(comprobanteCliente).Entity;

                }
                return await _context.SaveChangesAsync() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public ComprobanteCliente GetById(int idComprobanteCliente)
        {
            return _context.ComprobanteCliente.FirstOrDefault(u => u.Id == idComprobanteCliente);
        }

        public bool Delete(ComprobanteCliente comprobanteCliente)
        {
            try
            {
                comprobanteCliente = _context.ComprobanteCliente.Update(comprobanteCliente).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
