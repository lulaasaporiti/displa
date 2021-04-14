using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface ITipoDescuentoDAO
    {
        List<TipoDescuento> GetTiposDescuento();
        List<TipoDescuento> GetTiposDescuentoVigentes();
        bool SaveOrUpdate(TipoDescuento tipoDescuento);
        bool Delete(TipoDescuento tipoDescuento);
        TipoDescuento GetById(int idTipoDescuento);

    }

    public class TipoDescuentoDAO : ITipoDescuentoDAO
    {
        private readonly DisplaNEWContext _context;

        public TipoDescuentoDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<TipoDescuento> GetTiposDescuento()
        {
            return _context.TipoDescuento
                .OrderByDescending(ti => ti.Borrado)
                .ToList();
        }

        public List<TipoDescuento> GetTiposDescuentoVigentes()
        {
            return _context.TipoDescuento
                .Where(ti => ti.Borrado == false)
                .ToList();
        }

        public bool SaveOrUpdate(TipoDescuento tipoDescuento)
        {
            try
            {
                if (tipoDescuento.Id == 0)
                {
                    tipoDescuento = _context.Add(tipoDescuento).Entity;
                }
                else
                {
                    tipoDescuento = _context.TipoDescuento.Update(tipoDescuento).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public TipoDescuento GetById(int idTipoDescuento)
        {
            return _context.TipoDescuento.FirstOrDefault(tb => tb.Id == idTipoDescuento);
        }

        public bool Delete(TipoDescuento tipoDescuento)
        {
            try
            {
                tipoDescuento.Borrado = !tipoDescuento.Borrado;
                tipoDescuento = _context.TipoDescuento.Update(tipoDescuento).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
