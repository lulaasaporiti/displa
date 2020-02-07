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
    [Route("api/Servicio")]

    public class ServicioController : Controller
    {
        public IServicioService _servicioService;

        public ServicioController(IServicioService servicioService) //Este es el constructor
        {
            _servicioService = servicioService;
        }


        [HttpGet, Route("GetServicios")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetServicios()
        {
            return _servicioService.GetServicios();
        }

        [HttpGet, Route("GetServiciosVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetServiciosVigentes()
        {
            return _servicioService.GetServiciosVigentes();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]Servicio servicio)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //Servicio servicio = JsonConvert.DeserializeObject<Servicio>(aux);

            return Ok(_servicioService.SaveOrUpdate(servicio));
            
        }

        [HttpDelete("{idServicio}")]
        public IActionResult Delete([FromRoute]int idServicio)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var servicio = _servicioService.GetById(idServicio);

            if (servicio == null)
            {
                return NotFound();
            }

            return Ok(_servicioService.Delete(servicio));
        }

    }


}