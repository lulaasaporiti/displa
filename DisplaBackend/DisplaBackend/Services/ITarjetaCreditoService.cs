using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface ITarjetaCreditoService
    {
        List<TarjetaCredito> GetTarjetasCredito();
        List<TarjetaCredito> GetTarjetasCreditoVigentes();
        bool SaveOrUpdate(TarjetaCredito tarjetaCredito);
        bool Delete(TarjetaCredito tarjetaCredito);
        TarjetaCredito GetById(int idTarjetaCredito);
    }

    public class TarjetaCreditoService : ITarjetaCreditoService
    {
        private ITarjetaCreditoDAO _tarjetaCreditoDAO;

        public TarjetaCreditoService(ITarjetaCreditoDAO tarjetaCreditoDAO)
        {
            _tarjetaCreditoDAO = tarjetaCreditoDAO;
        }

        public List<TarjetaCredito> GetTarjetasCredito()
        {
            return _tarjetaCreditoDAO.GetTarjetasCredito();
        }

        public List<TarjetaCredito> GetTarjetasCreditoVigentes()
        {
            return _tarjetaCreditoDAO.GetTarjetasCreditoVigentes();
        }

        public bool SaveOrUpdate(TarjetaCredito tarjetaCredito)
        {
            return _tarjetaCreditoDAO.SaveOrUpdate(tarjetaCredito);

        }

        public bool Delete(TarjetaCredito tarjetaCredito)
        {
            return _tarjetaCreditoDAO.Delete(tarjetaCredito);
        }

        public TarjetaCredito GetById(int idTarjetaCredito)
        {
            return _tarjetaCreditoDAO.GetById(idTarjetaCredito);
        }

    }

}
