using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IParametroService
    {
        Parametros GetParametro();
        string GetObservaciones();
        bool SaveOrUpdate(Parametros parametro);
        bool Delete(Parametros parametro);
        Parametros GetById(int idParametro);
    }

    public class ParametroService : IParametroService
    {
        private IParametroDAO _parametroDAO;

        public ParametroService(IParametroDAO parametroDAO)
        {
            _parametroDAO = parametroDAO;
        }

        public Parametros GetParametro()
        {
            return _parametroDAO.GetParametro();
        }

        public string GetObservaciones()
        {
            return _parametroDAO.GetObservaciones();
        }

        public bool SaveOrUpdate(Parametros parametro)
        {
            return _parametroDAO.SaveOrUpdate(parametro);

        }

        public bool Delete(Parametros parametro)
        {
            return _parametroDAO.Delete(parametro);
        }

        public Parametros GetById(int idParametro)
        {
            return _parametroDAO.GetById(idParametro);
        }

    }

}
