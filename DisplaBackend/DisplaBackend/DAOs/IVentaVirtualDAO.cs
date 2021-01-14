using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IVentaVirtualDAO
    {
        List<VentaVirtual> GetVentasVirtuales();
        bool SaveOrUpdate(VentaVirtual ventaVirtual);
        bool Delete(VentaVirtual ventaVirtual);
        VentaVirtual GetById(int idVentaVirtual);
        List<VentaVirtual> GetVentasVirtualesCliente(int idCliente);
        List<VentaVirtual> GetEntregasPendientes();
        bool SaveOrUpdateMovimiento(VentaVirtualMovimientos ventaVirtualMovimientos);
        decimal GetLentesConVentaVirtual(int idCliente, int idLente);
        decimal GetArticulosConVentaVirtual(int idCliente, int idArticulo);
        List<VentaVirtualMovimientos> GetMovimientos(int idVenta);
    }

    public class VentaVirtualDAO : IVentaVirtualDAO
    {
        private readonly DisplaNEWContext _context;

        public VentaVirtualDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<VentaVirtual> GetVentasVirtuales()
        {
            return _context.VentaVirtual
                .Include(v => v.IdComprobanteNavigation.IdTipoComprobanteNavigation)
                .Include(v => v.IdComprobanteNavigation)
                .ThenInclude(vc => vc.IdClienteNavigation)
                .ToList();
        }

        public List<VentaVirtual> GetEntregasPendientes()
        {
            return _context.VentaVirtual
                .Include(v => v.IdComprobanteNavigation.IdTipoComprobanteNavigation)
                .Include(v => v.IdComprobanteNavigation)
                .ThenInclude(vc => vc.IdClienteNavigation)
                .Where(v => v.CantidadVendida > v.CantidadEntregada)
                .ToList();
        }


        public bool SaveOrUpdate(VentaVirtual ventaVirtual)
        {
            try
            {
                if (ventaVirtual.Id == 0)
                {
                    ventaVirtual = _context.VentaVirtual.Add(ventaVirtual).Entity;
                }
                else
                {
                    ventaVirtual = _context.VentaVirtual.Update(ventaVirtual).Entity;
                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool SaveOrUpdateMovimiento(VentaVirtualMovimientos ventaVirtualMovimientos)
        {
            try
            {
                if (ventaVirtualMovimientos.Id == 0)
                {
                    ventaVirtualMovimientos = _context.VentaVirtualMovimientos.Add(ventaVirtualMovimientos).Entity;
                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public List<VentaVirtualMovimientos> GetMovimientos(int idVenta)
        {
            return _context.VentaVirtualMovimientos
                .Include(vm => vm.IdUsuarioNavigation)
                .Include(vm => vm.IdComprobanteClienteNavigation)
                .Include(vm => vm.IdVentaVirtualNavigation)
                    .ThenInclude(vv => vv.IdComprobanteNavigation)
                    .ThenInclude(vv => vv.IdTipoComprobanteNavigation)
                .Where(vm => vm.IdVentaVirtual == idVenta).ToList();
        }

        public VentaVirtual GetById(int idVentaVirtual)
        {
            return _context.VentaVirtual.FirstOrDefault(u => u.Id == idVentaVirtual);
        }

        public bool Delete(VentaVirtual ventaVirtual)
        {
            try
            {
                _context.VentaVirtual.Remove(ventaVirtual);
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }

        public List<VentaVirtual> GetVentasVirtualesCliente(int idCliente)
        {
            return _context.VentaVirtual
                .Include(v => v.IdComprobanteNavigation.IdTipoComprobanteNavigation)
                .Include(v => v.IdComprobanteNavigation)
                .ThenInclude(vc => vc.IdClienteNavigation) 
                .Where(v => v.IdComprobanteNavigation.IdCliente == idCliente)
                .ToList();
        }

        public decimal GetLentesConVentaVirtual (int idCliente, int idLente)
        {
            List<VentaVirtual> ventaVirtual  = _context.VentaVirtual.Where(v => v.IdLente == idLente && v.IdComprobanteNavigation.IdCliente == idCliente && v.CantidadEntregada < v.CantidadVendida).ToList();
            decimal restantes = 0;
            foreach (var v in ventaVirtual)
            {
                restantes = restantes + (v.CantidadVendida - v.CantidadEntregada);
            }
            return restantes;
        }

        public decimal GetArticulosConVentaVirtual(int idCliente, int idArticulo)
        {
            List<VentaVirtual> ventaVirtual = _context.VentaVirtual.Where(v => v.IdArticulo == idArticulo && v.IdComprobanteNavigation.IdCliente == idCliente && v.CantidadEntregada < v.CantidadVendida).ToList();
            decimal restantes = 0;
            foreach (var v in ventaVirtual)
            {
                restantes = restantes + (v.CantidadVendida - v.CantidadEntregada);
            }
            return restantes;
        }

    }
}
