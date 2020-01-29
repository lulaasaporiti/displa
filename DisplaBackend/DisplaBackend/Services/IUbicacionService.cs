using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IUbicacionService
    {
        List<Ubicacion> GetUbicaciones();
        List<Ubicacion> GetUbicacionesVigentes();
        bool SaveOrUpdate(Ubicacion ubicacion);
        bool Delete(Ubicacion ubicacion);
        Ubicacion GetById(int idUbicacion);
    }

    public class UbicacionService : IUbicacionService
    {
        private IUbicacionDAO _ubicacionDAO;

        public UbicacionService(IUbicacionDAO ubicacionDAO)
        {
            _ubicacionDAO = ubicacionDAO;
        }

        public List<Ubicacion> GetUbicaciones()
        {
            return _ubicacionDAO.GetUbicaciones();
        }

        public List<Ubicacion> GetUbicacionesVigentes()
        {
            return _ubicacionDAO.GetUbicacionesVigentes();
        }

        public bool SaveOrUpdate(Ubicacion ubicacion)
        {
            return _ubicacionDAO.SaveOrUpdate(ubicacion);

        }

        public bool Delete(Ubicacion ubicacion)
        {
            return _ubicacionDAO.Delete(ubicacion);
        }

        public Ubicacion GetById(int idUbicacion)
        {
            return _ubicacionDAO.GetById(idUbicacion);
        }

    }

}
