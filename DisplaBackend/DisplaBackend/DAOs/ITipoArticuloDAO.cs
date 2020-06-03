using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface ITipoArticuloDAO
    {
        List<TipoArticulo> GetTiposArticulo();
        List<TipoArticulo> GetTiposArticuloVigentes();
        bool SaveOrUpdate(TipoArticulo tipoArticulo);
        bool Delete(TipoArticulo tipoArticulo);
        TipoArticulo GetById(int idTipoArticulo);
        List<TipoArticulo> GetTiposArticuloConArticulos();
    }

    public class TipoArticuloDAO : ITipoArticuloDAO
    {
        private readonly DisplaNEWContext _context;

        public TipoArticuloDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<TipoArticulo> GetTiposArticulo()
        {
            return _context.TipoArticulo
                .OrderByDescending(ti => ti.Borrado)
                .ToList();
        }

        public List<TipoArticulo> GetTiposArticuloVigentes()
        {
            return _context.TipoArticulo
                .Where(ti => ti.Borrado == false)
                .ToList();
        }

        public List<TipoArticulo> GetTiposArticuloConArticulos()
        {
            return _context.TipoArticulo
                .Where(ti => ti.Borrado == false && ti.ArticuloVario.Count > 0)
                .ToList();
        }

        public bool SaveOrUpdate(TipoArticulo tipoArticulo)
        {
            try
            {
                if (tipoArticulo.Id == 0)
                {
                    tipoArticulo = _context.Add(tipoArticulo).Entity;
                }
                else
                {
                    tipoArticulo = _context.TipoArticulo.Update(tipoArticulo).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public TipoArticulo GetById(int idTipoArticulo)
        {
            return _context.TipoArticulo.FirstOrDefault(tb => tb.Id == idTipoArticulo);
        }

        public bool Delete(TipoArticulo tipoArticulo)
        {
            try
            {
                tipoArticulo.Borrado = !tipoArticulo.Borrado;
                tipoArticulo = _context.TipoArticulo.Update(tipoArticulo).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
