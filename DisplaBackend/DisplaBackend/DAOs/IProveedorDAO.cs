using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IProveedorDAO
    {
        List<Proveedor> GetProveedores();
        List<Proveedor> GetProveedoresVigentes();
        int SaveOrUpdate(Proveedor proveedor);
        bool Delete(Proveedor proveedor);
        Proveedor GetById(int idProveedor);

    }

    public class ProveedorDAO : IProveedorDAO
    {
        private readonly DisplaNEWContext _context;

        public ProveedorDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<Proveedor> GetProveedores()
        {
            return _context.Proveedor
                .OrderByDescending(u => u.Borrado)
                .ToList();
        }

        public List<Proveedor> GetProveedoresVigentes()
        {
            return _context.Proveedor
                .Where(u => u.Borrado == false)
                .ToList();
        }

        public int SaveOrUpdate(Proveedor proveedor)
        {
            try
            {
                if (proveedor.Id == 0)
                {
                    proveedor = _context.Add(proveedor).Entity;
                }
                else
                {
                    proveedor = _context.Proveedor.Update(proveedor).Entity;

                }
                _context.SaveChanges();
                return proveedor.Id;

            }
            catch (Exception e)
            {
                return -1;
            }
        }

        public Proveedor GetById(int idProveedor)
        {
            return _context.Proveedor.FirstOrDefault(tb => tb.Id == idProveedor);
        }

        public bool Delete(Proveedor proveedor)
        {
            try
            {
                proveedor.Borrado = !proveedor.Borrado;
                proveedor = _context.Proveedor.Update(proveedor).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
