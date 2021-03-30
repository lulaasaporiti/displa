using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IMovimientoCajaService
    {
        List<MovimientoCaja> GetMovimientosCaja();
        List<MovimientoCaja> GetMovimientosCajaVigentes();
        bool SaveOrUpdate(MovimientoCaja movimientoCaja);
        bool Delete(MovimientoCaja movimientoCaja);
        MovimientoCaja GetById(int idMovimientoCaja);
    }

    public class MovimientoCajaService : IMovimientoCajaService
    {
        private IMovimientoCajaDAO _movimientoCajaDAO;

        public MovimientoCajaService(IMovimientoCajaDAO movimientoCajaDAO)
        {
            _movimientoCajaDAO = movimientoCajaDAO;
        }

        public List<MovimientoCaja> GetMovimientosCaja()
        {
            return _movimientoCajaDAO.GetMovimientosCaja();
        }

        public List<MovimientoCaja> GetMovimientosCajaVigentes()
        {
            return _movimientoCajaDAO.GetMovimientosCajaVigentes();
        }

        public bool SaveOrUpdate(MovimientoCaja movimientoCaja)
        {
            return _movimientoCajaDAO.SaveOrUpdate(movimientoCaja);

        }

        public bool Delete(MovimientoCaja movimientoCaja)
        {
            return _movimientoCajaDAO.Delete(movimientoCaja);
        }

        public MovimientoCaja GetById(int idMovimientoCaja)
        {
            return _movimientoCajaDAO.GetById(idMovimientoCaja);
        }

    }

}
