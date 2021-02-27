using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IOperacionBancariaService
    {
        List<OperacionBancaria> GetOperacionesBancarias();
        //List<OperacionBancaria> GetOperacionesBancariasVigentes();
        OperacionBancaria SaveOrUpdate(OperacionBancaria operacion);
        bool Delete(OperacionBancaria operacion);
        OperacionBancaria GetById(int idOperacionBancaria);
    }

    public class OperacionBancariaService : IOperacionBancariaService
    {
        private IOperacionBancariaDAO _operacionDAO;

        public OperacionBancariaService(IOperacionBancariaDAO operacionDAO)
        {
            _operacionDAO = operacionDAO;
        }

        public List<OperacionBancaria> GetOperacionesBancarias()
        {
            return _operacionDAO.GetOperacionesBancarias();
        }

        //public List<OperacionBancaria> GetOperacionesBancariasVigentes()
        //{
        //    return _operacionDAO.GetOperacionesBancariasVigentes();
        //}

        public OperacionBancaria SaveOrUpdate(OperacionBancaria operacion)
        {
            return _operacionDAO.SaveOrUpdate(operacion);

        }

        public bool Delete(OperacionBancaria operacion)
        {
            return _operacionDAO.Delete(operacion);
        }

        public OperacionBancaria GetById(int idOperacionBancaria)
        {
            return _operacionDAO.GetById(idOperacionBancaria);
        }

    }

}
