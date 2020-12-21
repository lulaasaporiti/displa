using System;
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

    }


}
