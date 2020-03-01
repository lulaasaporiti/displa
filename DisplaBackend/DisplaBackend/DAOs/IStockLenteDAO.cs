using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IStockLenteDAO
    {
        List<StockLente> GetStockLente(int idLente);
        bool SaveOrUpdate(StockLente stockLente);
        bool Delete(StockLente stockLente);
        StockLente GetStockLente(float medidaCilindrico, float medidaEsferico, int idLente);
    }

    public class StockLenteDAO : IStockLenteDAO
    {
        private readonly DisplaNEWContext _context;

        public StockLenteDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<StockLente> GetStockLente(int idLente)
        {
            return _context.StockLente.Where(sl => sl.IdLente == idLente).ToList();
        }

        public bool SaveOrUpdate(StockLente stockLente)
        {
            StockLente stockDDBB = _context.StockLente.FirstOrDefault(sl => sl.MedidaCilindrico == stockLente.MedidaCilindrico
                                                                            && sl.MedidaEsferico == stockLente.MedidaEsferico
                                                                            && sl.IdLente == stockLente.IdLente);
            try
            {
                if (stockDDBB == null)
                {
                    stockLente = _context.Add(stockLente).Entity;
                }
                else
                {
                    stockLente = _context.StockLente.Update(stockLente).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool Delete(StockLente stockLente)
        {
            try
            {
                stockLente.Stock = 0;
                stockLente = _context.StockLente.Update(stockLente).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }

        public StockLente GetStockLente(float medidaCilindrico, float medidaEsferico, int idLente)
        {
            return _context.StockLente.FirstOrDefault(sl => sl.MedidaCilindrico == medidaCilindrico
                                                            && sl.MedidaEsferico == medidaEsferico
                                                            && sl.IdLente == idLente);
        }


        
    }
}
