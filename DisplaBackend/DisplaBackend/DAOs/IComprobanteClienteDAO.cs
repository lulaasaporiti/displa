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
        Task<ComprobanteCliente> AltaComprobantes(ComprobanteCliente comprobanteCliente, List<Remito> remitos, Parametros parametros);
        bool Delete(ComprobanteCliente comprobanteCliente);
        ComprobanteCliente GetById(int idComprobanteCliente);
        List<ComprobanteCliente> GetCuentaPorCliente(int idCliente, DateTime fecha);
        List<dynamic> BuscarItem(int idLente, int idArticulo, string libre, DateTime desde, DateTime hasta);
        List<dynamic> BuscarComprobante(int idCliente, DateTime fechaDesde, DateTime fechaHasta);
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



        public async Task<ComprobanteCliente> AltaComprobantes(ComprobanteCliente comprobanteCliente, List<Remito> remitos, Parametros parametros)
        {
            try
            {
                ComprobanteCliente comprobanteAuxiliar = comprobanteCliente;
                int numeroComprobante = comprobanteCliente.Numero;
                var clienteBBDD = _context.Cliente.Where(c => c.Id == comprobanteCliente.IdCliente).Include(c => c.IdCategoriaIvaNavigation).FirstOrDefault();
                while (comprobanteCliente.ComprobanteItem.Count > 0)
                {
                    comprobanteAuxiliar.ComprobanteItem = (ICollection<ComprobanteItem>)comprobanteCliente.ComprobanteItem.Take(parametros.CantidadProductoDiferentes.Value);
                    comprobanteAuxiliar.Numero = numeroComprobante;

                    decimal subtotal = 0;

                    comprobanteAuxiliar.Fecha = DateTime.Now;
                    comprobanteAuxiliar.Sucursal = 5;
                    comprobanteAuxiliar = _context.Add(comprobanteAuxiliar).Entity;
                    foreach (var c in comprobanteAuxiliar.ComprobanteItem.ToList())
                    {
                        if (c.Descripcion != null && c.Descripcion.EndsWith("VIRTUAL"))
                        {
                            subtotal = subtotal + c.Monto;
                        }
                        else
                        {
                            subtotal = subtotal + (c.Monto - (c.Monto * clienteBBDD.PorcentajeDescuentoGeneral.Value) / 100);
                        }

                        //////// AGREGAR MONTO IVA SI TIENE PROPIO EL COMPROBANTE ITEM

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

                        if (c.EntregaVentaVirtual == true)
                        {
                            List<VentaVirtual> ventas;
                            if (c.IdArticulo != null)
                                ventas = _context.VentaVirtual.Where(v => v.IdArticulo == c.IdArticulo && v.IdComprobanteNavigation.IdCliente == comprobanteAuxiliar.IdCliente && v.CantidadEntregada < v.CantidadVendida).ToList();
                            else
                                ventas = _context.VentaVirtual.Where(v => v.IdLente == c.ComprobanteItemLente.ElementAt(0).IdLente && v.IdComprobanteNavigation.IdCliente == comprobanteAuxiliar.IdCliente && v.CantidadEntregada < v.CantidadVendida).ToList();
                            decimal cantidadItem = c.Cantidad;
                            ventas.ForEach(v =>
                            {
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
                                        movimiento.IdComprobanteCliente = comprobanteAuxiliar.Id;
                                        movimiento.IdUsuario = comprobanteAuxiliar.IdUsuario.Value;
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
                                        movimiento.IdComprobanteCliente = comprobanteAuxiliar.Id;
                                        movimiento.IdUsuario = comprobanteAuxiliar.IdUsuario.Value;
                                        movimiento.IdVentaVirtual = v.Id;
                                        _context.VentaVirtualMovimientos.Add(movimiento);
                                    }
                                }
                            });
                        }
                    }
                    var servicios = comprobanteAuxiliar.ComprobanteItem.Select(c => c.ComprobanteItemServicio);
                    var recargos = comprobanteAuxiliar.ComprobanteItem.Select(c => c.ComprobanteItemRecargo);
                    if (servicios.Count() > 0)
                    {
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
                    foreach (var v in comprobanteAuxiliar.VentaVirtual.ToList())
                    {
                        v.IdArticuloNavigation = null;
                        v.IdServicioNavigation = null;
                    }
                    //comprobanteCliente = _context.Add(comprobanteCliente).Entity;

                    // HAY QUE CHEQUEAR QUE LA CANTIDAD DE RENGLONES DE LOS REMITOS NO SUPERE AL DEL COMPROBANTE, PARA ASIGNARLE EL ID DEL COMPROBANTE QUE CORRESPONDE 
                    // AL COMPROBANTEITEM DEL REMITO
                    if (remitos.Count > 0)
                    {
                        remitos.ForEach(r =>
                        {
                            r.FechaFactura = comprobanteAuxiliar.Fecha;
                            foreach (var c in r.ComprobanteItem)
                            {
                                c.IdComprobante = comprobanteAuxiliar.Id;
                                _context.ComprobanteItem.Update(c);
                            }
                            _context.Remito.Update(r);
                        });
                    }

                    if (clienteBBDD.IdCategoriaIvaNavigation.Discrimina == false)
                    {
                        comprobanteAuxiliar.MontoTotal = (comprobanteAuxiliar.SubTotalFactura * comprobanteAuxiliar.PorcentajeDtoGral.Value) / 100;
                    }
                    else
                    {
                        comprobanteAuxiliar.MontoIvari = ((comprobanteAuxiliar.SubTotalFactura * comprobanteAuxiliar.PorcentajeDtoGral.Value) / 100) * (comprobanteAuxiliar.TasaIva.Value / 100);
                        comprobanteAuxiliar.MontoTotal = ((comprobanteAuxiliar.SubTotalFactura * comprobanteAuxiliar.PorcentajeDtoGral.Value) / 100) * (1 + (comprobanteAuxiliar.TasaIva.Value / 100));
                    }
                    numeroComprobante++;
                    comprobanteCliente.ComprobanteItem = (ICollection<ComprobanteItem>)comprobanteCliente.ComprobanteItem.Skip(parametros.CantidadProductoDiferentes.Value);
                }
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return null;
            }
            return null;
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
                        if (c.EntregaVentaVirtual == true)
                        {
                            List<VentaVirtual> ventas;
                            if (c.IdArticulo != null)
                                ventas = _context.VentaVirtual.Where(v => v.IdArticulo == c.IdArticulo && v.IdComprobanteNavigation.IdCliente == comprobanteCliente.IdCliente && v.CantidadEntregada < v.CantidadVendida).ToList();
                            else
                                ventas = _context.VentaVirtual.Where(v => v.IdLente == c.ComprobanteItemLente.ElementAt(0).IdLente && v.IdComprobanteNavigation.IdCliente == comprobanteCliente.IdCliente && v.CantidadEntregada < v.CantidadVendida).ToList();
                            decimal cantidadItem = c.Cantidad;
                            ventas.ForEach(v =>
                            {
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
                    if (servicios.Count() > 0)
                    {
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
                        remitos.ForEach(r =>
                        {
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
                    .Where(cc => cc.Fecha >= desde && cc.Fecha <= hasta.AddDays(1) && cc.ComprobanteItem.Any(ci => ci.ComprobanteItemLente.Any(cl => cl.IdLente == idLente)))
                   .Select(ca => new
                   {
                       Id = ca.Id,
                       IdTipoComprobante = ca.IdTipoComprobante,
                       IdTipoComprobanteNavigation = ca.IdTipoComprobanteNavigation.Descripcion,
                       Fecha = ca.Fecha,
                       FechaAnulado = ca.FechaAnulado,
                       Letra = ca.Letra,
                       Numero = ca.Numero,
                       IdClienteNavigation = ca.IdClienteNavigation.Optica,
                       IdComprobanteItem = ca.ComprobanteItem.Where(ci => ci.ComprobanteItemLente.Any(cil => cil.IdLente == idLente)).Select(c => c.Id),
                       Producto = ca.ComprobanteItem.Where(ci => ci.ComprobanteItemLente.Any(cil => cil.IdLente == idLente)).Select(c => c.Descripcion)
                   })
                    .OrderByDescending(c => c.Fecha)
                    .ToList<dynamic>();
            }
            if (idArticulo > 0)
            {
                return _context.ComprobanteCliente
                    .Include(c => c.IdTipoComprobanteNavigation)
                    .Include(c => c.IdClienteNavigation)
                    .Include(c => c.ComprobanteItem)
                    .Where(cc => cc.Fecha >= desde && cc.Fecha <= hasta.AddDays(1) && cc.ComprobanteItem.Any(ci => ci.IdArticulo == idArticulo))
                    .Select(ca => new
                    {
                        Id = ca.Id,
                        IdTipoComprobante = ca.IdTipoComprobante,
                        IdTipoComprobanteNavigation = ca.IdTipoComprobanteNavigation.Descripcion,
                        Fecha = ca.Fecha,
                        FechaAnulado = ca.FechaAnulado,
                        Letra = ca.Letra,
                        Numero = ca.Numero,
                        IdClienteNavigation = ca.IdClienteNavigation.Optica,
                        IdComprobanteItem = ca.ComprobanteItem.Where(ci => ci.IdArticulo == idArticulo).Select(c => c.Id),
                        Producto = ca.ComprobanteItem.Where(ci => ci.IdArticulo == idArticulo).Select(a => a.IdArticuloNavigation.Nombre)
                    })
                    .OrderByDescending(c => c.Fecha)
                    .ToList<dynamic>();
            }
            if (libre != null)
            {
                return _context.ComprobanteCliente
                    .Include(c => c.IdTipoComprobanteNavigation)
                    .Include(c => c.IdClienteNavigation)
                    .Include(c => c.ComprobanteItem)
                    .Where(cc => cc.Fecha >= desde && cc.Fecha <= hasta.AddDays(1) && cc.ComprobanteItem.Any(ci => ci.Descripcion.Contains(libre)))
                    .Select(ca => new
                    {
                        Id = ca.Id,
                        IdTipoComprobante = ca.IdTipoComprobante,
                        IdTipoComprobanteNavigation = ca.IdTipoComprobanteNavigation.Descripcion,
                        Fecha = ca.Fecha,
                        FechaAnulado = ca.FechaAnulado,
                        Letra = ca.Letra,
                        Numero = ca.Numero,
                        IdClienteNavigation = ca.IdClienteNavigation.Optica,
                        IdComprobanteItem = ca.ComprobanteItem.Where(ci => ci.Descripcion.Contains(libre)).Select(c => c.Id),
                        Producto = ca.ComprobanteItem.Where(ci => ci.Descripcion.Contains(libre)).Select(c => c.Descripcion)
                    })
                    .OrderByDescending(c => c.Fecha)
                    .ToList<dynamic>();
            }
            return null;
        }

        public List<dynamic> BuscarComprobante(int idCliente, DateTime fechaDesde, DateTime fechaHasta)
        {
            if (idCliente > 0)
            {
                return _context.ComprobanteCliente
                    .Include(c => c.IdTipoComprobanteNavigation)
                    .Include(c => c.IdClienteNavigation)
                    .Include(c => c.ComprobanteItem)
                    .Where(cc => cc.Fecha >= fechaDesde && cc.Fecha <= fechaHasta.AddDays(1) && idCliente == cc.IdCliente)
                   .Select(ca => new
                   {
                       Id = ca.Id,
                       IdTipoComprobante = ca.IdTipoComprobante,
                       IdTipoComprobanteNavigation = ca.IdTipoComprobanteNavigation.Descripcion,
                       Fecha = ca.Fecha,
                       FechaAnulado = ca.FechaAnulado,
                       Letra = ca.Letra,
                       Numero = ca.Numero,
                       IdClienteNavigation = ca.IdClienteNavigation.Optica,
                       MontoTotal = ca.MontoTotal
                   })
                    .OrderByDescending(c => c.Fecha)
                    .ToList<dynamic>();
            }
            else
            {
                return _context.ComprobanteCliente
                    .Include(c => c.IdTipoComprobanteNavigation)
                    .Include(c => c.IdClienteNavigation)
                    .Include(c => c.ComprobanteItem)
                    .Where(cc => cc.Fecha >= fechaDesde && cc.Fecha <= fechaHasta.AddDays(1))
                   .Select(ca => new
                   {
                       Id = ca.Id,
                       IdTipoComprobante = ca.IdTipoComprobante,
                       IdTipoComprobanteNavigation = ca.IdTipoComprobanteNavigation.Descripcion,
                       Fecha = ca.Fecha,
                       FechaAnulado = ca.FechaAnulado,
                       Letra = ca.Letra,
                       Numero = ca.Numero,
                       IdClienteNavigation = ca.IdClienteNavigation.Optica,
                       MontoTotal = ca.MontoTotal
                   })
                    .OrderByDescending(c => c.Fecha)
                    .ToList<dynamic>();
            }
        }
    }
}
