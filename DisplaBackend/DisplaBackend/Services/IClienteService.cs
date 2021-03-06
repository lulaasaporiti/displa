﻿using DisplaBackend.DAOs;
using DisplaBackend.Models;
using Newtonsoft.Json.Linq;
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
        dynamic GetFichaCliente(int idCliente);
        bool SaveFicha(Ficha ficha);
        bool SaveClienteBloqueo(ClienteBloqueo bloqueo);
        bool BloquearClientes();
        List<dynamic> GetCuentasClientes();
        int AsignarPreciosLentes(JObject[] preciosLentes);
        int AsignarPreciosServicios(JObject[] preciosServicios);
        int AsignarPreciosArticulos(JObject[] preciosArticulos);
        List<dynamic> GetListaAsignacionLente();
        List<dynamic> GetListaAsignacionServicio();
        List<dynamic> GetListaAsignacionArticulo();
        PrecioLente GetPrecioLenteFactura(int idCliente, int idLente, decimal Esferico, decimal Cilindrico);
        JObject GetPrecioArticuloFactura(int idCliente, int[] articulos);
        JObject GetPrecioServicioFactura(int idCliente, int[] servicios);
        double GetDiasPlazo(int idCliente);
        bool DeleteFicha(int idFicha);
        List<PrecioLenteCliente> GetPreciosEspecialesLentes();
        List<PrecioArticuloCliente> GetPreciosEspecialesArticulos();
        List<PrecioServicioCliente> GetPreciosEspecialesServicios();
    }

    public class ClienteService : IClienteService
    {
        private IClienteDAO _clienteDAO;
        private readonly ILenteDAO _lenteDAO;
        private readonly IServicioDAO _servicioDAO;
        private readonly IArticuloVarioDAO _articuloDAO;


        public ClienteService(IClienteDAO clienteDAO, ILenteDAO lenteDAO, IServicioDAO servicioDAO, IArticuloVarioDAO articuloDAO)
        {
            _clienteDAO = clienteDAO;
            _lenteDAO = lenteDAO;
            _articuloDAO = articuloDAO;
            _servicioDAO = servicioDAO;
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

        public bool DeleteFicha(int idFicha)
        {
            return _clienteDAO.DeleteFicha(idFicha);
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

        public bool SaveClienteBloqueo(ClienteBloqueo bloqueo)
        {
            return _clienteDAO.SaveClienteBloqueo(bloqueo);
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

        public dynamic GetFichaCliente(int idCliente)
        {
            return _clienteDAO.GetFichaCliente(idCliente);
        }

        public bool BloquearClientes() {
            return _clienteDAO.BloquearClientes();
        }

        public double GetDiasPlazo(int idCliente)
        {
            return _clienteDAO.GetDiasPlazo(idCliente);
        }

        public List<dynamic> GetCuentasClientes()
        {
            return _clienteDAO.GetCuentasClientes();
        }

        public int AsignarPreciosLentes(JObject[] preciosLentes)
        {
            var listaPrecios = _lenteDAO.GetLentesVigentesAgrupados();
            return _clienteDAO.AsignarPreciosLentes(preciosLentes, listaPrecios);
        }


        public int AsignarPreciosServicios(JObject[] preciosServicios)
        {
            var listaPrecios = _servicioDAO.GetServiciosPrecios();
            return _clienteDAO.AsignarPreciosServicios(preciosServicios, listaPrecios);
        }

        public int AsignarPreciosArticulos(JObject[] preciosArticulos)
        {
            var listaPrecios = _articuloDAO.GetArticulosVariosPrecios();
            return _clienteDAO.AsignarPreciosArticulos(preciosArticulos, listaPrecios);
        }

        public List<dynamic> GetListaAsignacionLente() {
            var listaPrecios = _lenteDAO.GetLentesVigentesAgrupados();
            return _clienteDAO.GetListaAsignacionLente(listaPrecios);
        }

        public List<dynamic> GetListaAsignacionServicio()
        {
            List<Servicio> listaPrecios = _servicioDAO.GetServiciosPrecios();
            return _clienteDAO.GetListaAsignacionServicio(listaPrecios);
        }

        public List<dynamic> GetListaAsignacionArticulo()
        {
            List<ArticuloVario> listaPrecios = _articuloDAO.GetArticulosVariosPrecios();
            return _clienteDAO.GetListaAsignacionArticulo(listaPrecios);
        }

        public PrecioLente GetPrecioLenteFactura(int idCliente, int idLente, decimal Esferico, decimal Cilindrico)
        {
            PrecioLente precioMinimo = _lenteDAO.GetPrecioMinimo(idLente);
            return _clienteDAO.GetPrecioLenteFactura(idCliente, idLente, Esferico, Cilindrico, precioMinimo);

        }

        public JObject GetPrecioArticuloFactura(int idCliente, int[] articulos)
        {
            return _clienteDAO.GetPrecioArticuloFactura(idCliente, articulos);

        }

        public JObject GetPrecioServicioFactura(int idCliente, int[] servicios)
        {
            return _clienteDAO.GetPrecioServicioFactura(idCliente, servicios);

        }

        public List<PrecioLenteCliente> GetPreciosEspecialesLentes()
        {
            return _clienteDAO.GetPreciosEspecialesLentes();
        }

        public List<PrecioArticuloCliente> GetPreciosEspecialesArticulos() {
            return _clienteDAO.GetPreciosEspecialesArticulos();
        }

        public List<PrecioServicioCliente> GetPreciosEspecialesServicios()
        {
            return _clienteDAO.GetPreciosEspecialesServicios();
        }

    }
}
