using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IChequeService
    {
        List<Cheque> GetChequesCartera();
        bool SaveOrUpdate(Cheque cheque);
        bool Delete(Cheque cheque);
        Cheque GetById(int idCheque);
    }

    public class ChequeService : IChequeService
    {
        private IChequeDAO _chequeDAO;

        public ChequeService(IChequeDAO chequeDAO)
        {
            _chequeDAO = chequeDAO;
        }

        public List<Cheque> GetChequesCartera()
        {
            return _chequeDAO.GetChequesCartera();
        }

        public bool SaveOrUpdate(Cheque cheque)
        {
            return _chequeDAO.SaveOrUpdate(cheque);

        }

        public bool Delete(Cheque cheque)
        {
            return _chequeDAO.Delete(cheque);
        }

        public Cheque GetById(int idCheque)
        {
            return _chequeDAO.GetById(idCheque);
        }

    }

}
