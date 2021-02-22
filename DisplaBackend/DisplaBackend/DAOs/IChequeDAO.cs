using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IChequeDAO
    {
        List<Cheque> GetChequesCartera();
        bool SaveOrUpdate(Cheque cheque);
        bool Delete(Cheque cheque);
        Cheque GetById(int idCheque);

    }

    public class ChequeDAO : IChequeDAO
    {
        private readonly DisplaNEWContext _context;

        public ChequeDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<Cheque> GetChequesCartera()
        {
            return _context.Cheque
                .Include(c => c.IdBancoNavigation)
                .Include(c => c.IdClienteNavigation)
                .Where(c => c.FechaAnulado == null)
                .OrderBy(c => c.Fecha)
                .ToList();
        }

        public bool SaveOrUpdate(Cheque cheque)
        {
            try
            {
                if (cheque.Id == 0)
                {
                    cheque.IdCliente = cheque.IdClienteNavigation.Id;
                    cheque.IdClienteNavigation = null;
                    cheque = _context.Add(cheque).Entity;
                }
                else
                {
                    cheque = _context.Cheque.Update(cheque).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public Cheque GetById(int idCheque)
        {
            return _context.Cheque.FirstOrDefault(tb => tb.Id == idCheque);
        }

        public bool Delete(Cheque cheque)
        {
            try
            {
                cheque = _context.Cheque.Update(cheque).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
