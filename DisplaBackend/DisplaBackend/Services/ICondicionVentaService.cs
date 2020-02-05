using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface ICondicionVentaService
    {
        List<CondicionVenta> GetCondicionesVenta();
        List<CondicionVenta> GetCondicionesVentaVigentes();
        bool SaveOrUpdate(CondicionVenta condicionVenta);
        bool Delete(CondicionVenta condicionVenta);
        CondicionVenta GetById(int idCondicionVenta);
    }

    public class CondicionVentaService : ICondicionVentaService
    {
        private ICondicionVentaDAO _condicionVentaDAO;

        public CondicionVentaService(ICondicionVentaDAO condicionVentaDAO)
        {
            _condicionVentaDAO = condicionVentaDAO;
        }

        public List<CondicionVenta> GetCondicionesVenta()
        {
            return _condicionVentaDAO.GetCondicionesVenta();
        }

        public List<CondicionVenta> GetCondicionesVentaVigentes()
        {
            return _condicionVentaDAO.GetCondicionesVentaVigentes();
        }

        public bool SaveOrUpdate(CondicionVenta condicionVenta)
        {
            return _condicionVentaDAO.SaveOrUpdate(condicionVenta);

        }

        public bool Delete(CondicionVenta condicionVenta)
        {
            return _condicionVentaDAO.Delete(condicionVenta);
        }

        public CondicionVenta GetById(int idCondicionVenta)
        {
            return _condicionVentaDAO.GetById(idCondicionVenta);
        }

    }

}
