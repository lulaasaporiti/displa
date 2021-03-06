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
        Task<ComprobanteCliente> SaveOrUpdate(ComprobanteCliente comprobanteCliente);
        Task<ComprobanteCliente> AltaComprobantes(ComprobanteCliente comprobanteCliente);
        bool Delete(ComprobanteCliente comprobanteCliente);
        ComprobanteCliente GetById(int idComprobanteCliente);
        List<ComprobanteCliente> GetCuentaPorCliente(int idCliente, DateTime fecha);
        List<dynamic> BuscarItem(int idLente, int idArticulo, string libre, DateTime desde, DateTime hasta);
        List<dynamic> BuscarComprobante(int idCliente, DateTime fechaDesde, DateTime fechaHasta);
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

        public async Task<ComprobanteCliente> AltaComprobantes(ComprobanteCliente comprobanteCliente)
        {
            List<Remito> remitos = _remitoDAO.GetRemitosPendientesCliente(comprobanteCliente.IdCliente);
            Parametros parametros = _parametroDAO.GetParametro();

            // Si el comprobante entra 
            if ((comprobanteCliente.ComprobanteItem.Count <= parametros.CantidadProductoDiferentes) && (comprobanteCliente.MontoTotal <= parametros.MontoMaximoComprobante))
            {   
                return await _comprobanteClienteDAO.SaveOrUpdate(comprobanteCliente, remitos);
            }
            else
            {
               await _comprobanteClienteDAO.AltaComprobantes(comprobanteCliente, remitos, parametros);
            }
            //max: 20
            //comprobante con 50

            //comprobanteCliente.ComprobanteItem.length = 50 / max



            //aux comprobanteCliente = comprobanteCliente;
            
            //aux.ComprobanteItem = comprobanteCliente.Comprobanteitem.Take(20)
            //Comprobantecliente.ComprobanteItem = comprobanteCliente.Comprobanteitem.Skip(20)
            
            //arreglodecomprobantes.append(aux)
            
            
            return await _comprobanteClienteDAO.SaveOrUpdate(comprobanteCliente, remitos);

        }

        public async Task<ComprobanteCliente> SaveOrUpdate(ComprobanteCliente comprobanteCliente)
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

        public List<dynamic> BuscarItem(int idLente, int idArticulo, string libre, DateTime desde, DateTime hasta)
        {
            return _comprobanteClienteDAO.BuscarItem(idLente, idArticulo, libre, desde, hasta);
        }

        public List<dynamic> BuscarComprobante(int idCliente, DateTime fechaDesde, DateTime fechaHasta)
        {
            return _comprobanteClienteDAO.BuscarComprobante(idCliente, fechaDesde, fechaHasta);
        }
    }

}
