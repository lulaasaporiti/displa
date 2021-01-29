using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IMovimientoInternoService
    {
        List<MovimientoInterno> GetMovimientoInternos();
        List<MovimientoInterno> GetMovimientoInternosVigentes();
        bool SaveOrUpdate(MovimientoInterno movimientoInterno);
        bool Delete(MovimientoInterno movimientoInterno);
        MovimientoInterno GetById(int idMovimientoInterno);
    }

    public class MovimientoInternoService : IMovimientoInternoService
    {
        private IMovimientoInternoDAO _movimientoInternoDAO;

        public MovimientoInternoService(IMovimientoInternoDAO movimientoInternoDAO)
        {
            _movimientoInternoDAO = movimientoInternoDAO;
        }

        public List<MovimientoInterno> GetMovimientoInternos()
        {
            return _movimientoInternoDAO.GetMovimientoInternos();
        }

        public List<MovimientoInterno> GetMovimientoInternosVigentes()
        {
            return _movimientoInternoDAO.GetMovimientoInternosVigentes();
        }

        public bool SaveOrUpdate(MovimientoInterno movimientoInterno)
        {
            return _movimientoInternoDAO.SaveOrUpdate(movimientoInterno);

        }

        public bool Delete(MovimientoInterno movimientoInterno)
        {
            return _movimientoInternoDAO.Delete(movimientoInterno);
        }

        public MovimientoInterno GetById(int idMovimientoInterno)
        {
            return _movimientoInternoDAO.GetById(idMovimientoInterno);
        }

    }

}
