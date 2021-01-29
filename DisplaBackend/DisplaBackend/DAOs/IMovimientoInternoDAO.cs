using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IMovimientoInternoDAO
    {
        List<MovimientoInterno> GetMovimientoInternos();
        List<MovimientoInterno> GetMovimientoInternosVigentes();
        bool SaveOrUpdate(MovimientoInterno movimientoInterno);
        bool Delete(MovimientoInterno movimientoInterno);
        MovimientoInterno GetById(int idMovimientoInterno);

    }

    public class MovimientoInternoDAO : IMovimientoInternoDAO
    {
        private readonly DisplaNEWContext _context;

        public MovimientoInternoDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<MovimientoInterno> GetMovimientoInternos()
        {
            return _context.MovimientoInterno
                .ToList();
        }

        public List<MovimientoInterno> GetMovimientoInternosVigentes()
        {
            return _context.MovimientoInterno
                .ToList();
        }

        public bool SaveOrUpdate(MovimientoInterno movimientoInterno)
        {
            try
            {
                if (movimientoInterno.Id == 0)
                {
                    movimientoInterno = _context.Add(movimientoInterno).Entity;
                }
                else
                {
                    movimientoInterno = _context.MovimientoInterno.Update(movimientoInterno).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public MovimientoInterno GetById(int idMovimientoInterno)
        {
            return _context.MovimientoInterno.FirstOrDefault(u => u.Id == idMovimientoInterno);
        }

        public bool Delete(MovimientoInterno movimientoInterno)
        {
            try
            {
                movimientoInterno = _context.MovimientoInterno.Update(movimientoInterno).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
