using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IFuncionService
    {
        List<Funcion> GetFunciones();
        Funcion GetById(int idFuncion);
        List<Funcion> GetFuncionesAgrupadas();
    }

    public class FuncionService : IFuncionService
    {
        private IFuncionDAO _funcionDAO;

        public FuncionService(IFuncionDAO funcionDAO)
        {
            _funcionDAO = funcionDAO;
        }

        public List<Funcion> GetFunciones()
        {
            return _funcionDAO.GetFunciones();
        }
        
        public Funcion GetById(int idFuncion)
        {
            return _funcionDAO.GetById(idFuncion);
        }
        
        public List<Funcion> GetFuncionesAgrupadas()
        {
            return _funcionDAO.GetFuncionesAgrupadas();
        }
    }

}
