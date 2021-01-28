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
    [Route("api/Recibo")]

    public class ReciboController : Controller
    {
        public IReciboService _reciboService;

        public ReciboController(IReciboService reciboService) //Este es el constructor
        {
            _reciboService = reciboService;
        }

        [HttpGet, Route("GetRecibos")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetRecibos()
        {
            return _reciboService.GetRecibos();
        }

        [HttpGet, Route("GetRecibosVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetRecibosVigentes()
        {
            return _reciboService.GetRecibosVigentes();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]Recibo recibo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //Recibo recibo = JsonConvert.DeserializeObject<Recibo>(aux);

            return Ok(_reciboService.SaveOrUpdate(recibo));
            
        }

        [HttpDelete("{idRecibo}")]
        public IActionResult Delete([FromRoute]int idRecibo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var recibo = _reciboService.GetById(idRecibo);

            if (recibo == null)
            {
                return NotFound();
            }

            return Ok(_reciboService.Delete(recibo));
        }

    }


}
