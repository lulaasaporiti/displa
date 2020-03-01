using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface ILimitesGrillaDAO
    {
        List<LimitesGrilla> GetLimitesGrilla();
        bool SaveOrUpdate(LimitesGrilla limiteGrilla);
        bool Delete(LimitesGrilla limiteGrilla);
        LimitesGrilla GetById(int idLimiteGrilla);
        LimitesGrilla GetByCombinacion(string combinacion);


    }

    public class LimitesGrillaDAO : ILimitesGrillaDAO
    {
        private readonly DisplaNEWContext _context;

        public LimitesGrillaDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<LimitesGrilla> GetLimitesGrilla()
        {
            return _context.LimitesGrilla.ToList();
        }

        public bool SaveOrUpdate(LimitesGrilla limiteGrilla)
        {
            try
            {
                if (limiteGrilla.Id == 0)
                {
                    limiteGrilla = _context.Add(limiteGrilla).Entity;
                }
                else
                {
                    limiteGrilla = _context.LimitesGrilla.Update(limiteGrilla).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public LimitesGrilla GetById(int idLimiteGrilla)
        {
            return _context.LimitesGrilla.FirstOrDefault(lg => lg.Id == idLimiteGrilla);
        }

        public LimitesGrilla GetByCombinacion(string combinacion)
        {
            return _context.LimitesGrilla.FirstOrDefault(lg => lg.Combinacion == combinacion);
        }

        public bool Delete(LimitesGrilla limiteGrilla)
        {
            try
            {
                _context.LimitesGrilla.Remove(limiteGrilla);
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
