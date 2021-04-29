using DisplaBackend.DAOs;
using DisplaBackend.Models;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IArticuloVarioService
    {
        List<ArticuloVario> GetArticulosVarios();
        List<ArticuloVario> GetArticulosVariosVigentes();
        List<ArticuloVario> GetArticulosVariosPrecios();
        bool SaveOrUpdate(ArticuloVario articuloVario);
        bool Delete(ArticuloVario articuloVario);
        ArticuloVario GetById(int idArticuloVario);
        bool SaveActualizacionPrecio(JObject[] porcentajePrecios);
        bool GenerarPrecioLista(int porcentaje, int lista);

        int GetCantidadListas();
    }

    public class ArticuloVarioService : IArticuloVarioService
    {
        private IArticuloVarioDAO _articuloVarioDAO;

        public ArticuloVarioService(IArticuloVarioDAO articuloVarioDAO)
        {
            _articuloVarioDAO = articuloVarioDAO;
        }

        public List<ArticuloVario> GetArticulosVarios()
        {
            return _articuloVarioDAO.GetArticulosVarios();
        }

        public int GetCantidadListas()
        {
            return _articuloVarioDAO.GetCantidadListas();
        }
        public List<ArticuloVario> GetArticulosVariosVigentes()
        {
            return _articuloVarioDAO.GetArticulosVariosVigentes();
        }

        public List<ArticuloVario> GetArticulosVariosPrecios()
        {
            return _articuloVarioDAO.GetArticulosVariosPrecios();
        }

        public bool SaveOrUpdate(ArticuloVario articuloVario)
        {
            return _articuloVarioDAO.SaveOrUpdate(articuloVario);

        }

        public bool SaveActualizacionPrecio(JObject[] porcentajePrecios)
        {
            return _articuloVarioDAO.SaveActualizacionPrecio(porcentajePrecios);

        }

        public bool Delete(ArticuloVario articuloVario)
        {
            return _articuloVarioDAO.Delete(articuloVario);
        }

        public bool GenerarPrecioLista(int porcentaje, int lista)
        {
            return _articuloVarioDAO.GenerarPrecioLista(porcentaje, lista);

        }
        public ArticuloVario GetById(int idArticuloVario)
        {
            return _articuloVarioDAO.GetById(idArticuloVario);
        }

    }

}
