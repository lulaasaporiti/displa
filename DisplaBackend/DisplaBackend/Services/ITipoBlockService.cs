using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface ITipoBlockService
    {
        List<TipoBlock> GetTiposBlock();
        List<TipoBlock> GetTiposBlockVigentes();
        bool SaveOrUpdate(TipoBlock tipoBlock);
        bool Delete(TipoBlock tipoBlock);
        TipoBlock GetById(int idTipoBlock);
    }

    public class TipoBlockService : ITipoBlockService
    {
        private ITipoBlockDAO _tipoBlockDAO;

        public TipoBlockService(ITipoBlockDAO tipoBlockDAO)
        {
            _tipoBlockDAO = tipoBlockDAO;
        }

        public List<TipoBlock> GetTiposBlock()
        {
            return _tipoBlockDAO.GetTiposBlock();
        }

        public List<TipoBlock> GetTiposBlockVigentes()
        {
            return _tipoBlockDAO.GetTiposBlockVigentes();
        }

        public bool SaveOrUpdate(TipoBlock tipoBlock)
        {
            return _tipoBlockDAO.SaveOrUpdate(tipoBlock);

        }

        public bool Delete(TipoBlock tipoBlock)
        {
            return _tipoBlockDAO.Delete(tipoBlock);
        }

        public TipoBlock GetById(int idTipoBlock)
        {
            return _tipoBlockDAO.GetById(idTipoBlock);
        }

    }

}
