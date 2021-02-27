using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface ITrasladoFondoService
    {
        List<TrasladoFondo> GetTrasladoFondos();
        //List<TrasladoFondo> GetTrasladoFondosVigentes();
        bool SaveOrUpdate(TrasladoFondo cuenta);
        bool Delete(TrasladoFondo cuenta);
        TrasladoFondo GetById(int idTrasladoFondo);
    }

    public class TrasladoFondoService : ITrasladoFondoService
    {
        private ITrasladoFondoDAO _trasladoFondoDAO;

        public TrasladoFondoService(ITrasladoFondoDAO trasladoFondoDAO)
        {
            _trasladoFondoDAO = trasladoFondoDAO;
        }

        public List<TrasladoFondo> GetTrasladoFondos()
        {
            return _trasladoFondoDAO.GetTrasladoFondos();
        }

        //public List<TrasladoFondo> GetTrasladoFondosVigentes()
        //{
        //    return _trasladoFondoDAO.GetTrasladoFondosVigentes();
        //}

        public bool SaveOrUpdate(TrasladoFondo cuenta)
        {
            return _trasladoFondoDAO.SaveOrUpdate(cuenta);

        }

        public bool Delete(TrasladoFondo cuenta)
        {
            return _trasladoFondoDAO.Delete(cuenta);
        }

        public TrasladoFondo GetById(int idTrasladoFondo)
        {
            return _trasladoFondoDAO.GetById(idTrasladoFondo);
        }

    }

}
