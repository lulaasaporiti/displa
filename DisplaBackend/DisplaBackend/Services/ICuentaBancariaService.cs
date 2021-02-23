using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface ICuentaBancariaService
    {
        List<CuentaBancaria> GetCuentasBancarias();
        List<CuentaBancaria> GetCuentasBancariasVigentes();
        bool SaveOrUpdate(CuentaBancaria cuenta);
        bool Delete(CuentaBancaria cuenta);
        CuentaBancaria GetById(int idCuentaBancaria);
        bool GetNumero(string numero, int id);
    }

    public class CuentaBancariaService : ICuentaBancariaService
    {
        private ICuentaBancariaDAO _cuentaBancariaDAO;

        public CuentaBancariaService(ICuentaBancariaDAO cuentaBancariaDAO)
        {
            _cuentaBancariaDAO = cuentaBancariaDAO;
        }

        public List<CuentaBancaria> GetCuentasBancarias()
        {
            return _cuentaBancariaDAO.GetCuentasBancarias();
        }

        public bool GetNumero(string numero, int id)
        {
            return _cuentaBancariaDAO.GetNumero(numero, id);
        }

        public List<CuentaBancaria> GetCuentasBancariasVigentes()
        {
            return _cuentaBancariaDAO.GetCuentasBancariasVigentes();
        }

        public bool SaveOrUpdate(CuentaBancaria cuenta)
        {
            return _cuentaBancariaDAO.SaveOrUpdate(cuenta);

        }

        public bool Delete(CuentaBancaria cuenta)
        {
            return _cuentaBancariaDAO.Delete(cuenta);
        }

        public CuentaBancaria GetById(int idCuentaBancaria)
        {
            return _cuentaBancariaDAO.GetById(idCuentaBancaria);
        }

    }

}
