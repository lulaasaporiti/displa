﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DisplaBackend.Models;
using DisplaBackend.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DisplaBackend.Controllers
{
    [Produces("application/json")]
    [Route("api/VentaVirtual")]

    public class VentaVirtualController : Controller
    {
        public IVentaVirtualService _ventaVirtualService;

        public VentaVirtualController(IVentaVirtualService ventaVirtualService) //Este es el constructor
        {
            _ventaVirtualService = ventaVirtualService;
        }

        [HttpGet, Route("GetVentasVirtuales")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetVentasVirtuales()
        {
            return _ventaVirtualService.GetVentasVirtuales();
        }


        [HttpGet, Route("GetEntregasPendientes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetEntregasPendientes(int idCliente)
        {
            return _ventaVirtualService.GetEntregasPendientes(idCliente);
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]VentaVirtual ventaVirtual)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //VentaVirtual ventaVirtual = JsonConvert.DeserializeObject<VentaVirtual>(aux);

            return Ok(_ventaVirtualService.SaveOrUpdate(ventaVirtual));
            
        }

        [HttpPost, Route("VentaVirtualMovimiento")]
        public IActionResult SaveOrUpdateMovimiento([FromBody]VentaVirtualMovimientos ventaVirtualMovimientos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //VentaVirtual ventaVirtual = JsonConvert.DeserializeObject<VentaVirtual>(aux);

            return Ok(_ventaVirtualService.SaveOrUpdateMovimiento(ventaVirtualMovimientos));

        }

        [HttpDelete("{idVentaVirtual}")]
        public IActionResult Delete([FromRoute]int idVentaVirtual)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ventaVirtual = _ventaVirtualService.GetById(idVentaVirtual);

            if (ventaVirtual == null)
            {
                return NotFound();
            }

            return Ok(_ventaVirtualService.Delete(ventaVirtual));
        }

        [HttpGet, Route("GetVentasVirtualesCliente")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetVentasVirtualesCliente(int idCliente)
        {
            return _ventaVirtualService.GetVentasVirtualesCliente(idCliente);
        }

        [HttpGet, Route("GetLentesConVentaVirtual")]
        [EnableCors("DisplaAPIPolicy")]
        public decimal GetLentesConVentaVirtual(int idCliente, int idLente)
        {
            return _ventaVirtualService.GetLentesConVentaVirtual(idCliente, idLente);
        }

        [HttpGet, Route("GetArticulosConVentaVirtual")]
        [EnableCors("DisplaAPIPolicy")]
        public decimal GetArticulosConVentaVirtual(int idCliente, int idArticulo)
        {
            return _ventaVirtualService.GetArticulosConVentaVirtual(idCliente, idArticulo);
        }

        [HttpGet, Route("GetMovimientos")]
        [EnableCors("DisplaAPIPolicy")]
        public List<VentaVirtualMovimientos> GetMovimientos(int idVenta)
        {
            return _ventaVirtualService.GetMovimientos(idVenta); 
        }
    }


}
