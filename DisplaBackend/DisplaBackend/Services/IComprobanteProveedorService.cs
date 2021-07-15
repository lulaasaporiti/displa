using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IComprobanteProveedorService
    {
        List<ComprobanteProveedor> GetComprobantesProveedor();
        //List<ComprobanteProveedor> GetComprobantesProveedorVigentes();
        bool SaveOrUpdate(ComprobanteProveedor comprobante);
        bool Delete(ComprobanteProveedor comprobante);
        ComprobanteProveedor GetById(int idComprobanteProveedor);
        List<dynamic> BuscarComprobante(int idProveedor, DateTime fechaDesde, DateTime fechaHasta);

    }

    public class ComprobanteProveedorService : IComprobanteProveedorService
    {
        private IComprobanteProveedorDAO _comprobanteDAO;

        public ComprobanteProveedorService(IComprobanteProveedorDAO comprobanteDAO)
        {
            _comprobanteDAO = comprobanteDAO;
        }

        public List<ComprobanteProveedor> GetComprobantesProveedor()
        {
            return _comprobanteDAO.GetComprobantesProveedor();
        }

        //public List<ComprobanteProveedor> GetComprobantesProveedorVigentes()
        //{
        //    return _comprobanteDAO.GetComprobantesProveedorVigentes();
        //}

        public bool SaveOrUpdate(ComprobanteProveedor comprobante)
        {
            return _comprobanteDAO.SaveOrUpdate(comprobante);

        }

        public bool Delete(ComprobanteProveedor comprobante)
        {
            return _comprobanteDAO.Delete(comprobante);
        }

        public ComprobanteProveedor GetById(int idComprobanteProveedor)
        {
            return _comprobanteDAO.GetById(idComprobanteProveedor);
        }

        public List<dynamic> BuscarComprobante(int idProveedor, DateTime fechaDesde, DateTime fechaHasta)
        {
            return _comprobanteDAO.BuscarComprobante(idProveedor, fechaDesde, fechaHasta);
        }

    }

}
