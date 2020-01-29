using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IProvinciaService
    {
        List<Provincia> GetProvincias();
        List<Provincia> GetProvinciasVigentes();
        bool SaveOrUpdate(Provincia provincia);
        bool Delete(Provincia provincia);
        Provincia GetById(int idProvincia);
    }

    public class ProvinciaService : IProvinciaService
    {
        private IProvinciaDAO _provinciaDAO;

        public ProvinciaService(IProvinciaDAO provinciaDAO)
        {
            _provinciaDAO = provinciaDAO;
        }

        public List<Provincia> GetProvincias()
        {
            return _provinciaDAO.GetProvincias();
        }

        public List<Provincia> GetProvinciasVigentes()
        {
            return _provinciaDAO.GetProvinciasVigentes();
        }

        public bool SaveOrUpdate(Provincia provincia)
        {
            return _provinciaDAO.SaveOrUpdate(provincia);

        }

        public bool Delete(Provincia provincia)
        {
            return _provinciaDAO.Delete(provincia);
        }

        public Provincia GetById(int idProvincia)
        {
            return _provinciaDAO.GetById(idProvincia);
        }

    }

}
