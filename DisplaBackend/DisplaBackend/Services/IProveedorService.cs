using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IProveedorService
    {
        List<Proveedor> GetProveedores();
        List<Proveedor> GetProveedoresVigentes();
        int SaveOrUpdate(Proveedor proveedor);
        bool Delete(Proveedor proveedor);
        Proveedor GetById(int idProveedor);
    }

    public class ProveedorService : IProveedorService
    {
        private IProveedorDAO _proveedorDAO;

        public ProveedorService(IProveedorDAO proveedorDAO)
        {
            _proveedorDAO = proveedorDAO;
        }

        public List<Proveedor> GetProveedores()
        {
            return _proveedorDAO.GetProveedores();
        }

        public List<Proveedor> GetProveedoresVigentes()
        {
            return _proveedorDAO.GetProveedoresVigentes();
        }

        public int SaveOrUpdate(Proveedor proveedor)
        {
            return _proveedorDAO.SaveOrUpdate(proveedor);

        }

        public bool Delete(Proveedor proveedor)
        {
            return _proveedorDAO.Delete(proveedor);
        }

        public Proveedor GetById(int idProveedor)
        {
            return _proveedorDAO.GetById(idProveedor);
        }

    }

}
