using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface ITipoInsumoService
    {
        List<TipoInsumo> GetTiposInsumo();
        List<TipoInsumo> GetTiposInsumoVigentes();
        bool SaveOrUpdate(TipoInsumo tipoInsumo);
        bool Delete(TipoInsumo tipoInsumo);
        TipoInsumo GetById(int idTipoInsumo);
    }

    public class TipoInsumoService : ITipoInsumoService
    {
        private ITipoInsumoDAO _tipoInsumoDAO;

        public TipoInsumoService(ITipoInsumoDAO tipoInsumoDAO)
        {
            _tipoInsumoDAO = tipoInsumoDAO;
        }

        public List<TipoInsumo> GetTiposInsumo()
        {
            return _tipoInsumoDAO.GetTiposInsumo();
        }

        public List<TipoInsumo> GetTiposInsumoVigentes()
        {
            return _tipoInsumoDAO.GetTiposInsumoVigentes();
        }

        public bool SaveOrUpdate(TipoInsumo tipoInsumo)
        {
            return _tipoInsumoDAO.SaveOrUpdate(tipoInsumo);

        }

        public bool Delete(TipoInsumo tipoInsumo)
        {
            return _tipoInsumoDAO.Delete(tipoInsumo);
        }

        public TipoInsumo GetById(int idTipoInsumo)
        {
            return _tipoInsumoDAO.GetById(idTipoInsumo);
        }

    }

}
