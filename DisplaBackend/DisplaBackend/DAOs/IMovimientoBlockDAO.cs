using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IMovimientoBlockDAO
    {
        List<MovimientoBlock> GetMovimientosBlock(int idBlock);
        bool SaveOrUpdate(MovimientoBlock movimientoBlock);
        bool Delete(MovimientoBlock movimientoBlock);
        MovimientoBlock GetById(int idMovimientoBlock);

    }

    public class MovimientoBlockDAO : IMovimientoBlockDAO
    {
        private readonly DisplaNEWContext _context;

        public MovimientoBlockDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<MovimientoBlock> GetMovimientosBlock(int idBlock)
        {
            return _context.MovimientoBlock
                .Include(mi => mi.IdUsuarioNavigation)
                .Where(mb => mb.IdBlock == idBlock) 
                .ToList();
        }

        public bool SaveOrUpdate(MovimientoBlock movimientoBlock)
        {
            try
            {
                if (movimientoBlock.Id == 0)
                {
                    movimientoBlock = _context.Add(movimientoBlock).Entity;
                }
                else
                {
                    movimientoBlock = _context.MovimientoBlock.Update(movimientoBlock).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public MovimientoBlock GetById(int idMovimientoBlock)
        {
            return _context.MovimientoBlock.FirstOrDefault(tb => tb.Id == idMovimientoBlock);
        }

        public bool Delete(MovimientoBlock movimientoBlock)
        {
            try
            {
                _context.MovimientoBlock.Remove(movimientoBlock);
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
