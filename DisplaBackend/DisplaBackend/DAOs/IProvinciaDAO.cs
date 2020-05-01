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
        bool SaveOrUpdate(Provincia provincia);
        bool Delete(Provincia provincia);
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
                .Where(p => p.Borrado == false)
                .ToList();
        }

        public bool SaveOrUpdate(Provincia provincia)
        {
            try
            {
                if (provincia.Id == 0)
                {
                    provincia = _context.Add(provincia).Entity;
                }
                else
                {
                    provincia = _context.Provincia.Update(provincia).Entity;

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

        public bool Delete(Provincia provincia)
        {
            try
            {
                provincia.Borrado = !provincia.Borrado;
                provincia = _context.Provincia.Update(provincia).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
