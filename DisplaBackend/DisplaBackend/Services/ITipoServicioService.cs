using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface ITipoServicioService
    {
        List<TipoServicio> GetTiposServicio();
        List<TipoServicio> GetTiposServicioVigentes();
        bool SaveOrUpdate(TipoServicio tipoServicio);
        bool Delete(TipoServicio tipoServicio);
        TipoServicio GetById(int idTipoServicio);
        List<TipoServicio> GetTiposServicioConServicios();
    }

    public class TipoServicioService : ITipoServicioService
    {
        private ITipoServicioDAO _tipoServicioDAO;

        public TipoServicioService(ITipoServicioDAO tipoServicioDAO)
        {
            _tipoServicioDAO = tipoServicioDAO;
        }

        public List<TipoServicio> GetTiposServicio()
        {
            return _tipoServicioDAO.GetTiposServicio();
        }

        public List<TipoServicio> GetTiposServicioVigentes()
        {
            return _tipoServicioDAO.GetTiposServicioVigentes();
        }

        public List<TipoServicio> GetTiposServicioConServicios()
        {
            return _tipoServicioDAO.GetTiposServicioConServicios();
        }

        public bool SaveOrUpdate(TipoServicio tipoServicio)
        {
            return _tipoServicioDAO.SaveOrUpdate(tipoServicio);

        }

        public bool Delete(TipoServicio tipoServicio)
        {
            return _tipoServicioDAO.Delete(tipoServicio);
        }

        public TipoServicio GetById(int idTipoServicio)
        {
            return _tipoServicioDAO.GetById(idTipoServicio);
        }

    }

}
