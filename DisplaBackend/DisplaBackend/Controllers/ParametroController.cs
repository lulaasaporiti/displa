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
    [Route("api/Parametro")]

    public class ParametroController : Controller
    {
        public IParametroService _parametroService;

        public ParametroController(IParametroService parametroService) //Este es el constructor
        {
            _parametroService = parametroService;
        }

        [HttpGet, Route("GetParametro")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetParametroes()
        {
            return _parametroService.GetParametro();
        }

        [HttpGet, Route("GetObservaciones()")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetObservaciones()
        {
            return _parametroService.GetObservaciones();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]Parametros parametro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //Parametro parametro = JsonConvert.DeserializeObject<Parametro>(aux);

            return Ok(_parametroService.SaveOrUpdate(parametro));
            
        }

        [HttpDelete("{idParametro}")]
        public IActionResult Delete([FromRoute]int idParametro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var parametro = _parametroService.GetById(idParametro);

            if (parametro == null)
            {
                return NotFound();
            }

            return Ok(_parametroService.Delete(parametro));
        }

    }


}
