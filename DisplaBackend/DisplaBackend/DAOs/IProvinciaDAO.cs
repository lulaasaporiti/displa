using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IProvinciaDAO
    {
        List<Provincia> GetProvincias();
        List<Provincia> GetProvinciasVigentes();
        bool SaveOrUpdate(Provincia ubicacion);
        bool Delete(Provincia ubicacion);
        Provincia GetById(int idProvincia);

    }

    public class ProvinciaDAO : IProvinciaDAO
    {
        private readonly DisplaNEWContext _context;

        public ProvinciaDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<Provincia> GetProvincias()
        {
            return _context.Provincia
                .OrderByDescending(p => p.Borrado)
                .ToList();
        }

        public List<Provincia> GetProvinciasVigentes()
        {
            return _context.Provincia
                .Where(p => p.Borrado == true)
                .ToList();
        }

        public bool SaveOrUpdate(Provincia ubicacion)
        {
            try
            {
                if (ubicacion.Id == 0)
                {
                    ubicacion = _context.Add(ubicacion).Entity;
                }
                else
                {
                    ubicacion = _context.Provincia.Update(ubicacion).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public Provincia GetById(int idProvincia)
        {
            return _context.Provincia.FirstOrDefault(tb => tb.Id == idProvincia);
        }

        public bool Delete(Provincia ubicacion)
        {
            try
            {
                ubicacion.Borrado = !ubicacion.Borrado;
                ubicacion = _context.Provincia.Update(ubicacion).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
