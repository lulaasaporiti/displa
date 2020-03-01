using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface ILimitesGrillaService
    {
        List<LimitesGrilla> GetLimitesGrilla();
        bool SaveOrUpdate(LimitesGrilla limiteGrilla);
        bool Delete(LimitesGrilla limiteGrilla);
        LimitesGrilla GetById(int idLimiteGrilla);
        LimitesGrilla GetByCombinacion(string combinacion);
    }

    public class LimitesGrillaService : ILimitesGrillaService
    {
        private ILimitesGrillaDAO _limiteGrillaDAO;

        public LimitesGrillaService(ILimitesGrillaDAO limiteGrillaDAO)
        {
            _limiteGrillaDAO = limiteGrillaDAO;
        }

        public List<LimitesGrilla> GetLimitesGrilla()
        {
            return _limiteGrillaDAO.GetLimitesGrilla();
        }

        public bool SaveOrUpdate(LimitesGrilla limiteGrilla)
        {
            return _limiteGrillaDAO.SaveOrUpdate(limiteGrilla);

        }

        public bool Delete(LimitesGrilla limiteGrilla)
        {
            return _limiteGrillaDAO.Delete(limiteGrilla);
        }

        public LimitesGrilla GetById(int idLimiteGrilla)
        {
            return _limiteGrillaDAO.GetById(idLimiteGrilla);
        }

        public LimitesGrilla GetByCombinacion(string combinacion)
        {
            return _limiteGrillaDAO.GetByCombinacion(combinacion);
        }
    }

}
