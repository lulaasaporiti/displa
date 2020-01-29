using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface ILocalidadDAO
    {
        List<Localidad> GetLocalidades();
        List<Localidad> GetLocalidadesVigentes();
        bool SaveOrUpdate(Localidad localidad);
        bool Delete(Localidad localidad);
        Localidad GetById(int idLocalidad);

    }

    public class LocalidadDAO : ILocalidadDAO
    {
        private readonly DisplaNEWContext _context;

        public LocalidadDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<Localidad> GetLocalidades()
        {
            return _context.Localidad
                .OrderByDescending(l => l.Borrado)
                .ToList();
        }

        public List<Localidad> GetLocalidadesVigentes()
        {
            return _context.Localidad
                .Where(l => l.Borrado == false)
                .ToList();
        }

        public bool SaveOrUpdate(Localidad localidad)
        {
            try
            {
                if (localidad.Id == 0)
                {
                    localidad = _context.Add(localidad).Entity;
                }
                else
                {
                    localidad = _context.Localidad.Update(localidad).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public Localidad GetById(int idLocalidad)
        {
            return _context.Localidad.FirstOrDefault(tb => tb.Id == idLocalidad);
        }

        public bool Delete(Localidad localidad)
        {
            try
            {
                localidad.Borrado = !localidad.Borrado;
                localidad = _context.Localidad.Update(localidad).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
