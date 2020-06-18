using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface ITipoComprobanteService
    {
        List<TipoComprobante> GetTiposComprobante();
        bool SaveOrUpdate(TipoComprobante tipoComprobante);
        bool Delete(TipoComprobante tipoComprobante);
        TipoComprobante GetById(int idTipoComprobante);
    }

    public class TipoComprobanteService : ITipoComprobanteService
    {
        private ITipoComprobanteDAO _tipoComprobanteDAO;

        public TipoComprobanteService(ITipoComprobanteDAO tipoComprobanteDAO)
        {
            _tipoComprobanteDAO = tipoComprobanteDAO;
        }

        public List<TipoComprobante> GetTiposComprobante()
        {
            return _tipoComprobanteDAO.GetTiposComprobante();
        }


        public bool SaveOrUpdate(TipoComprobante tipoComprobante)
        {
            return _tipoComprobanteDAO.SaveOrUpdate(tipoComprobante);

        }

        public bool Delete(TipoComprobante tipoComprobante)
        {
            return _tipoComprobanteDAO.Delete(tipoComprobante);
        }

        public TipoComprobante GetById(int idTipoComprobante)
        {
            return _tipoComprobanteDAO.GetById(idTipoComprobante);
        }

    }

}
