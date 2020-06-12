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
        int SaveOrUpdate(Cliente cliente);
        bool Delete(Cliente cliente);
        Cliente GetById(int idCliente);
        List<Cliente> GetClientesActivos();
        bool SavePreciosArticulos(List<PrecioArticuloCliente> preciosArticulos);
        bool SavePreciosServicios(List<PrecioServicioCliente> preciosServicios);
        bool SavePreciosLentes(List<PrecioLenteCliente> preciosLentes);
        //bool SavePreciosEspecialesArticulos(List<PrecioEspecialArticuloCliente> preciosArticulos);
        List<PrecioArticuloCliente> GetPreciosArticulosCliente(int idCliente);
        List<PrecioServicioCliente> GetPreciosServiciosCliente(int idCliente);
        List<PrecioLenteCliente> GetPreciosLentesCliente(int idCliente);
        List<Ficha> GetFichaCliente(int idCliente);
        bool SaveFicha(Ficha ficha);
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

        public int SaveOrUpdate(Cliente cliente)
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

        public bool SavePreciosArticulos(List<PrecioArticuloCliente> preciosArticulos)
        {
            return _clienteDAO.SavePreciosArticulos(preciosArticulos);
        }

        public bool SavePreciosServicios(List<PrecioServicioCliente> preciosServicios)
        {
            return _clienteDAO.SavePreciosServicios(preciosServicios);
        }

        public bool SavePreciosLentes(List<PrecioLenteCliente> preciosLentes)
        {
            return _clienteDAO.SavePreciosLentes(preciosLentes);
        }

        //public bool SavePreciosEspecialesArticulos(List<PrecioEspecialArticuloCliente> preciosArticulos)
        //{
        //    return _clienteDAO.SavePreciosEspecialesArticulos(preciosArticulos);
        //}

        public bool SaveFicha(Ficha ficha)
        {
            return _clienteDAO.SaveFicha(ficha);
        }

        public List<PrecioArticuloCliente> GetPreciosArticulosCliente(int idCliente) {
            return _clienteDAO.GetPreciosArticulosCliente(idCliente);
        }

        public List<PrecioServicioCliente> GetPreciosServiciosCliente(int idCliente)
        {
            return _clienteDAO.GetPreciosServiciosCliente(idCliente);
        }

        public List<PrecioLenteCliente> GetPreciosLentesCliente(int idCliente)
        {
            return _clienteDAO.GetPreciosLentesCliente(idCliente);
        }

        public List<Ficha> GetFichaCliente(int idCliente)
        {
            return _clienteDAO.GetFichaCliente(idCliente);
        }
    }
}
