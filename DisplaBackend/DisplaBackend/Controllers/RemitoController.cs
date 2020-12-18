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
    [Route("api/Remito")]

    public class RemitoController : Controller
    {
        public IRemitoService _remitoService;

        public RemitoController(IRemitoService remitoService) //Este es el constructor
        {
            _remitoService = remitoService;
        }

        [HttpGet, Route("GetRemitos")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetRemitos()
        {
            return _remitoService.GetRemitos();
        }

        [HttpGet, Route("GetRemitosVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetRemitosVigentes()
        {
            return _remitoService.GetRemitosVigentes();
        }

        [HttpPost]
        public async Task<IActionResult> SaveOrUpdate([FromBody]Remito remito)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //Remito remito = JsonConvert.DeserializeObject<Remito>(aux);

            return Ok(await _remitoService.SaveOrUpdate(remito));
            
        }
    
        [HttpDelete("{idRemito}")]
        public IActionResult Delete([FromRoute]int idRemito)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var remito = _remitoService.GetById(idRemito);

            if (remito == null)
            {
                return NotFound();
            }

            return Ok(_remitoService.Delete(remito));
        }

    }


}
