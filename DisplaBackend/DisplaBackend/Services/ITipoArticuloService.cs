using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface ITipoArticuloService
    {
        List<TipoArticulo> GetTiposArticulo();
        List<TipoArticulo> GetTiposArticuloVigentes();
        bool SaveOrUpdate(TipoArticulo tipoArticulo);
        bool Delete(TipoArticulo tipoArticulo);
        TipoArticulo GetById(int idTipoArticulo);
        List<TipoArticulo> GetTiposArticuloConArticulos();
    }

    public class TipoArticuloService : ITipoArticuloService
    {
        private ITipoArticuloDAO _tipoArticuloDAO;

        public TipoArticuloService(ITipoArticuloDAO tipoArticuloDAO)
        {
            _tipoArticuloDAO = tipoArticuloDAO;
        }

        public List<TipoArticulo> GetTiposArticulo()
        {
            return _tipoArticuloDAO.GetTiposArticulo();
        }

        public List<TipoArticulo> GetTiposArticuloVigentes()
        {
            return _tipoArticuloDAO.GetTiposArticuloVigentes();
        }

        public List<TipoArticulo> GetTiposArticuloConArticulos()
        {
            return _tipoArticuloDAO.GetTiposArticuloConArticulos();
        }

        public bool SaveOrUpdate(TipoArticulo tipoArticulo)
        {
            return _tipoArticuloDAO.SaveOrUpdate(tipoArticulo);

        }

        public bool Delete(TipoArticulo tipoArticulo)
        {
            return _tipoArticuloDAO.Delete(tipoArticulo);
        }

        public TipoArticulo GetById(int idTipoArticulo)
        {
            return _tipoArticuloDAO.GetById(idTipoArticulo);
        }

    }

}
