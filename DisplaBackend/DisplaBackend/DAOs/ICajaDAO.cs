using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface ICajaDAO
    {
        List<Caja> GetCajas();
        bool SaveOrUpdate(Caja caja);
        bool Delete(Caja caja);
        Caja GetById(int idCaja);

    }

    public class CajaDAO : ICajaDAO
    {
        private readonly DisplaNEWContext _context;

        public CajaDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<Caja> GetCajas()
        {
            return _context.Caja.ToList();
        }

        public bool SaveOrUpdate(Caja caja)
        {
            try
            {
                if (caja.Id == 0)
                {
                    caja = _context.Add(caja).Entity;
                }
                else
                {
                    caja = _context.Caja.Update(caja).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public Caja GetById(int idCaja)
        {
            return _context.Caja.FirstOrDefault(tb => tb.Id == idCaja);
        }

        public bool Delete(Caja caja)
        {
            try
            {
                _context.Caja.Remove(caja);
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
