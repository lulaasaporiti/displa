using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface ITipoInsumoDAO
    {
        List<TipoInsumo> GetTiposInsumo();
        List<TipoInsumo> GetTiposInsumoVigentes();
        bool SaveOrUpdate(TipoInsumo tipoInsumo);
        bool Delete(TipoInsumo tipoInsumo);
        TipoInsumo GetById(int idTipoInsumo);

    }

    public class TipoInsumoDAO : ITipoInsumoDAO
    {
        private readonly DisplaNEWContext _context;

        public TipoInsumoDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<TipoInsumo> GetTiposInsumo()
        {
            return _context.TipoInsumo
                .OrderByDescending(ti => ti.Borrado)
                .ToList();
        }

        public List<TipoInsumo> GetTiposInsumoVigentes()
        {
            return _context.TipoInsumo
                .Where(ti => ti.Borrado == false)
                .ToList();
        }

        public bool SaveOrUpdate(TipoInsumo tipoInsumo)
        {
            try
            {
                if (tipoInsumo.Id == 0)
                {
                    tipoInsumo = _context.Add(tipoInsumo).Entity;
                }
                else
                {
                    tipoInsumo = _context.TipoInsumo.Update(tipoInsumo).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public TipoInsumo GetById(int idTipoInsumo)
        {
            return _context.TipoInsumo.FirstOrDefault(tb => tb.Id == idTipoInsumo);
        }

        public bool Delete(TipoInsumo tipoInsumo)
        {
            try
            {
                tipoInsumo.Borrado = !tipoInsumo.Borrado;
                tipoInsumo = _context.TipoInsumo.Update(tipoInsumo).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
