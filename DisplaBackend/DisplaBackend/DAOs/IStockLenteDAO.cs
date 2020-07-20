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
        bool SaveOrUpdate(List<StockLente> stocksLente);
        bool Delete(StockLente stockLente);
        StockLente GetStockLente(decimal medidaCilindrico, decimal medidaEsferico, int idLente);
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

        public bool SaveOrUpdate(List<StockLente> stocksLente)
        {
            try
            {
                foreach (var stock in stocksLente)
                {
                    if(stock.Id == 0)
                    {
                        _context.Add(stock);
                    }
                    else
                    {
                        _context.Update(stock);
                    }
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

        public StockLente GetStockLente(decimal medidaCilindrico, decimal medidaEsferico, int idLente)
        {
            return _context.StockLente.FirstOrDefault(sl => sl.MedidaCilindrico == medidaCilindrico
                                                            && sl.MedidaEsferico == medidaEsferico
                                                            && sl.IdLente == idLente);
        }


        
    }
}
