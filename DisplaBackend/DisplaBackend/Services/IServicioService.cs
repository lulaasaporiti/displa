using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IServicioService
    {
        List<Servicio> GetServicios();
        List<Servicio> GetServiciosVigentes();
        List<Servicio> GetServiciosClientes();
        bool SaveOrUpdate(Servicio servicio);
        bool Delete(Servicio servicio);
        Servicio GetById(int idServicio);
    }

    public class ServicioService : IServicioService
    {
        private IServicioDAO _servicioDAO;

        public ServicioService(IServicioDAO servicioDAO)
        {
            _servicioDAO = servicioDAO;
        }

        public List<Servicio> GetServicios()
        {
            return _servicioDAO.GetServicios();
        }

        public List<Servicio> GetServiciosVigentes()
        {
            return _servicioDAO.GetServiciosVigentes();
        }

        public List<Servicio> GetServiciosClientes() {
            return _servicioDAO.GetServiciosClientes();
        }

        public bool SaveOrUpdate(Servicio servicio)
        {
            return _servicioDAO.SaveOrUpdate(servicio);

        }

        public bool Delete(Servicio servicio)
        {
            return _servicioDAO.Delete(servicio);
        }

        public Servicio GetById(int idServicio)
        {
            return _servicioDAO.GetById(idServicio);
        }

    }

}
