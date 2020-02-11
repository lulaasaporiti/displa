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
        bool SaveOrUpdate(Cliente cliente);
        bool Delete(Cliente cliente);
        Cliente GetById(int idCliente);
        List<Cliente> GetClientesActivos();

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
            return _context.Cliente
                .Where(c => c.Borrado == false)
                //.OrderByDescending(b => b.Borrado)
                .ToList();
        }

        public List<Cliente> GetClientesActivos()
        {
            return _context.Cliente
                .Include(c => c.IdCategoriaIvaNavigation)
                .Include(c => c.IdCondicionVentaNavigation)
                .Include(c => c.IdLocalidadNavigation)
                .Where(c => c.Bloqueado == false && c.Borrado == false)
                //.OrderByDescending(b => b.Borrado)
                .ToList();
        }

        public List<Cliente> GetClientes()
        {
            return _context.Cliente
                .Include(c => c.IdCategoriaIvaNavigation)
                .Include(c => c.IdCondicionVentaNavigation)
                .Include(c => c.IdLocalidadNavigation)
                .OrderByDescending(c => c.Borrado)
                .ToList();
        }

        public bool SaveOrUpdate(Cliente cliente)
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
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public Cliente GetById(int idCliente)
        {
            return _context.Cliente.FirstOrDefault(tb => tb.Id == idCliente);
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
    }
}
