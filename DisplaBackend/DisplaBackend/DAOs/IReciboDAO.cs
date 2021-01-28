using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IReciboDAO
    {
        List<Recibo> GetRecibos();
        List<Recibo> GetRecibosVigentes();
        bool SaveOrUpdate(Recibo recibo);
        bool Delete(Recibo recibo);
        Recibo GetById(int idRecibo);

    }

    public class ReciboDAO : IReciboDAO
    {
        private readonly DisplaNEWContext _context;

        public ReciboDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<Recibo> GetRecibos()
        {
            return _context.Recibo
                .ToList();
        }

        public List<Recibo> GetRecibosVigentes()
        {
            return _context.Recibo
                .ToList();
        }

        public bool SaveOrUpdate(Recibo recibo)
        {
            try
            {
                if (recibo.Id == 0)
                {
                    recibo.IdCuentaBancariaNavigation.IdBancoNavigation = null;
                    recibo.IdClienteNavigation = null;
                    recibo.IdCuentaBancariaNavigation = null;
                    recibo.Fecha = DateTime.Now;
                    recibo = _context.Add(recibo).Entity;
                }
                else
                {
                    recibo = _context.Recibo.Update(recibo).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public Recibo GetById(int idRecibo)
        {
            return _context.Recibo.FirstOrDefault(u => u.Id == idRecibo);
        }

        public bool Delete(Recibo recibo)
        {
            try
            {
                recibo = _context.Recibo.Update(recibo).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
