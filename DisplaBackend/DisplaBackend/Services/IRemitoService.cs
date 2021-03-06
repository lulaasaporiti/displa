﻿using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IRemitoService
    {
        List<Remito> GetRemitosPendientesCliente(int idCliente);
        List<Remito> GetRemitosVigentes();
        Task<bool> SaveOrUpdate(Remito remito);
        bool Delete(Remito remito);
        Remito GetById(int idRemito);
        int GetLastCode();
        List<dynamic> BuscarItemRemito(int idLente, int idArticulo, string libre, DateTime desde, DateTime hasta);
        List<dynamic> BuscarRemito(int idCliente, DateTime fechaDesde, DateTime fechaHasta);
        List<dynamic> BuscarRemitoPorNumero(int numeroRemito);
        List<dynamic> BuscarRemitosAnulados(DateTime fechaDesde, DateTime fechaHasta);
    }

    public class RemitoService : IRemitoService
    {
        private IRemitoDAO _remitoDAO;

        public RemitoService(IRemitoDAO remitoDAO)
        {
            _remitoDAO = remitoDAO;
        }

        public List<Remito> GetRemitosPendientesCliente(int idCliente)
        {
            return _remitoDAO.GetRemitosPendientesCliente(idCliente);
        }

        public int GetLastCode()
        {
            return _remitoDAO.GetLastCode();
        }

        public List<Remito> GetRemitosVigentes()
        {
            return _remitoDAO.GetRemitosVigentes();
        }

        public async Task<bool> SaveOrUpdate(Remito remito)
        {
            return await _remitoDAO.SaveOrUpdate(remito);

        }

        public bool Delete(Remito remito)
        {
            return _remitoDAO.Delete(remito);
        }

        public Remito GetById(int idRemito)
        {
            return _remitoDAO.GetById(idRemito);
        }

        public List<dynamic> BuscarItemRemito(int idLente, int idArticulo, string libre, DateTime desde, DateTime hasta)
        {
            return _remitoDAO.BuscarItemRemito(idLente, idArticulo, libre, desde, hasta);
        }

        public List<dynamic> BuscarRemito(int idCliente, DateTime fechaDesde, DateTime fechaHasta) {
            return _remitoDAO.BuscarRemito(idCliente, fechaDesde, fechaHasta);
        }

        public List<dynamic> BuscarRemitosAnulados(DateTime fechaDesde, DateTime fechaHasta)
        {
            return _remitoDAO.BuscarRemitosAnulados(fechaDesde, fechaHasta);
        }

        public List<dynamic> BuscarRemitoPorNumero(int numeroRemito) {
            return _remitoDAO.BuscarRemitoPorNumero(numeroRemito);
        }
    }

}
