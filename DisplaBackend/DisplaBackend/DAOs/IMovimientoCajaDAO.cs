using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IMovimientoCajaDAO
    {
        List<MovimientoCaja> GetMovimientosCaja();
        List<MovimientoCaja> GetMovimientosCajaVigentes();
        bool SaveOrUpdate(MovimientoCaja movimientoCaja);
        bool Delete(MovimientoCaja movimientoCaja);
        MovimientoCaja GetById(int idMovimientoCaja);

    }

    public class MovimientoCajaDAO : IMovimientoCajaDAO
    {
        private readonly DisplaNEWContext _context;

        public MovimientoCajaDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<MovimientoCaja> GetMovimientosCaja()
        {
            return _context.MovimientoCaja
                .ToList();
        }

        public List<MovimientoCaja> GetMovimientosCajaVigentes()
        {
            return _context.MovimientoCaja
                .Where(mc => mc.FechaAnulado == null)
                .ToList();
        }

        public bool SaveOrUpdate(MovimientoCaja movimientoCaja)
        {
            try
            {
                if (movimientoCaja.Id == 0)
                {
                    movimientoCaja = _context.Add(movimientoCaja).Entity;
                }
                else
                {
                    movimientoCaja = _context.MovimientoCaja.Update(movimientoCaja).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public MovimientoCaja GetById(int idMovimientoCaja)
        {
            return _context.MovimientoCaja.FirstOrDefault(tb => tb.Id == idMovimientoCaja);
        }

        public bool Delete(MovimientoCaja movimientoCaja)
        {
            try
            {
                _context.MovimientoCaja.Remove(movimientoCaja);
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
