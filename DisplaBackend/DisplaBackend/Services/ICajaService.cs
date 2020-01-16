using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface ICajaService
    {
        List<Caja> GetCajas();
        bool SaveOrUpdate(Caja caja);
        bool Delete(Caja caja);
        Caja GetById(int idCaja);
    }

    public class CajaService : ICajaService
    {
        private ICajaDAO _cajaDAO;

        public CajaService(ICajaDAO cajaDAO)
        {
            _cajaDAO = cajaDAO;
        }

        public List<Caja> GetCajas()
        {
            return _cajaDAO.GetCajas();
        }

        public bool SaveOrUpdate(Caja caja)
        {
            return _cajaDAO.SaveOrUpdate(caja);

        }

        public bool Delete(Caja caja)
        {
            return _cajaDAO.Delete(caja);
        }

        public Caja GetById(int idCaja)
        {
            return _cajaDAO.GetById(idCaja);
        }

    }

}
