using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IBancoService
    {
        List<Banco> GetBancos();
        List<Banco> GetBancosVigentes();
        bool SaveOrUpdate(Banco banco);
        bool Delete(Banco banco);
        Banco GetById(int idBanco);
    }

    public class BancoService : IBancoService
    {
        private IBancoDAO _bancoDAO;

        public BancoService(IBancoDAO bancoDAO)
        {
            _bancoDAO = bancoDAO;
        }

        public List<Banco> GetBancos()
        {
            return _bancoDAO.GetBancos();
        }

        public List<Banco> GetBancosVigentes()
        {
            return _bancoDAO.GetBancosVigentes();
        }

        public bool SaveOrUpdate(Banco banco)
        {
            return _bancoDAO.SaveOrUpdate(banco);

        }

        public bool Delete(Banco banco)
        {
            return _bancoDAO.Delete(banco);
        }

        public Banco GetById(int idBanco)
        {
            return _bancoDAO.GetById(idBanco);
        }

    }

}
