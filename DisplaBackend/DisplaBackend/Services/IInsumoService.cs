using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IInsumoService
    {
        List<Insumo> GetInsumos();
        bool SaveOrUpdate(Insumo insumo);
        bool Delete(Insumo insumo);
        Insumo GetById(int idInsumo);
    }

    public class InsumoService : IInsumoService
    {
        private IInsumoDAO _insumoDAO;

        public InsumoService(IInsumoDAO insumoDAO)
        {
            _insumoDAO = insumoDAO;
        }

        public List<Insumo> GetInsumos()
        {
            return _insumoDAO.GetInsumos();
        }

        public bool SaveOrUpdate(Insumo insumo)
        {
            return _insumoDAO.SaveOrUpdate(insumo);

        }

        public bool Delete(Insumo insumo)
        {
            return _insumoDAO.Delete(insumo);
        }

        public Insumo GetById(int idInsumo)
        {
            return _insumoDAO.GetById(idInsumo);
        }

    }

}
