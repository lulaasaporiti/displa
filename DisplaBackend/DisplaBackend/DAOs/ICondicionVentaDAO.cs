using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface ICondicionVentaDAO
    {
        List<CondicionVenta> GetCondicionesVenta();
        List<CondicionVenta> GetCondicionesVentaVigentes();
        bool SaveOrUpdate(CondicionVenta condicionVenta);
        bool Delete(CondicionVenta condicionVenta);
        CondicionVenta GetById(int idCondicionVenta);

    }

    public class CondicionVentaDAO : ICondicionVentaDAO
    {
        private readonly DisplaNEWContext _context;

        public CondicionVentaDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<CondicionVenta> GetCondicionesVenta()
        {
            return _context.CondicionVenta
                .OrderByDescending(u => u.Borrado)
                .ToList();
        }

        public List<CondicionVenta> GetCondicionesVentaVigentes()
        {
            return _context.CondicionVenta
                .Where(u => u.Borrado == false)
                .ToList();
        }

        public bool SaveOrUpdate(CondicionVenta condicionVenta)
        {
            try
            {
                if (condicionVenta.Id == 0)
                {
                    condicionVenta = _context.Add(condicionVenta).Entity;
                }
                else
                {
                    condicionVenta = _context.CondicionVenta.Update(condicionVenta).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public CondicionVenta GetById(int idCondicionVenta)
        {
            return _context.CondicionVenta.FirstOrDefault(tb => tb.Id == idCondicionVenta);
        }

        public bool Delete(CondicionVenta condicionVenta)
        {
            try
            {
                condicionVenta.Borrado = !condicionVenta.Borrado;
                condicionVenta = _context.CondicionVenta.Update(condicionVenta).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
