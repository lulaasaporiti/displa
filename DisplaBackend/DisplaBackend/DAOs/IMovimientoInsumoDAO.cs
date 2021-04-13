using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IMovimientoInsumoDAO
    {
        List<MovimientoInsumo> GetMovimientosInsumo(int idInsumo);
        bool SaveOrUpdate(MovimientoInsumo movimientoInsumo);
        bool Delete(MovimientoInsumo movimientoInsumo);
        MovimientoInsumo GetById(int idMovimientoInsumo);

    }

    public class MovimientoInsumoDAO : IMovimientoInsumoDAO
    {
        private readonly DisplaNEWContext _context;

        public MovimientoInsumoDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<MovimientoInsumo> GetMovimientosInsumo(int idInsumo)
        {
            return _context.MovimientoInsumo
                .Include(mi => mi.IdUsuarioNavigation)
                .Where(mi => mi.IdInsumo == idInsumo) 
                .ToList();
        }

        public bool SaveOrUpdate(MovimientoInsumo movimientoInsumo)
        {
            try
            {
                movimientoInsumo = _context.Add(movimientoInsumo).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public MovimientoInsumo GetById(int idMovimientoInsumo)
        {
            return _context.MovimientoInsumo.FirstOrDefault(tb => tb.Id == idMovimientoInsumo);
        }

        public bool Delete(MovimientoInsumo movimientoInsumo)
        {
            try
            {
                _context.MovimientoInsumo.Remove(movimientoInsumo);
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
