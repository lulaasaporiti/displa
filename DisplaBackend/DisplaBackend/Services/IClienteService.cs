using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IClienteService
    {
        List<Cliente> GetClientes();
        List<Cliente> GetClientesVigentes();
        bool SaveOrUpdate(Cliente cliente);
        bool Delete(Cliente cliente);
        Cliente GetById(int idCliente);
        List<Cliente> GetClientesActivos();
    }

    public class ClienteService : IClienteService
    {
        private IClienteDAO _clienteDAO;

        public ClienteService(IClienteDAO clienteDAO)
        {
            _clienteDAO = clienteDAO;
        }

        public List<Cliente> GetClientes()
        {
            return _clienteDAO.GetClientes();
        }

        public List<Cliente> GetClientesVigentes()
        {
            return _clienteDAO.GetClientesVigentes();
        }

        public List<Cliente> GetClientesActivos()
        {
            return _clienteDAO.GetClientesActivos();
        }

        public bool SaveOrUpdate(Cliente cliente)
        {
            return _clienteDAO.SaveOrUpdate(cliente);

        }

        public bool Delete(Cliente cliente)
        {
            return _clienteDAO.Delete(cliente);
        }

        public Cliente GetById(int idCliente)
        {
            return _clienteDAO.GetById(idCliente);
        }

    }

}
