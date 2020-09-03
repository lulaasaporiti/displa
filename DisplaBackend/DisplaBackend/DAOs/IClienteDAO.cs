﻿using DisplaBackend.Models;
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
        List<Ficha> GetFichaCliente(int idCliente);
        bool SaveFicha(Ficha ficha);
        bool BloquearClientes();
        List<dynamic> GetClientesBloqueados();
        int AsignarPreciosLentes(JObject[] preciosLentes, List<dynamic> listaPrecios);
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

        public Cliente GetById(int idCliente)
        {
            return _context.Cliente.Include(c => c.IdLocalidadNavigation).Include(c => c.IdCategoriaIvaNavigation)
                .Include(c => c.IdCondicionVentaNavigation).FirstOrDefault(c => c.Id == idCliente);
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

        public List<Ficha> GetFichaCliente(int idCliente)
        {
            return _context.Ficha
                .Where(f => f.IdCliente == idCliente).ToList();
        }

        public bool Delete(Cliente cliente)
        {
            try
            {
                cliente.Borrado = !cliente.Borrado;
                cliente = _context.Cliente.Update(cliente).Entity;
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
            //List<PrecioArticulo> precioEspecial = new List<PrecioArticulo>();

            try
            {
                foreach (var p in preciosArticulos)
                {
                    foreach (var pc in preciosClientes) { 
                        if (pc.IdPrecioArticulo != p.IdPrecioArticulo && pc.IdPrecioArticuloNavigation.IdArticulo == p.IdPrecioArticuloNavigation.IdArticulo 
                            && pc.Especial != true && p.Especial != true)
                            preciosABorrar.Add(pc);
                    }
                    if (p.IdPrecioArticulo == 0 && p.Especial == true)
                    {
                        p.IdPrecioArticuloNavigation = _context.PrecioArticulo.Add(p.IdPrecioArticuloNavigation).Entity;
                        _context.SaveChanges();
                        p.IdPrecioArticulo = p.IdPrecioArticuloNavigation.Id;
                        //_context.PrecioArticuloCliente.Add(p);
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
                //_context.SaveChanges();
                //return _context.SaveChanges() >= 1;

                foreach (var p in preciosABorrar)
                {
                    _context.PrecioArticuloCliente.Remove(p);
                }
            }
            catch (Exception e)
            {
                return false;
            }
            return _context.SaveChanges() >= 1;
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
                //_context.SaveChanges();
                //return _context.SaveChanges() >= 1;

                foreach (var p in preciosABorrar)
                {
                    _context.PrecioServicioCliente.Remove(p);
                }
            }
            catch (Exception e)
            {
                return false;
            }
            return _context.SaveChanges() >= 1;
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
                            && pc.IdPrecioLenteNavigation.Esferico == p.IdPrecioLenteNavigation.Esferico && pc.IdPrecioLenteNavigation.Cilindrico == p.IdPrecioLenteNavigation.Cilindrico)
                            preciosABorrar.Add(pc);
                    }
                    if (p.IdPrecioLente == 0 && p.Especial == true)
                    {
                        p.IdPrecioLenteNavigation = _context.PrecioLente.Add(p.IdPrecioLenteNavigation).Entity;
                        _context.SaveChanges();
                        p.IdPrecioLente = p.IdPrecioLenteNavigation.Id;
                        //_context.PrecioArticuloCliente.Add(p);
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
                //_context.SaveChanges();
                //return _context.SaveChanges() >= 1;

                foreach (var p in preciosABorrar)
                {
                    _context.PrecioLenteCliente.Remove(p);
                }
            }
            catch (Exception e)
            {
                return false;
            }
            return _context.SaveChanges() >= 1;
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
                foreach (var c in clientes)
                {
                    if (c.MontoCredito < c.SaldoActual) {
                        c.Bloqueado = true;
                        _context.Cliente.Update(c);
                    }
                }
            }
            catch (Exception e)
            {
                return false;
            }
            return _context.SaveChanges() >= 1;
        }

        public List<dynamic> GetClientesBloqueados()
        {
            List<dynamic> clientes = _context.Cliente
                .Where(c => c.Bloqueado)
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
                                     (plc.IdPrecioLenteNavigation.IdLente == idLente && plc.IdPrecioLenteNavigation.Esferico == Esferico && plc.IdPrecioLenteNavigation.Cilindrico == Cilindrico));
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

    }
}