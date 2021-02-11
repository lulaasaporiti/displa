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
        Task<ComprobanteCliente> SaveOrUpdate(ComprobanteCliente comprobanteCliente, List<Remito> remitos);
        bool Delete(ComprobanteCliente comprobanteCliente);
        ComprobanteCliente GetById(int idComprobanteCliente);
        List<ComprobanteCliente> GetCuentaPorCliente(int idCliente, DateTime fecha);
        List<dynamic> BuscarItem(int idLente, int idArticulo, string libre, DateTime desde, DateTime hasta);
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

        public async Task<ComprobanteCliente> SaveOrUpdate(ComprobanteCliente comprobanteCliente, List<Remito> remitos)
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
                    comprobanteCliente = _context.Add(comprobanteCliente).Entity;
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
                        ///////HAY QUE SUMAR LA CANTIDAD ENTREGADA EN LA VENTA VIRTUAL
                        if (c.EntregaVentaVirtual == true) {
                            List<VentaVirtual> ventas;
                            if (c.IdArticulo != null)
                                ventas = _context.VentaVirtual.Where(v => v.IdArticulo == c.IdArticulo && v.IdComprobanteNavigation.IdCliente == comprobanteCliente.IdCliente && v.CantidadEntregada < v.CantidadVendida).ToList();
                            else
                                ventas = _context.VentaVirtual.Where(v => v.IdLente == c.ComprobanteItemLente.ElementAt(0).IdLente && v.IdComprobanteNavigation.IdCliente == comprobanteCliente.IdCliente && v.CantidadEntregada < v.CantidadVendida).ToList();
                            decimal cantidadItem = c.Cantidad;
                            ventas.ForEach(v => {
                                if (cantidadItem > 0)
                                {
                                    if (cantidadItem < (v.CantidadVendida - v.CantidadEntregada))
                                    {
                                        v.CantidadEntregada = v.CantidadEntregada + cantidadItem;
                                        _context.VentaVirtual.Update(v);
                                        VentaVirtualMovimientos movimiento = new VentaVirtualMovimientos();
                                        movimiento.Cantidad = cantidadItem;
                                        cantidadItem = 0;
                                        movimiento.Entrega = true;
                                        movimiento.IdComprobanteCliente = comprobanteCliente.Id;
                                        movimiento.IdUsuario = comprobanteCliente.IdUsuario.Value;
                                        movimiento.IdVentaVirtual = v.Id;
                                        _context.VentaVirtualMovimientos.Add(movimiento);
                                    }
                                    else
                                    {
                                        VentaVirtualMovimientos movimiento = new VentaVirtualMovimientos();
                                        movimiento.Cantidad = v.CantidadVendida - v.CantidadEntregada;
                                        cantidadItem = cantidadItem - movimiento.Cantidad.Value;
                                        v.CantidadEntregada = v.CantidadVendida;
                                        _context.VentaVirtual.Update(v);
                                        movimiento.Entrega = true;
                                        movimiento.IdComprobanteCliente = comprobanteCliente.Id;
                                        movimiento.IdUsuario = comprobanteCliente.IdUsuario.Value;
                                        movimiento.IdVentaVirtual = v.Id;
                                        _context.VentaVirtualMovimientos.Add(movimiento);
                                    }
                                }
                            });
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
                    //comprobanteCliente = _context.Add(comprobanteCliente).Entity;
                    if (remitos.Count > 0)
                    {
                        remitos.ForEach(r => {
                            r.FechaFactura = comprobanteCliente.Fecha;
                            foreach (var c in r.ComprobanteItem)
                            {
                                c.IdComprobante = comprobanteCliente.Id;
                                _context.ComprobanteItem.Update(c);
                            }
                            _context.Remito.Update(r);
                        });
                    }
                }
                else
                {
                    comprobanteCliente = _context.ComprobanteCliente.Update(comprobanteCliente).Entity;
                }
                await _context.SaveChangesAsync();
                return comprobanteCliente;

            }
            catch (Exception e)
            {
                return null;
            }
        }

        public ComprobanteCliente GetById(int idComprobanteCliente)
        {
            return _context.ComprobanteCliente
                .Include(c => c.ComprobanteItem)
                .Include(c => c.IdClienteNavigation)
                .Include(c => c.IdTipoComprobanteNavigation)
                .Include(c => c.IdUsuarioNavigation)
                .Include(c => c.VentaVirtual)
                .FirstOrDefault(u => u.Id == idComprobanteCliente);
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

        public List<ComprobanteCliente> GetCuentaPorCliente(int idCliente, DateTime fecha)
        {
            return _context.ComprobanteCliente.Include(c => c.IdTipoComprobanteNavigation).Where(cc => cc.IdCliente == idCliente && cc.Fecha > fecha).ToList();
        }

        public List<dynamic> BuscarItem(int idLente, int idArticulo, string libre, DateTime desde, DateTime hasta)
        {
            if (idLente > 0)
            {
                return _context.ComprobanteCliente
                    .Include(c => c.IdTipoComprobanteNavigation)
                    .Include(c => c.IdClienteNavigation)
                    .Include(c => c.ComprobanteItem)
                    .Where(cc => cc.Fecha >= desde && cc.Fecha <= hasta && cc.ComprobanteItem.Any(ci => ci.ComprobanteItemLente.Any(cl => cl.IdLente == idLente)))
                   .Select(ca => new {
                       Id = ca.Id,
                       IdTipoComprobante = ca.IdTipoComprobante,
                       IdTipoComprobanteNavigation = ca.IdTipoComprobanteNavigation.Descripcion,
                       Fecha = ca.Fecha,
                       Letra = ca.Letra,
                       Numero = ca.Numero,
                       IdClienteNavigation = ca.IdClienteNavigation.Optica,
                       IdComprobanteItem = ca.ComprobanteItem.Where(ci => ci.ComprobanteItemLente.Any(cil => cil.IdLente == idLente)).Select(c => c.Id)
                   })
                    .OrderByDescending(c => c.Fecha)
                    .ToList<dynamic>();
            }
            if (idArticulo > 0) {
                return _context.ComprobanteCliente
                    .Include(c => c.IdTipoComprobanteNavigation)
                    .Include(c => c.IdClienteNavigation)
                    .Include(c => c.ComprobanteItem)
                    .Where(cc => cc.Fecha >= desde && cc.Fecha <= hasta && cc.ComprobanteItem.Any(ci => ci.IdArticulo == idArticulo))
                    .Select(ca => new {
                        Id = ca.Id,
                        IdTipoComprobante = ca.IdTipoComprobante,
                        IdTipoComprobanteNavigation = ca.IdTipoComprobanteNavigation.Descripcion,
                        Fecha = ca.Fecha,
                        Letra = ca.Letra,
                        Numero = ca.Numero,
                        IdClienteNavigation = ca.IdClienteNavigation.Optica,
                        IdComprobanteItem = ca.ComprobanteItem.Where(ci => ci.IdArticulo == idArticulo).Select(c => c.Id)
                    })
                    .OrderByDescending(c => c.Fecha)
                    .ToList<dynamic>();
            }
            if (libre != null) {
                return _context.ComprobanteCliente
                    .Include(c => c.IdTipoComprobanteNavigation)
                    .Include(c => c.IdClienteNavigation)
                    .Include(c => c.ComprobanteItem)
                    .Where(cc => cc.Fecha >= desde && cc.Fecha <= hasta && cc.ComprobanteItem.Any(ci => ci.Descripcion.Contains(libre)))
                    .Select(ca => new {
                        Id = ca.Id,
                        IdTipoComprobante = ca.IdTipoComprobante,
                        IdTipoComprobanteNavigation = ca.IdTipoComprobanteNavigation.Descripcion,
                        Fecha = ca.Fecha,
                        Letra = ca.Letra,
                        Numero = ca.Numero,
                        IdClienteNavigation = ca.IdClienteNavigation.Optica,
                        IdComprobanteItem = ca.ComprobanteItem.Where(ci => ci.Descripcion.Contains(libre)).Select(c => c.Id)
                    })
                    .OrderByDescending(c => c.Fecha)
                    .ToList<dynamic>();
            }
            return null;
        }
    }
}
