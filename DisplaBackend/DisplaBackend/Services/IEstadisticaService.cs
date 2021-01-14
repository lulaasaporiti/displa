using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IEstadisticaService
    {
        List<ComprobanteItem> GetDetalleArticulos();
    }

    public class EstadisticaService : IEstadisticaService
    {
        private IEstadisticaDAO _estadisticaDAO;

        public EstadisticaService(IEstadisticaDAO estadisticaDAO)
        {
            _estadisticaDAO = estadisticaDAO;
        }

        public List<ComprobanteItem> GetDetalleArticulos()
        {
            return _estadisticaDAO.GetDetalleArticulos();
        }

    }

}
