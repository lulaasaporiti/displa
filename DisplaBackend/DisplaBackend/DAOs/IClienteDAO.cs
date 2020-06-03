using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
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
        bool SavePreciosEspecialesArticulos(List<PrecioEspecialArticuloCliente> preciosArticulos);
        List<PrecioArticuloCliente> GetPreciosArticulosCliente(int idCliente);
        List<PrecioServicioCliente> GetPreciosServiciosCliente(int idCliente);
        List<PrecioLenteCliente> GetPreciosLentesCliente(int idCliente);
        List<Ficha> GetFichaCliente(int idCliente);
        bool SaveFicha(Ficha ficha);
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
            return _context.Cliente.Include(c => c.IdLocalidadNavigation).FirstOrDefault(c => c.Id == idCliente);
        }

        public List<PrecioArticuloCliente> GetPreciosArticulosCliente(int idCliente)
        {
            return _context.PrecioArticuloCliente
                .Include(p => p.IdPrecioArticuloNavigation)
                    .ThenInclude(pa => pa.IdArticuloNavigation)
                .Where(p => p.IdCliente == idCliente).ToList();
        }

        public List<PrecioServicioCliente> GetPreciosServiciosCliente(int idCliente)
        {
            return _context.PrecioServicioCliente
                .Include(p => p.IdPrecioServicioNavigation)
                    .ThenInclude(ps => ps.IdServicioNavigation)
                .Where(p => p.IdCliente == idCliente).ToList();
        }

        public List<PrecioLenteCliente> GetPreciosLentesCliente(int idCliente)
        {
            return _context.PrecioLenteCliente
                .Include(p => p.IdPrecioLenteNavigation)
                .Where(p => p.IdCliente == idCliente).ToList();
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
            //var cliente = _context.Cliente.FirstOrDefault(c => c.Id == preciosArticulos.First().IdCliente);
            try
            {
                foreach (var p in preciosArticulos)
                {

                    if (p.Id == 0)
                    {
                        _context.PrecioArticuloCliente.Add(p);
                    }
                    else
                    {
                        _context.PrecioArticuloCliente.Update(p);
                    }

                }
            }
            catch (Exception e)
            {
                return false;
            }
            return _context.SaveChanges() >= 1;
        }


        public bool SavePreciosEspecialesArticulos(List<PrecioEspecialArticuloCliente> preciosArticulos)
        {
            try
            {
                foreach (var p in preciosArticulos)
                {
                    if (p.Id == 0)
                    {
                        var precio = new PrecioArticulo();
                        var precioEspecial = new PrecioEspecialArticuloCliente();
                        precio.IdArticulo = p.IdPrecioArticuloNavigation.IdArticulo;
                        precio = _context.PrecioArticulo.Add(precio).Entity;
                        _context.SaveChanges();
                        precioEspecial.IdPrecioArticulo = precio.Id;
                        precioEspecial.IdCliente = p.IdCliente;
                        //_context.PrecioEspecialArticuloCliente.Add(precioEspecial);
                    }
                    else
                    {
                        //_context.PrecioEspecialArticuloCliente.Update(p);
                    }

                }
            }
            catch (Exception e)
            {
                return false;
            }
            return _context.SaveChanges() >= 1;
        }
    }
}