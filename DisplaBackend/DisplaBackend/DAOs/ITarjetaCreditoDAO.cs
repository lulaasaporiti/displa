using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface ITarjetaCreditoDAO
    {
        List<TarjetaCredito> GetTarjetasCredito();
        List<TarjetaCredito> GetTarjetasCreditoVigentes();
        bool SaveOrUpdate(TarjetaCredito tarjetaCredito);
        bool Delete(TarjetaCredito tarjetaCredito);
        TarjetaCredito GetById(int idTarjetaCredito);

    }

    public class TarjetaCreditoDAO : ITarjetaCreditoDAO
    {
        private readonly DisplaNEWContext _context;

        public TarjetaCreditoDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<TarjetaCredito> GetTarjetasCredito()
        {
            return _context.TarjetaCredito
                .Include(l => l.IdBancoNavigation)
                .OrderByDescending(l => l.Borrado)
                .ToList();
        }

        public List<TarjetaCredito> GetTarjetasCreditoVigentes()
        {
            return _context.TarjetaCredito
                //.Include(l => l.IdProvinciaNavigation)
                .Where(l => l.Borrado == false)
                .ToList();
        }

        public bool SaveOrUpdate(TarjetaCredito tarjetaCredito)
        {
            try
            {
                if (tarjetaCredito.Id == 0)
                {
                    tarjetaCredito = _context.Add(tarjetaCredito).Entity;
                }
                else
                {
                    tarjetaCredito = _context.TarjetaCredito.Update(tarjetaCredito).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public TarjetaCredito GetById(int idTarjetaCredito)
        {
            return _context.TarjetaCredito.FirstOrDefault(tb => tb.Id == idTarjetaCredito);
        }

        public bool Delete(TarjetaCredito tarjetaCredito)
        {
            try
            {
                tarjetaCredito.Borrado = !tarjetaCredito.Borrado;
                tarjetaCredito = _context.TarjetaCredito.Update(tarjetaCredito).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
