using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IClienteDAO
    {
        List<Cliente> GetClientes();
        List<Cliente> GetClientesVigentes();
        int SaveOrUpdate(Cliente cliente);
        bool Delete(Cliente cliente);
        Cliente GetById(int idCliente);
        List<Cliente> GetClientesActivos();
        bool SavePreciosArticulos(List<PrecioArticuloCliente> preciosArticulos);
        bool SavePreciosServicios(List<PrecioServicioCliente> preciosServicios);
        bool SavePreciosLentes(List<PrecioLenteCliente> preciosLentes);
        //bool SavePreciosEspecialesArticulos(List<PrecioEspecialArticuloCliente> preciosArticulos);
        List<PrecioArticuloCliente> GetPreciosArticulosCliente(int idCliente);
        List<PrecioServicioCliente> GetPreciosServiciosCliente(int idCliente);
        List<PrecioLenteCliente> GetPreciosLentesCliente(int idCliente);
        dynamic GetFichaCliente(int idCliente);
        bool SaveFicha(Ficha ficha);
        bool BloquearClientes();
        List<dynamic> GetCuentasClientes();
        int AsignarPreciosLentes(JObject[] preciosLentes, List<dynamic> listaPrecios);
        int AsignarPreciosServicios(JObject[] preciosServicios, List<Servicio> listaPrecios);
        int AsignarPreciosArticulos(JObject[] preciosArticulos, List<ArticuloVario> listaPrecios);
        List<dynamic> GetListaAsignacionLente(List<dynamic> listaPrecios);
        List<dynamic> GetListaAsignacionServicio(List<Servicio> listaPrecios);
        List<dynamic> GetListaAsignacionArticulo(List<ArticuloVario> listaPrecios);
        decimal GetPrecioLenteFactura(int idCliente, int idLente, int Esferico, int Cilindrico, PrecioLente precioMinimo);
        JObject GetPrecioArticuloFactura(int idCliente, int[] articulos);
        JObject GetPrecioServicioFactura(int idCliente, int[] servicios);
        bool SaveClienteBloqueo(ClienteBloqueo bloqueo);
        double GetDiasPlazo(int idCliente);
        bool DeleteFicha(int idFicha);
    }

    public class ClienteDAO : IClienteDAO
    {
        private readonly DisplaNEWContext _context;


        public ClienteDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<Cliente> GetClientesVigentes()
        {
            List<Cliente> clientes = _context.Cliente
                .Where(c => c.Borrado == false)
                .Select(c => new Cliente
                {
                    Id = c.Id,
                    Cuit = c.Cuit,
                    Optica = c.Optica,
                    Responsable = c.Responsable,
                    Direccion = c.Direccion,
                    Telefonos = c.Telefonos,
                    UtilizaSobre = c.UtilizaSobre,
                    Mail = c.Mail,
                    Bloqueado = c.Bloqueado,
                    Borrado = c.Borrado,
                })
                .ToList();
            return clientes;
        }

        public List<Cliente> GetClientesActivos()
        {
            List<Cliente> clientes = _context.Cliente
                .Where(c => c.Bloqueado == false && c.Borrado == false)
                .Select(c => new Cliente
                {
                    Id = c.Id,
                    Cuit = c.Cuit,
                    Optica = c.Optica,
                    Responsable = c.Responsable,
                    Direccion = c.Direccion,
                    Telefonos = c.Telefonos,
                    UtilizaSobre = c.UtilizaSobre,
                    Mail = c.Mail,
                    Bloqueado = c.Bloqueado,
                    Borrado = c.Borrado,
                })
                .ToList();
            return clientes;
        }

        public List<Cliente> GetClientes()
        {
            //var clientes = _context.Cliente
            //    .Include(c => c.IdCategoriaIvaNavigation)
            //    .Include(c => c.IdCondicionVentaNavigation)
            //    .Include(c => c.IdLocalidadNavigation.Id)
            //    .Include(c => c.IdLocalidadNavigation.Nombre)
            //    .Include(c => c.IdLocalidadNavigation.Cp)
            //    .OrderByDescending(c => c.Borrado)
            //    .ToList();

            List<Cliente> clientes = _context.Cliente
                .Select(c => new Cliente
                {
                    Id = c.Id,
                    Cuit = c.Cuit,
                    Optica = c.Optica,
                    Responsable = c.Responsable,
                    Direccion = c.Direccion,
                    Telefonos = c.Telefonos,
                    UtilizaSobre = c.UtilizaSobre,
                    Mail = c.Mail,
                    Bloqueado = c.Bloqueado,
                    Borrado = c.Borrado,
                })
                .ToList();
            return clientes;
        }

        public int SaveOrUpdate(Cliente cliente)
        {
            try
            {
                if (cliente.Id == 0)
                {
                    cliente = _context.Add(cliente).Entity;
                }
                else
                {
                    cliente = _context.Cliente.Update(cliente).Entity;

                }
                _context.SaveChanges();
                return cliente.Id;

            }
            catch (Exception e)
            {
                return -1;
            }
        }

        public bool SaveFicha(Ficha ficha)
        {
            try
            {
                if (ficha.Id == 0)
                {
                    ficha = _context.Add(ficha).Entity;
                }
                else
                {
                    ficha = _context.Ficha.Update(ficha).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }

        }

        public bool SaveClienteBloqueo(ClienteBloqueo bloqueo)
        {
            try
            {
                var cliente = _context.Cliente.FirstOrDefault(c => c.Id == bloqueo.IdCliente);
                if (bloqueo.Id == 0)
                {
                    bloqueo = _context.Add(bloqueo).Entity;
                    cliente.Bloqueado = true;
                }
                else
                {
                    cliente.Bloqueado = false;
                }
                _context.Cliente.Update(cliente);
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }

        }

        public Cliente GetById(int idCliente)
        {
            var cliente = _context.Cliente
                .Include(c => c.IdLocalidadNavigation)
                .Include(c => c.IdCategoriaIvaNavigation)
                .Include(c => c.IdCondicionVentaNavigation)
                .Include(c => c.Ficha)
                .Include(c => c.ClienteBloqueo)
                .FirstOrDefault(c => c.Id == idCliente);
            
            return cliente;
        }

        public double GetDiasPlazo(int idCliente)
        {
            DateTime today = DateTime.Now;
            int mensajeAvisoBloqueo = 0;
            var cliente = _context.Cliente.Where(c => c.Id == idCliente).FirstOrDefault();
            ComprobanteCliente ultimoComprobante = _context.ComprobanteCliente.LastOrDefault(cc => cc.IdCliente == cliente.Id);
            mensajeAvisoBloqueo = Convert.ToInt32((today - ultimoComprobante.Fecha).TotalDays);
            return mensajeAvisoBloqueo;

        }

        public List<PrecioArticuloCliente> GetPreciosArticulosCliente(int idCliente)
        {
            return _context.PrecioArticuloCliente
                .Include(p => p.IdPrecioArticuloNavigation)
                    .ThenInclude(pa => pa.IdArticuloNavigation)
                    .ThenInclude(ti => ti.IdTipoArticuloNavigation)
                .Where(p => p.IdCliente == idCliente).ToList();
        }

        public List<PrecioServicioCliente> GetPreciosServiciosCliente(int idCliente)
        {
            return _context.PrecioServicioCliente
                .Include(p => p.IdPrecioServicioNavigation)
                    .ThenInclude(ps => ps.IdServicioNavigation)
                    .ThenInclude(ti => ti.IdTipoServicioNavigation)
                .Where(p => p.IdCliente == idCliente).ToList();
        }

        public List<PrecioLenteCliente> GetPreciosLentesCliente(int idCliente)
        {
            return _context.PrecioLenteCliente
                .Include(p => p.IdPrecioLenteNavigation)
                    .ThenInclude(pl => pl.IdLenteNavigation)
                .Where(p => p.IdCliente == idCliente)
                .ToList();
        }

        public dynamic GetFichaCliente(int idCliente)
        {
            var fichas = _context.Ficha
                .Where(f => f.IdCliente == idCliente)
                .Select(f => new {
                    Id = f.Id,
                    Fecha = f.Fecha.Value,
                    Descripcion = f.Descripcion,
                    EsFicha = true
                })
                .ToList();

            var ventaVirtuales = _context.VentaVirtual
                .Where(v => v.IdComprobanteNavigation.IdCliente == idCliente)
                .Select(v =>  new {
                    Id = v.Id,
                    Fecha = v.IdComprobanteNavigation.Fecha,
                    Descripcion = "Se compraron " + v.CantidadVendida + " de " + v.Descripcion,
                    EsFicha = false
                })
                .ToList();

            //IDictionary<string, dynamic> res = new Dictionary<string, dynamic>();
            //res["payload"] = (fichas.Concat(ventaVirtuales)).OrderBy(f => f.Fecha);
            return (fichas.Concat(ventaVirtuales)).OrderBy(f => f.Fecha);
        }

        public bool Delete(Cliente cliente)
        {
            try
            {
                cliente.Borrado = !cliente.Borrado;
                _context.Cliente.Update(cliente);
                return _context.SaveChanges() >= 1;
            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }


        public bool DeleteFicha(int idFicha)
        {
            try
            {
                Ficha ficha = _context.Ficha.FirstOrDefault(f => f.Id == idFicha);
                _context.Ficha.Remove(ficha);
                return _context.SaveChanges() >= 1;
            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }

        public bool SavePreciosArticulos(List<PrecioArticuloCliente> preciosArticulos)
        {
            List<PrecioArticuloCliente> preciosClientes = _context.Cliente
                .Include(c => c.PrecioArticuloCliente)
                    .ThenInclude(p => p.IdPrecioArticuloNavigation)
                .AsNoTracking()
                .FirstOrDefault(c => c.Id == preciosArticulos.First().IdCliente).PrecioArticuloCliente.ToList();
            List<PrecioArticuloCliente> preciosABorrar = new List<PrecioArticuloCliente>();

            try
            {
                foreach (var p in preciosArticulos)
                {
                    foreach (var pc in preciosClientes)
                    {
                        if (pc.IdPrecioArticulo != p.IdPrecioArticulo && pc.IdPrecioArticuloNavigation.IdArticulo == p.IdPrecioArticuloNavigation.IdArticulo
                            && pc.Especial != true && p.Especial != true)
                            preciosABorrar.Add(pc);
                    }
                    if (p.IdPrecioArticulo == 0 && p.Especial == true)
                    {
                        p.IdPrecioArticuloNavigation = _context.PrecioArticulo.Add(p.IdPrecioArticuloNavigation).Entity;
                        _context.SaveChanges();
                        p.IdPrecioArticulo = p.IdPrecioArticuloNavigation.Id;
                    }
                    p.IdPrecioArticuloNavigation = null;
                    if (p.Id == 0)
                    {
                        _context.PrecioArticuloCliente.Add(p);
                    }
                    else
                    {
                        _context.PrecioArticuloCliente.Update(p);
                    }
                }
                foreach (var p in preciosABorrar)
                {
                    p.IdClienteNavigation = null;
                    p.IdPrecioArticuloNavigation = null;
                    _context.PrecioArticuloCliente.Remove(p);
                }
                return _context.SaveChanges() >= 1;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool SavePreciosServicios(List<PrecioServicioCliente> preciosServicios)
        {
            List<PrecioServicioCliente> preciosClientes = _context.Cliente
                .Include(c => c.PrecioServicioCliente)
                    .ThenInclude(p => p.IdPrecioServicioNavigation)
                .AsNoTracking()
                .FirstOrDefault(c => c.Id == preciosServicios.First().IdCliente).PrecioServicioCliente.ToList();
            List<PrecioServicioCliente> preciosABorrar = new List<PrecioServicioCliente>();

            try
            {
                foreach (var p in preciosServicios)
                {
                    foreach (var pc in preciosClientes)
                    {
                        if (pc.IdPrecioServicio != p.IdPrecioServicio && pc.IdPrecioServicioNavigation.IdServicio == p.IdPrecioServicioNavigation.IdServicio
                            && pc.Especial != true && p.Especial != true)
                            preciosABorrar.Add(pc);
                    }
                    if (p.IdPrecioServicio == 0 && p.Especial == true)
                    {
                        p.IdPrecioServicioNavigation = _context.PrecioServicio.Add(p.IdPrecioServicioNavigation).Entity;
                        _context.SaveChanges();
                        p.IdPrecioServicio = p.IdPrecioServicioNavigation.Id;
                        //_context.PrecioArticuloCliente.Add(p);
                    }
                    p.IdPrecioServicioNavigation = null;
                    if (p.Id == 0)
                    {
                        _context.PrecioServicioCliente.Add(p);
                    }
                    else
                    {
                        _context.PrecioServicioCliente.Update(p);
                    }
                }

                foreach (var p in preciosABorrar)
                {
                    p.IdPrecioServicioNavigation = null;
                    p.IdClienteNavigation = null;
                    _context.PrecioServicioCliente.Remove(p);
                }
                return _context.SaveChanges() >= 1;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool SavePreciosLentes(List<PrecioLenteCliente> preciosLentes)
        {
            List<PrecioLenteCliente> preciosClientes = _context.Cliente
                 .Include(c => c.PrecioLenteCliente)
                     .ThenInclude(p => p.IdPrecioLenteNavigation)
                .AsNoTracking()
                .FirstOrDefault(c => c.Id == preciosLentes.First().IdCliente).PrecioLenteCliente.ToList();
            List<PrecioLenteCliente> preciosABorrar = new List<PrecioLenteCliente>();

            try
            {
                foreach (var p in preciosLentes)
                {
                    foreach (var pc in preciosClientes)
                    {
                        if (pc.IdPrecioLente != p.IdPrecioLente && pc.IdPrecioLenteNavigation.IdLente == p.IdPrecioLenteNavigation.IdLente && pc.Especial != true && p.Especial != true
                            && pc.IdPrecioLenteNavigation.MedidaEsferico == p.IdPrecioLenteNavigation.MedidaEsferico && pc.IdPrecioLenteNavigation.MedidaCilindrico == p.IdPrecioLenteNavigation.MedidaCilindrico)
                            preciosABorrar.Add(pc);
                    }
                    if (p.IdPrecioLente == 0 && p.Especial == true)
                    {
                        p.IdPrecioLenteNavigation = _context.PrecioLente.Add(p.IdPrecioLenteNavigation).Entity;
                        _context.SaveChanges();
                        p.IdPrecioLente = p.IdPrecioLenteNavigation.Id;
                    }
                    p.IdPrecioLenteNavigation = null;
                    if (p.Id == 0)
                    {
                        _context.PrecioLenteCliente.Add(p);
                    }
                    else
                    {
                        _context.PrecioLenteCliente.Update(p);
                    }
                }

                foreach (var p in preciosABorrar)
                {
                    p.IdPrecioLenteNavigation = null;
                    p.IdClienteNavigation = null;
                    _context.PrecioLenteCliente.Remove(p);
                }
                return _context.SaveChanges() >= 0;
            }
            catch (Exception e)
            {
                return false;
            }
            //return _context.SaveChanges() >= 1;
        }


        //public bool SavePreciosEspecialesArticulos(List<PrecioEspecialArticuloCliente> preciosArticulos)
        //{
        //    try
        //    {
        //        foreach (var p in preciosArticulos)
        //        {
        //            if (p.Id == 0)
        //            {
        //                var precio = new PrecioArticulo();
        //                var precioEspecial = new PrecioEspecialArticuloCliente();
        //                precio.IdArticulo = p.IdPrecioArticuloNavigation.IdArticulo;
        //                precio = _context.PrecioArticulo.Add(precio).Entity;
        //                _context.SaveChanges();
        //                precioEspecial.IdPrecioArticulo = precio.Id;
        //                precioEspecial.IdCliente = p.IdCliente;
        //                //_context.PrecioEspecialArticuloCliente.Add(precioEspecial);
        //            }
        //            else
        //            {
        //                //_context.PrecioEspecialArticuloCliente.Update(p);
        //            }

        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        return false;
        //    }
        //    return _context.SaveChanges() >= 1;
        //}

        public bool BloquearClientes()
        {
            List<Cliente> clientes = _context.Cliente.Where(c => c.Borrado != true && c.Bloqueado != true).ToList();
            try
            {
                DateTime today = DateTime.Now;
                foreach (var c in clientes)
                {
                    if (c.MontoCredito < c.SaldoActual)
                    {
                        ClienteBloqueo clienteBloqueo = new ClienteBloqueo();
                        clienteBloqueo.Motivo = "Bloqueo automático (superó el monto permitido)";
                        clienteBloqueo.IdCliente = c.Id;
                        clienteBloqueo.Fecha = today;
                        _context.ClienteBloqueo.Add(clienteBloqueo);
                        c.Bloqueado = true;
                        _context.Cliente.Update(c);
                    }
                    else
                    {
                        if (c.SaldoActual < 0 && c.PlazoCredito > 0)
                        {
                            ComprobanteCliente ultimoComprobante = _context.ComprobanteCliente.LastOrDefault(cc => cc.IdCliente == c.Id);
                            DateTime fechaBloqueo = ultimoComprobante.Fecha.AddDays(c.PlazoCredito.Value);
                            if (fechaBloqueo < today)
                            {
                                ClienteBloqueo clienteBloqueo = new ClienteBloqueo();
                                clienteBloqueo.Motivo = "Bloqueo automático (superó el plazo pautado)";
                                clienteBloqueo.IdCliente = c.Id;
                                clienteBloqueo.Fecha = today;
                                _context.ClienteBloqueo.Add(clienteBloqueo);
                                c.Bloqueado = true;
                                _context.Cliente.Update(c);
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                return false;
            }
            return _context.SaveChanges() >= 1;
        }

        public List<dynamic> GetCuentasClientes()
        {
            List<dynamic> clientes = _context.Cliente
                .Select(c => new
                {
                    Id = c.Id,
                    Optica = c.Optica,
                    Bloqueado = c.Bloqueado,
                    Borrado = c.Borrado,
                    Saldo = c.SaldoActual,
                    MontoExcedido = c.SaldoActual - c.MontoCredito,
                    Credito = c.MontoCredito,
                    DiasExcedido = c.PlazoCredito,
                    Plazo = c.PlazoCredito,
                    //Motivo = _context.ClienteBloqueo.FirstOrDefault(cb => cb.IdCliente == c.Id).Motivo,
                    //Fecha = _context.ClienteBloqueo.FirstOrDefault(cb => cb.IdCliente == c.Id).Fecha

                })
                .ToList<dynamic>();
            return clientes;
        }

        public int AsignarPreciosLentes(JObject[] preciosLentes, List<dynamic> listaPrecios) //IdCLiente, lista
        {
            try
            {
                if (preciosLentes != null)
                {
                    List<PrecioLenteCliente> precios = new List<PrecioLenteCliente>();
                    foreach (var p in preciosLentes)
                    {
                        var IdCliente = Convert.ToInt32(p.GetValue("IdCliente"));
                        var index = Convert.ToInt32(p.GetValue("lista"));
                        List<PrecioLenteCliente> preciosClienteBBDD = _context.PrecioLenteCliente.Where(pc => pc.IdCliente == IdCliente).Include(pc => pc.IdPrecioLenteNavigation).AsNoTracking().ToList();

                        foreach (var l in listaPrecios)
                        {
                            foreach (var pl in l.PrecioLente)
                            {
                                var precioLente = new PrecioLenteCliente();
                                precioLente.IdCliente = IdCliente;
                                int idLente = pl.IdLente;
                                decimal Esferico = pl.Esferico;
                                decimal Cilindrico = pl.Cilindrico;

                                if (pl.Precio.Length > index)
                                {
                                    precioLente.IdPrecioLente = pl.Precio[index].Id;
                                }
                                else
                                {
                                    precioLente.IdPrecioLente = pl.Precio[0].Id;
                                }

                                if (preciosClienteBBDD.Count == 0)
                                    _context.PrecioLenteCliente.Add(precioLente);
                                else
                                {
                                    var precioBBDD = preciosClienteBBDD.Find(plc => plc.IdPrecioLente != precioLente.IdPrecioLente &&
                                     (plc.IdPrecioLenteNavigation.IdLente == idLente && plc.IdPrecioLenteNavigation.MedidaEsferico == Esferico && plc.IdPrecioLenteNavigation.MedidaCilindrico == Cilindrico));
                                    if (precioBBDD != null)
                                    {
                                        precioLente.Id = precioBBDD.Id;
                                        _context.PrecioLenteCliente.Update(precioLente);
                                    }
                                }
                            }
                        }
                    }
                }
                return _context.SaveChanges();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        public int AsignarPreciosServicios(JObject[] preciosServicios, List<Servicio> listaPrecios) //IdCLiente, lista
        {
            try
            {
                if (preciosServicios != null)
                {
                    List<PrecioServicioCliente> precios = new List<PrecioServicioCliente>();
                    foreach (var p in preciosServicios)
                    {
                        var IdCliente = Convert.ToInt32(p.GetValue("IdCliente"));
                        var index = Convert.ToInt32(p.GetValue("lista"));
                        List<PrecioServicioCliente> preciosClienteBBDD = _context.PrecioServicioCliente.Where(pc => pc.IdCliente == IdCliente).Include(pc => pc.IdPrecioServicioNavigation).AsNoTracking().ToList();

                        foreach (var s in listaPrecios)
                        {
                            var precioServicio = new PrecioServicioCliente();
                            precioServicio.IdCliente = IdCliente;

                            if (s.PrecioServicio.Count > index)
                            {
                                precioServicio.IdPrecioServicio = s.PrecioServicio.ElementAt(index).Id;
                            }
                            else
                            {
                                precioServicio.IdPrecioServicio = s.PrecioServicio.ElementAt(0).Id;
                            }

                            if (preciosClienteBBDD.Count == 0)
                                _context.PrecioServicioCliente.Add(precioServicio);
                            else
                            {
                                var precioBBDD = preciosClienteBBDD.Find(psc => psc.IdPrecioServicio != precioServicio.IdPrecioServicio && psc.IdPrecioServicioNavigation.IdServicio == s.Id);
                                if (precioBBDD != null)
                                {
                                    precioServicio.Id = precioBBDD.Id;
                                    _context.PrecioServicioCliente.Update(precioServicio);
                                }
                            }
                        }
                    }
                }
                return _context.SaveChanges();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        public int AsignarPreciosArticulos(JObject[] preciosArticulos, List<ArticuloVario> listaPrecios) //IdCLiente, lista
        {
            try
            {
                if (preciosArticulos != null)
                {
                    List<PrecioArticuloCliente> precios = new List<PrecioArticuloCliente>();
                    foreach (var p in preciosArticulos)
                    {
                        var IdCliente = Convert.ToInt32(p.GetValue("IdCliente"));
                        var index = Convert.ToInt32(p.GetValue("lista"));
                        List<PrecioArticuloCliente> preciosClienteBBDD = _context.PrecioArticuloCliente.Where(pc => pc.IdCliente == IdCliente).Include(pc => pc.IdPrecioArticuloNavigation).AsNoTracking().ToList();

                        foreach (var a in listaPrecios)
                        {
                            var precioArticulo = new PrecioArticuloCliente();
                            precioArticulo.IdCliente = IdCliente;

                            if (a.PrecioArticulo.Count > index)
                            {
                                precioArticulo.IdPrecioArticulo = a.PrecioArticulo.ElementAt(index).Id;
                            }
                            else
                            {
                                precioArticulo.IdPrecioArticulo = a.PrecioArticulo.ElementAt(0).Id;
                            }

                            if (preciosClienteBBDD.Count == 0)
                                _context.PrecioArticuloCliente.Add(precioArticulo);
                            else
                            {
                                var precioBBDD = preciosClienteBBDD.Find(pac => pac.IdPrecioArticulo != precioArticulo.IdPrecioArticulo && pac.IdPrecioArticuloNavigation.IdArticulo == a.Id);
                                if (precioBBDD != null)
                                {
                                    precioArticulo.Id = precioBBDD.Id;
                                    _context.PrecioArticuloCliente.Update(precioArticulo);
                                }
                            }
                        }
                    }
                }
                return _context.SaveChanges();
            }
            catch (Exception e)
            {
                return -1;
            }
        }

        public List<dynamic> GetListaAsignacionLente(List<dynamic> listaPrecios)
        {
            try
            {
                //List<dynamic> precioClientesBBDD = _context.PrecioLenteCliente.GroupBy(pc => pc.IdCliente).ToList<dynamic>();
                Dictionary<int, List<PrecioLenteCliente>> precioClientesBBDD = _context.PrecioLenteCliente.GroupBy(pc => pc.IdCliente)
                    .ToDictionary(group => group.Key, group => group.ToList());

                List<dynamic> clientes = new List<dynamic>();

                foreach (var pc in precioClientesBBDD)
                {
                    foreach (var l in listaPrecios)
                    {
                        foreach (var pl in l.PrecioLente)
                        {
                            for (int i = 0; i < pl.Precio.Length; i++)
                            {
                                if (pc.Value.Find(p => p.IdPrecioLente == pl.Precio[i].Id) != null)
                                {
                                    if (clientes.Find(c => c.IdCliente == pc.Key && c.lista == i) == null)
                                    {
                                        dynamic cliente = new JObject();
                                        cliente.IdCliente = pc.Key;
                                        cliente.lista = i;
                                        clientes.Add(cliente);
                                    }
                                }
                            }
                        }
                    }
                }
                return clientes;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public List<dynamic> GetListaAsignacionServicio(List<Servicio> listaPrecios)
        {
            try
            {
                Dictionary<int, List<PrecioServicioCliente>> precioClientesBBDD = _context.PrecioServicioCliente.GroupBy(pc => pc.IdCliente)
                    .ToDictionary(group => group.Key, group => group.ToList());

                List<dynamic> clientes = new List<dynamic>();

                foreach (var pc in precioClientesBBDD)
                {
                    foreach (var s in listaPrecios)
                    {
                        for (int i = 0; i < s.PrecioServicio.Count(); i++)
                        {
                            if (pc.Value.Find(p => p.IdPrecioServicio == s.PrecioServicio.ElementAt(i).Id) != null)
                            {
                                if (clientes.Find(c => c.IdCliente == pc.Key && c.lista == i) == null)
                                {
                                    dynamic cliente = new JObject();
                                    cliente.IdCliente = pc.Key;
                                    cliente.lista = i;
                                    clientes.Add(cliente);
                                }
                            }
                        }
                    }
                }
                return clientes;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public List<dynamic> GetListaAsignacionArticulo(List<ArticuloVario> listaPrecios)
        {
            try
            {
                Dictionary<int, List<PrecioArticuloCliente>> precioClientesBBDD = _context.PrecioArticuloCliente.Where(pac => pac.Especial == null || pac.Especial == false).GroupBy(pc => pc.IdCliente)
                    .ToDictionary(group => group.Key, group => group.ToList());

                List<dynamic> clientes = new List<dynamic>();

                foreach (var pc in precioClientesBBDD)
                {
                    foreach (var a in listaPrecios)
                    {
                        for (int i = 0; i < a.PrecioArticulo.Count(); i++)
                        {
                            if (pc.Value.Find(p => p.IdPrecioArticulo == a.PrecioArticulo.ElementAt(i).Id) != null)
                            {
                                if (clientes.Find(c => c.IdCliente == pc.Key && c.lista == i) == null)
                                {
                                    dynamic cliente = new JObject();
                                    cliente.IdCliente = pc.Key;
                                    cliente.lista = i;
                                    clientes.Add(cliente);
                                }
                            }
                        }
                    }
                }
                return clientes;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public decimal GetPrecioLenteFactura(int idCliente, int idLente, int Esferico, int Cilindrico, PrecioLente precioMinimo) {

            var tienePrecioEspecial = _context.PrecioLenteCliente.Where(pc => pc.IdPrecioLenteNavigation.IdLente == idLente && pc.IdCliente == idCliente && pc.Especial == true).FirstOrDefault();
            if (tienePrecioEspecial == null)
            {
                List<PrecioLenteCliente> precioClientes = _context.PrecioLenteCliente.Include(pc => pc.IdPrecioLenteNavigation)
                    .Where(pc => pc.IdCliente == idCliente && pc.IdPrecioLenteNavigation.IdLente == idLente)
                    .ToList();
                PrecioLente precioProximo = precioMinimo;
                foreach (var p in precioClientes)
                {
                    if (p.IdPrecioLenteNavigation.MedidaEsferico >= Esferico && p.IdPrecioLenteNavigation.MedidaCilindrico >= Cilindrico)
                    {
                        if (precioProximo.MedidaEsferico >= p.IdPrecioLenteNavigation.MedidaEsferico && precioProximo.MedidaCilindrico >= p.IdPrecioLenteNavigation.MedidaCilindrico)
                        {
                            precioProximo = p.IdPrecioLenteNavigation;
                        }
                    }
                }
                return precioProximo.Precio;

            }
            else
            {
               return tienePrecioEspecial.IdPrecioLenteNavigation.Precio;
            }
            
        }

        public JObject GetPrecioArticuloFactura(int idCliente, int[] articulos)
        {
            JObject preciosArticulos = new JObject();
            foreach (var idArticulo in articulos)
            {
                var tienePrecioEspecial = _context.PrecioArticuloCliente.Where(pc => pc.IdPrecioArticuloNavigation.IdArticulo == idArticulo && pc.IdCliente == idCliente && pc.Especial == true).FirstOrDefault();
                if (tienePrecioEspecial == null)
                {
                    try
                    {
                        PrecioArticulo precioArticulo = _context.PrecioArticuloCliente.Include(pc => pc.IdPrecioArticuloNavigation)
                        .FirstOrDefault(pc => pc.IdCliente == idCliente && pc.IdPrecioArticuloNavigation.IdArticulo == idArticulo).IdPrecioArticuloNavigation;
                        preciosArticulos[idArticulo.ToString()] = precioArticulo.Precio;
                    }
                    catch (Exception e)
                    {
                        preciosArticulos[idArticulo.ToString()] = null;
                        continue;
                    }
                }
                else
                {
                    preciosArticulos[idArticulo.ToString()] = tienePrecioEspecial.IdPrecioArticuloNavigation.Precio;
                }
            }
            return preciosArticulos;
        }

        public JObject GetPrecioServicioFactura(int idCliente, int[] servicios)
        {
            JObject preciosServicios = new JObject();
            foreach (var idServicio in servicios)
            {
                var tienePrecioEspecial = _context.PrecioServicioCliente.Where(pc => pc.IdPrecioServicioNavigation.IdServicio == idServicio && pc.IdCliente == idCliente && pc.Especial == true).FirstOrDefault();
                if (tienePrecioEspecial == null)
                {
                    try
                    {
                        PrecioServicio precioServicio = _context.PrecioServicioCliente.Include(pc => pc.IdPrecioServicioNavigation)
                       .FirstOrDefault(pc => pc.IdCliente == idCliente && pc.IdPrecioServicioNavigation.IdServicio == idServicio).IdPrecioServicioNavigation;
                        preciosServicios[idServicio.ToString()] = precioServicio.Precio;
                    }
                    catch (Exception e)
                    {
                        preciosServicios[idServicio.ToString()] = null;
                        continue;
                    }
                       
                }
                else
                {
                    preciosServicios[idServicio.ToString()] = tienePrecioEspecial.IdPrecioServicioNavigation.Precio;
                }
            }
            return preciosServicios;

        }
    }
}