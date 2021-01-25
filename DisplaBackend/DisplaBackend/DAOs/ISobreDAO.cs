using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface ISobreDAO
    {
        List<Sobre> GetSobres();
        bool SaveOrUpdate(Sobre[] sobres);
        bool Delete(Sobre sobre);
        Sobre GetById(int idSobre);
        List<dynamic> GetSobresConsulta(int IdCliente, DateTime fechaDesde, DateTime fechaHasta);

    }

    public class SobreDAO : ISobreDAO
    {
        private readonly DisplaNEWContext _context;

        public SobreDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<Sobre> GetSobres()
        {
            return _context.Sobre
                .Include(s => s.IdClienteNavigation)
                .ThenInclude(c => c.ComprobanteCliente)
                .ThenInclude(c => c.ComprobanteItem)
                .ToList();
        }


        public bool SaveOrUpdate(Sobre[] sobres)
        {
            try
            {
                foreach (var sobre in sobres)
                {
                    if (sobre.Id == 0)
                    {
                        _context.Add(sobre);
                    }
                    else
                    {
                        _context.Sobre.Update(sobre);

                    }
                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public Sobre GetById(int idSobre)
        {
            return _context.Sobre.FirstOrDefault(u => u.Id == idSobre);
        }

        public bool Delete(Sobre sobre)
        {
            try
            {
                sobre = _context.Sobre.Remove(sobre).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }

        public List<dynamic> GetSobresConsulta(int IdCliente, DateTime fechaDesde, DateTime fechaHasta)
        {
            var sobreConsulta = _context.Sobre.Where(s => s.IdCliente == IdCliente && s.Fecha >= fechaDesde && fechaHasta <= s.Fecha)
                .Include(so => so.IdClienteNavigation)
                .ThenInclude(c => c.ComprobanteCliente)
                .Select(sc => new 
                {
                    Numero = sc.Numero,
                    Fecha = sc.Fecha,
                    IdClienteNavigation = sc.IdClienteNavigation,
                    Observaciones = sc.Observaciones,
                    Comprobante = sc.IdClienteNavigation.ComprobanteCliente.Where(c => c.ComprobanteItem.Select(ci => ci.NumeroSobre == sc.Numero).FirstOrDefault())
                }).ToList<dynamic>();
            return sobreConsulta;
        }
    }
}
