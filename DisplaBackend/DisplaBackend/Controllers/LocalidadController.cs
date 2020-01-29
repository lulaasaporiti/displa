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
    [Route("api/Localidad")]

    public class LocalidadController : Controller
    {
        public ILocalidadService _localidadService;

        public LocalidadController(ILocalidadService localidadService) //Este es el constructor
        {
            _localidadService = localidadService;
        }

        [HttpGet, Route("GetLocalidades")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetLocalidades()
        {
            return _localidadService.GetLocalidades();
        }

        [HttpGet, Route("GetLocalidadesVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetLocalidadesVigentes()
        {
            return _localidadService.GetLocalidadesVigentes();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]Localidad localidad)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //Localidad localidad = JsonConvert.DeserializeObject<Localidad>(aux);

            return Ok(_localidadService.SaveOrUpdate(localidad));
            
        }

        [HttpDelete("{idLocalidad}")]
        public IActionResult Delete([FromRoute]int idLocalidad)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var localidad = _localidadService.GetById(idLocalidad);

            if (localidad == null)
            {
                return NotFound();
            }

            return Ok(_localidadService.Delete(localidad));
        }

    }


}
