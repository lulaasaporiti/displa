using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface ILocalidadService
    {
        List<Localidad> GetLocalidades();
        List<Localidad> GetLocalidadesVigentes();
        bool SaveOrUpdate(Localidad localidad);
        bool Delete(Localidad localidad);
        Localidad GetById(int idLocalidad);
    }

    public class LocalidadService : ILocalidadService
    {
        private ILocalidadDAO _localidadDAO;

        public LocalidadService(ILocalidadDAO localidadDAO)
        {
            _localidadDAO = localidadDAO;
        }

        public List<Localidad> GetLocalidades()
        {
            return _localidadDAO.GetLocalidades();
        }

        public List<Localidad> GetLocalidadesVigentes()
        {
            return _localidadDAO.GetLocalidadesVigentes();
        }

        public bool SaveOrUpdate(Localidad localidad)
        {
            return _localidadDAO.SaveOrUpdate(localidad);

        }

        public bool Delete(Localidad localidad)
        {
            return _localidadDAO.Delete(localidad);
        }

        public Localidad GetById(int idLocalidad)
        {
            return _localidadDAO.GetById(idLocalidad);
        }

    }

}
