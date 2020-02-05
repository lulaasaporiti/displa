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
    [Route("api/CondicionVenta")]

    public class CondicionVentaController : Controller
    {
        public ICondicionVentaService _condicionVentaService;

        public CondicionVentaController(ICondicionVentaService condicionVentaService) //Este es el constructor
        {
            _condicionVentaService = condicionVentaService;
        }

        [HttpGet, Route("GetCondicionesVenta")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetCondicionesVenta()
        {
            return _condicionVentaService.GetCondicionesVenta();
        }

        [HttpGet, Route("GetCondicionesVentaVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetCondicionesVentaVigentes()
        {
            return _condicionVentaService.GetCondicionesVentaVigentes();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]CondicionVenta condicionVenta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //CondicionVenta condicionVenta = JsonConvert.DeserializeObject<CondicionVenta>(aux);

            return Ok(_condicionVentaService.SaveOrUpdate(condicionVenta));
            
        }

        [HttpDelete("{idCondicionVenta}")]
        public IActionResult Delete([FromRoute]int idCondicionVenta)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var condicionVenta = _condicionVentaService.GetById(idCondicionVenta);

            if (condicionVenta == null)
            {
                return NotFound();
            }

            return Ok(_condicionVentaService.Delete(condicionVenta));
        }

    }


}
