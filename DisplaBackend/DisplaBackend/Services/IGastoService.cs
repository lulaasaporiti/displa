using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IGastoService
    {
        List<Gasto> GetGastos();
        //List<Gasto> GetGastosVigentes();
        bool SaveOrUpdate(Gasto gasto);
        bool Delete(Gasto gasto);
        Gasto GetById(int idGasto);
    }

    public class GastoService : IGastoService
    {
        private IGastoDAO _gastoDAO;

        public GastoService(IGastoDAO gastoDAO)
        {
            _gastoDAO = gastoDAO;
        }

        public List<Gasto> GetGastos()
        {
            return _gastoDAO.GetGastos();
        }

        //public List<Gasto> GetGastosVigentes()
        //{
        //    return _gastoDAO.GetGastosVigentes();
        //}

        public bool SaveOrUpdate(Gasto gasto)
        {
            return _gastoDAO.SaveOrUpdate(gasto);

        }

        public bool Delete(Gasto gasto)
        {
            return _gastoDAO.Delete(gasto);
        }

        public Gasto GetById(int idGasto)
        {
            return _gastoDAO.GetById(idGasto);
        }

    }

}
