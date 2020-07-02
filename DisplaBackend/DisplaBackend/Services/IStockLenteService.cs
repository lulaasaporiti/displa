using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IStockLenteService
    {
        List<StockLente> GetStockLente(int idLente);
        bool SaveOrUpdate(List<StockLente> stocksLente);
        bool Delete(StockLente stockLente);
        StockLente GetStockLente(float medidaCilindrico, float medidaEsferico, int idLente);
    }

    public class StockLenteService : IStockLenteService
    {
        private IStockLenteDAO _stockLenteDAO;

        public StockLenteService(IStockLenteDAO stockLenteDAO)
        {
            _stockLenteDAO = stockLenteDAO;
        }

        public List<StockLente> GetStockLente(int idLente)
        {
            return _stockLenteDAO.GetStockLente(idLente);
        }

        public bool SaveOrUpdate(List<StockLente> stocksLente)
        {
            return _stockLenteDAO.SaveOrUpdate(stocksLente);

        }

        public bool Delete(StockLente stockLente)
        {
            return _stockLenteDAO.Delete(stockLente);
        }

        public StockLente GetStockLente(float medidaCilindrico, float medidaEsferico, int idLente)
        {
            return _stockLenteDAO.GetStockLente(medidaCilindrico, medidaEsferico, idLente);
        }


    }

}
