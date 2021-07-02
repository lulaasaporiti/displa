using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IComprobanteProveedorDAO
    {
        List<ComprobanteProveedor> GetComprobantesProveedor();
        //List<ComprobanteProveedor> GetComprobantesProveedorVigentes();
        bool SaveOrUpdate(ComprobanteProveedor comprobante);
        bool Delete(ComprobanteProveedor comprobante);
        ComprobanteProveedor GetById(int idComprobanteProveedor);

    }

    public class ComprobanteProveedorDAO : IComprobanteProveedorDAO
    {
        private readonly DisplaNEWContext _context;

        public ComprobanteProveedorDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<ComprobanteProveedor> GetComprobantesProveedor()
        {
            return _context.ComprobanteProveedor
                //.OrderByDescending(u => u.Borrado)
                .ToList();
        }

        //public List<ComprobanteProveedor> GetComprobantesProveedorVigentes()
        //{
        //    return _context.ComprobanteProveedor
        //        .Where(u => u.Borrado == false)
        //        .ToList();
        //}

        public bool SaveOrUpdate(ComprobanteProveedor comprobante)
        {
            try
            {
                if (comprobante.Id == 0)
                {
                    comprobante.IdGastoNavigation = null;
                    comprobante.IdProveedorNavigation = null;
                    comprobante.IdTarjetaNavigation = null;
                    comprobante.IdTipoComprobanteNavigation = null;
                    comprobante = _context.Add(comprobante).Entity;
                }
                else
                {
                    comprobante = _context.ComprobanteProveedor.Update(comprobante).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public ComprobanteProveedor GetById(int idComprobanteProveedor)
        {
            return _context.ComprobanteProveedor.FirstOrDefault(u => u.Id == idComprobanteProveedor);
        }

        public bool Delete(ComprobanteProveedor comprobante)
        {
            try
            {
                //comprobante.Borrado = !comprobante.Borrado;
                _context.ComprobanteProveedor.Remove(comprobante);
                //comprobante = _context.ComprobanteProveedor.Update(comprobante).Entity;
                return _context.SaveChanges() >= 1;
            }
            catch (DbUpdateException e)
            {
                //throw e;
                return false;
            }
        }
    }
}
