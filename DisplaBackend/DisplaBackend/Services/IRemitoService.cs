using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IRemitoService
    {
        List<Remito> GetRemitos();
        List<Remito> GetRemitosVigentes();
        Task<bool> SaveOrUpdate(Remito remito);
        bool Delete(Remito remito);
        Remito GetById(int idRemito);
    }

    public class RemitoService : IRemitoService
    {
        private IRemitoDAO _remitoDAO;

        public RemitoService(IRemitoDAO remitoDAO)
        {
            _remitoDAO = remitoDAO;
        }

        public List<Remito> GetRemitos()
        {
            return _remitoDAO.GetRemitos();
        }

        public List<Remito> GetRemitosVigentes()
        {
            return _remitoDAO.GetRemitosVigentes();
        }

        public async Task<bool> SaveOrUpdate(Remito remito)
        {
            return await _remitoDAO.SaveOrUpdate(remito);

        }

        public bool Delete(Remito remito)
        {
            return _remitoDAO.Delete(remito);
        }

        public Remito GetById(int idRemito)
        {
            return _remitoDAO.GetById(idRemito);
        }

    }

}
