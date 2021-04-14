using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface ITipoDescuentoService
    {
        List<TipoDescuento> GetTiposDescuento();
        List<TipoDescuento> GetTiposDescuentoVigentes();
        bool SaveOrUpdate(TipoDescuento tipoDescuento);
        bool Delete(TipoDescuento tipoDescuento);
        TipoDescuento GetById(int idTipoDescuento);
    }

    public class TipoDescuentoService : ITipoDescuentoService
    {
        private ITipoDescuentoDAO _tipoDescuentoDAO;

        public TipoDescuentoService(ITipoDescuentoDAO tipoDescuentoDAO)
        {
            _tipoDescuentoDAO = tipoDescuentoDAO;
        }

        public List<TipoDescuento> GetTiposDescuento()
        {
            return _tipoDescuentoDAO.GetTiposDescuento();
        }

        public List<TipoDescuento> GetTiposDescuentoVigentes()
        {
            return _tipoDescuentoDAO.GetTiposDescuentoVigentes();
        }

        public bool SaveOrUpdate(TipoDescuento tipoDescuento)
        {
            return _tipoDescuentoDAO.SaveOrUpdate(tipoDescuento);

        }

        public bool Delete(TipoDescuento tipoDescuento)
        {
            return _tipoDescuentoDAO.Delete(tipoDescuento);
        }

        public TipoDescuento GetById(int idTipoDescuento)
        {
            return _tipoDescuentoDAO.GetById(idTipoDescuento);
        }

    }

}
