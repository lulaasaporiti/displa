﻿using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System;
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
        List<ComprobanteCliente> GetCuentaPorCliente(int idCliente, DateTime fecha);
    }

    public class ComprobanteClienteService : IComprobanteClienteService
    {
        private IComprobanteClienteDAO _comprobanteClienteDAO;
        private IParametroDAO _parametroDAO;
        private IRemitoDAO _remitoDAO;

        public ComprobanteClienteService(IComprobanteClienteDAO comprobanteClienteDAO, IParametroDAO parametroDAO, IRemitoDAO remitoDAO)
        {
            _comprobanteClienteDAO = comprobanteClienteDAO;
            _parametroDAO = parametroDAO;
            _remitoDAO = remitoDAO;
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
            List<Remito> remitos = _remitoDAO.GetRemitosPendientesCliente(comprobanteCliente.IdCliente);
            return await _comprobanteClienteDAO.SaveOrUpdate(comprobanteCliente, remitos);

        }

        public bool Delete(ComprobanteCliente comprobanteCliente)
        {
            return _comprobanteClienteDAO.Delete(comprobanteCliente);
        }

        public ComprobanteCliente GetById(int idComprobanteCliente)
        {
            return _comprobanteClienteDAO.GetById(idComprobanteCliente);
        }

        public List<ComprobanteCliente> GetCuentaPorCliente(int idCliente, DateTime fecha)
        {
            return _comprobanteClienteDAO.GetCuentaPorCliente(idCliente, fecha);
        }
    }

}
