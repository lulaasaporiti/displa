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
        bool SaveOrUpdate(Proveedor proveedor);
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
                .Where(u => u.Borrado == true)
                .ToList();
        }

        public bool SaveOrUpdate(Proveedor proveedor)
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
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
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
