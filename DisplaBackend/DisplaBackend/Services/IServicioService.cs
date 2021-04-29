using DisplaBackend.DAOs;
using DisplaBackend.Models;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IServicioService
    {
        List<Servicio> GetServicios();
        List<Servicio> GetServiciosVigentes();
        List<Servicio> GetServiciosPrecios();
        bool SaveOrUpdate(Servicio servicio);
        bool Delete(Servicio servicio);
        Servicio GetById(int idServicio);
        bool SaveActualizacionPrecio(JObject[] porcentajePrecios);
        bool GenerarPrecioLista(int porcentaje, int lista);
        List<Servicio> GetCalibrados(int idCliente);

        int GetCantidadListas();
    }

    public class ServicioService : IServicioService
    {
        private IServicioDAO _servicioDAO;

        public ServicioService(IServicioDAO servicioDAO)
        {
            _servicioDAO = servicioDAO;
        }

        public int GetCantidadListas()
        {
            return _servicioDAO.GetCantidadListas();
        }

        public List<Servicio> GetServicios()
        {
            return _servicioDAO.GetServicios();
        }

        public List<Servicio> GetCalibrados(int idCliente)
        {
            return _servicioDAO.GetCalibrados(idCliente);
        }

        public List<Servicio> GetServiciosVigentes()
        {
            return _servicioDAO.GetServiciosVigentes();
        }

        public List<Servicio> GetServiciosPrecios() {
            return _servicioDAO.GetServiciosPrecios();
        }

        public bool SaveOrUpdate(Servicio servicio)
        {
            return _servicioDAO.SaveOrUpdate(servicio);

        }
        public bool SaveActualizacionPrecio(JObject[] porcentajePrecios)
        {
            return _servicioDAO.SaveActualizacionPrecio(porcentajePrecios);

        }

        public bool Delete(Servicio servicio)
        {
            return _servicioDAO.Delete(servicio);
        }

        public Servicio GetById(int idServicio)
        {
            return _servicioDAO.GetById(idServicio);
        }

        public bool GenerarPrecioLista(int porcentaje, int lista)
        {
            return _servicioDAO.GenerarPrecioLista(porcentaje, lista);

        }

    }

}
