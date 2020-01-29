using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface ITipoBlockDAO
    {
        List<TipoBlock> GetTiposBlock();
        List<TipoBlock> GetTiposBlockVigentes();
        bool SaveOrUpdate(TipoBlock tipoBlock);
        bool Delete(TipoBlock tipoBlock);
        TipoBlock GetById(int idTipoBlock);

    }

    public class TipoBlockDAO : ITipoBlockDAO
    {
        private readonly DisplaNEWContext _context;

        public TipoBlockDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<TipoBlock> GetTiposBlock()
        {
            return _context.TipoBlock
                .OrderByDescending(tb => tb.Borrado)
                .ToList();
        }

        public List<TipoBlock> GetTiposBlockVigentes()
        {
            return _context.TipoBlock
                .Where(tb => tb.Borrado == false)
                .ToList();
        }

        public bool SaveOrUpdate(TipoBlock tipoBlock)
        {
            try
            {
                if (tipoBlock.Id == 0)
                {
                    tipoBlock = _context.Add(tipoBlock).Entity;
                }
                else
                {
                    tipoBlock = _context.TipoBlock.Update(tipoBlock).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public TipoBlock GetById(int idTipoBlock)
        {
            return _context.TipoBlock.FirstOrDefault(tb => tb.Id == idTipoBlock);
        }

        public bool Delete(TipoBlock tipoBlock)
        {
            try
            {
                tipoBlock.Borrado = !tipoBlock.Borrado;
                tipoBlock = _context.TipoBlock.Update(tipoBlock).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
