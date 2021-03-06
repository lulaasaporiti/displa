﻿using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IVentaVirtualService
    {
        List<VentaVirtual> GetVentasVirtuales();
        bool SaveOrUpdate(VentaVirtual ventaVirtual);
        bool Delete(VentaVirtual ventaVirtual);
        VentaVirtual GetById(int idVentaVirtual);
        List<VentaVirtual> GetVentasVirtualesCliente(int idCliente);
        List<VentaVirtual> GetEntregasPendientes(int idCliente);
        bool SaveOrUpdateMovimiento(VentaVirtualMovimientos ventaVirtualMovimientos);
        decimal GetLentesConVentaVirtual(int idCliente, int idLente);
        decimal GetArticulosConVentaVirtual(int idCliente, int idArticulo);
        List<VentaVirtualMovimientos> GetMovimientos(int idVenta);
    }

    public class VentaVirtualService : IVentaVirtualService
    {
        private IVentaVirtualDAO _ventaVirtualDAO;

        public VentaVirtualService(IVentaVirtualDAO ventaVirtualDAO)
        {
            _ventaVirtualDAO = ventaVirtualDAO;
        }

        public List<VentaVirtual> GetVentasVirtuales()
        {
            return _ventaVirtualDAO.GetVentasVirtuales();
        }

        public List<VentaVirtual> GetEntregasPendientes(int idCliente)
        {
            return _ventaVirtualDAO.GetEntregasPendientes(idCliente);
        }


        public List<VentaVirtual> GetVentasVirtualesCliente(int idCliente)
        {
            return _ventaVirtualDAO.GetVentasVirtualesCliente(idCliente);
        }

        public bool SaveOrUpdate(VentaVirtual ventaVirtual)
        {
            return _ventaVirtualDAO.SaveOrUpdate(ventaVirtual);

        }

        public bool Delete(VentaVirtual ventaVirtual)
        {
            return _ventaVirtualDAO.Delete(ventaVirtual);
        }

        public VentaVirtual GetById(int idVentaVirtual)
        {
            return _ventaVirtualDAO.GetById(idVentaVirtual);
        }

        public bool SaveOrUpdateMovimiento(VentaVirtualMovimientos ventaVirtualMovimientos) {
            return _ventaVirtualDAO.SaveOrUpdateMovimiento(ventaVirtualMovimientos);
        }

        public decimal GetLentesConVentaVirtual(int idCliente, int idLente)
        {
            return _ventaVirtualDAO.GetLentesConVentaVirtual(idCliente,idLente);
        }

        public decimal GetArticulosConVentaVirtual(int idCliente, int idArticulo)
        {
            return _ventaVirtualDAO.GetArticulosConVentaVirtual(idCliente, idArticulo);
        }

        public List<VentaVirtualMovimientos> GetMovimientos(int idVenta)
        {
            return _ventaVirtualDAO.GetMovimientos(idVenta);
        }
    }

}
