using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IArticuloVarioService
    {
        List<ArticuloVario> GetArticulosVarios();
        List<ArticuloVario> GetArticulosVariosVigentes();
        bool SaveOrUpdate(ArticuloVario articuloVario);
        bool Delete(ArticuloVario articuloVario);
        ArticuloVario GetById(int idArticuloVario);
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

        public List<ArticuloVario> GetArticulosVariosVigentes()
        {
            return _articuloVarioDAO.GetArticulosVariosVigentes();
        }

        public bool SaveOrUpdate(ArticuloVario articuloVario)
        {
            return _articuloVarioDAO.SaveOrUpdate(articuloVario);

        }

        public bool Delete(ArticuloVario articuloVario)
        {
            return _articuloVarioDAO.Delete(articuloVario);
        }

        public ArticuloVario GetById(int idArticuloVario)
        {
            return _articuloVarioDAO.GetById(idArticuloVario);
        }

    }

}
