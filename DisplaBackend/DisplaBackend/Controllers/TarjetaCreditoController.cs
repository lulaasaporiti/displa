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
    [Route("api/TarjetaCredito")]

    public class TarjetaCreditoController : Controller
    {
        public ITarjetaCreditoService _tarjetaCreditoService;

        public TarjetaCreditoController(ITarjetaCreditoService tarjetaCreditoService) //Este es el constructor
        {
            _tarjetaCreditoService = tarjetaCreditoService;
        }

        [HttpGet, Route("GetTarjetasCredito")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetTarjetasCredito()
        {
            return _tarjetaCreditoService.GetTarjetasCredito();
        }

        [HttpGet, Route("GetTarjetasCreditoVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetTarjetasCreditoVigentes()
        {
            return _tarjetaCreditoService.GetTarjetasCreditoVigentes();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]TarjetaCredito tarjetaCredito)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //TarjetaCredito tarjetaCredito = JsonConvert.DeserializeObject<TarjetaCredito>(aux);

            return Ok(_tarjetaCreditoService.SaveOrUpdate(tarjetaCredito));
            
        }

        [HttpDelete("{idTarjetaCredito}")]
        public IActionResult Delete([FromRoute]int idTarjetaCredito)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tarjetaCredito = _tarjetaCreditoService.GetById(idTarjetaCredito);

            if (tarjetaCredito == null)
            {
                return NotFound();
            }

            return Ok(_tarjetaCreditoService.Delete(tarjetaCredito));
        }

    }


}
