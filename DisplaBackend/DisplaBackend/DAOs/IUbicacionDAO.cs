using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IUbicacionDAO
    {
        List<Ubicacion> GetUbicaciones();
        List<Ubicacion> GetUbicacionesVigentes();
        bool SaveOrUpdate(Ubicacion ubicacion);
        bool Delete(Ubicacion ubicacion);
        Ubicacion GetById(int idUbicacion);

    }

    public class UbicacionDAO : IUbicacionDAO
    {
        private readonly DisplaNEWContext _context;

        public UbicacionDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<Ubicacion> GetUbicaciones()
        {
            return _context.Ubicacion
                .OrderByDescending(u => u.Borrado)
                .ToList();
        }

        public List<Ubicacion> GetUbicacionesVigentes()
        {
            return _context.Ubicacion
                .Where(u => u.Borrado == false)
                .ToList();
        }

        public bool SaveOrUpdate(Ubicacion ubicacion)
        {
            try
            {
                if (ubicacion.Id == 0)
                {
                    ubicacion = _context.Add(ubicacion).Entity;
                }
                else
                {
                    ubicacion = _context.Ubicacion.Update(ubicacion).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public Ubicacion GetById(int idUbicacion)
        {
            return _context.Ubicacion.FirstOrDefault(tb => tb.Id == idUbicacion);
        }

        public bool Delete(Ubicacion ubicacion)
        {
            try
            {
                ubicacion.Borrado = !ubicacion.Borrado;
                ubicacion = _context.Ubicacion.Update(ubicacion).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
