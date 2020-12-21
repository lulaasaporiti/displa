using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IVentaVirtualDAO
    {
        List<VentaVirtual> GetVentasVirtuales();
        bool SaveOrUpdate(VentaVirtual ventaVirtual);
        bool Delete(VentaVirtual ventaVirtual);
        VentaVirtual GetById(int idVentaVirtual);
        List<VentaVirtual> GetVentasVirtualesCliente(int idCliente);
    }

    public class VentaVirtualDAO : IVentaVirtualDAO
    {
        private readonly DisplaNEWContext _context;

        public VentaVirtualDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<VentaVirtual> GetVentasVirtuales()
        {
            return _context.VentaVirtual
                .ToList();
        }


        public bool SaveOrUpdate(VentaVirtual ventaVirtual)
        {
            try
            {
                if (ventaVirtual.Id == 0)
                {
                    ventaVirtual = _context.Add(ventaVirtual).Entity;
                }
                else
                {
                    ventaVirtual = _context.VentaVirtual.Update(ventaVirtual).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public VentaVirtual GetById(int idVentaVirtual)
        {
            return _context.VentaVirtual.FirstOrDefault(u => u.Id == idVentaVirtual);
        }

        public bool Delete(VentaVirtual ventaVirtual)
        {
            try
            {
                _context.VentaVirtual.Remove(ventaVirtual);
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }

        public List<VentaVirtual> GetVentasVirtualesCliente(int idCliente)
        {
            return _context.VentaVirtual
                .Where(v => v.IdComprobanteNavigation.IdCliente == idCliente)
                .ToList();
        }
    }
}
