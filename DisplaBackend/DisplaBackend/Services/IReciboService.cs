using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IReciboService
    {
        List<Recibo> GetRecibos();
        List<Recibo> GetRecibosVigentes();
        bool SaveOrUpdate(Recibo recibo);
        bool Delete(Recibo recibo);
        Recibo GetById(int idRecibo);
        List<dynamic> BuscarRecibo(int idCliente, DateTime fechaDesde, DateTime fechaHasta);
    }

    public class ReciboService : IReciboService
    {
        private IReciboDAO _reciboDAO;

        public ReciboService(IReciboDAO reciboDAO)
        {
            _reciboDAO = reciboDAO;
        }

        public List<Recibo> GetRecibos()
        {
            return _reciboDAO.GetRecibos();
        }

        public List<Recibo> GetRecibosVigentes()
        {
            return _reciboDAO.GetRecibosVigentes();
        }

        public bool SaveOrUpdate(Recibo recibo)
        {
            return _reciboDAO.SaveOrUpdate(recibo);

        }

        public bool Delete(Recibo recibo)
        {
            return _reciboDAO.Delete(recibo);
        }

        public Recibo GetById(int idRecibo)
        {
            return _reciboDAO.GetById(idRecibo);
        }

        public List<dynamic> BuscarRecibo(int idCliente, DateTime fechaDesde, DateTime fechaHasta) {
            return _reciboDAO.BuscarRecibo(idCliente, fechaDesde, fechaHasta);
        }
    }

}
