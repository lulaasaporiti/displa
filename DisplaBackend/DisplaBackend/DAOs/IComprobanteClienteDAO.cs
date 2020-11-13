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
        bool SaveOrUpdate(ComprobanteCliente comprobanteCliente);
        bool Delete(ComprobanteCliente comprobanteCliente);
        ComprobanteCliente GetById(int idComprobanteCliente);

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

        public bool SaveOrUpdate(ComprobanteCliente comprobanteCliente)
        {
            try
            {
                if (comprobanteCliente.Id == 0)
                {
                    comprobanteCliente.Fecha = DateTime.Now;
                    comprobanteCliente = _context.Add(comprobanteCliente).Entity;
                }
                else
                {
                    comprobanteCliente = _context.ComprobanteCliente.Update(comprobanteCliente).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public ComprobanteCliente GetById(int idComprobanteCliente)
        {
            return _context.ComprobanteCliente.FirstOrDefault(u => u.Id == idComprobanteCliente);
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
    }
}
