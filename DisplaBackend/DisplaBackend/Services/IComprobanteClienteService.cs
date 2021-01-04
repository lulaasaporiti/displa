using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IComprobanteClienteService
    {
        List<ComprobanteCliente> GetComprobantesCliente();
        List<ComprobanteCliente> GetComprobantesClienteVigentes();
        Task<bool> SaveOrUpdate(ComprobanteCliente comprobanteCliente);
        bool Delete(ComprobanteCliente comprobanteCliente);
        ComprobanteCliente GetById(int idComprobanteCliente);
    }

    public class ComprobanteClienteService : IComprobanteClienteService
    {
        private IComprobanteClienteDAO _comprobanteClienteDAO;
        private IParametroDAO _parametroDAO;


        public ComprobanteClienteService(IComprobanteClienteDAO comprobanteClienteDAO, IParametroDAO parametroDAO)
        {
            _comprobanteClienteDAO = comprobanteClienteDAO;
            _parametroDAO = parametroDAO;
        }

        public List<ComprobanteCliente> GetComprobantesCliente()
        {
            return _comprobanteClienteDAO.GetComprobantesCliente();
        }

        public List<ComprobanteCliente> GetComprobantesClienteVigentes()
        {
            return _comprobanteClienteDAO.GetComprobantesClienteVigentes();
        }

        public async Task<bool> SaveOrUpdate(ComprobanteCliente comprobanteCliente)
        {
            return await _comprobanteClienteDAO.SaveOrUpdate(comprobanteCliente);

        }

        public bool Delete(ComprobanteCliente comprobanteCliente)
        {
            return _comprobanteClienteDAO.Delete(comprobanteCliente);
        }

        public ComprobanteCliente GetById(int idComprobanteCliente)
        {
            return _comprobanteClienteDAO.GetById(idComprobanteCliente);
        }

    }

}
