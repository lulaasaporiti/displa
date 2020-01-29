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
    [Route("api/Ubicacion")]

    public class UbicacionController : Controller
    {
        public IUbicacionService _ubicacionService;

        public UbicacionController(IUbicacionService ubicacionService) //Este es el constructor
        {
            _ubicacionService = ubicacionService;
        }

        [HttpGet, Route("GetUbicaciones")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetUbicaciones()
        {
            return _ubicacionService.GetUbicaciones();
        }

        [HttpGet, Route("GetUbicacionesVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetUbicacionesVigentes()
        {
            return _ubicacionService.GetUbicacionesVigentes();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]Ubicacion ubicacion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //Ubicacion ubicacion = JsonConvert.DeserializeObject<Ubicacion>(aux);

            return Ok(_ubicacionService.SaveOrUpdate(ubicacion));
            
        }

        [HttpDelete("{idUbicacion}")]
        public IActionResult Delete([FromRoute]int idUbicacion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ubicacion = _ubicacionService.GetById(idUbicacion);

            if (ubicacion == null)
            {
                return NotFound();
            }

            return Ok(_ubicacionService.Delete(ubicacion));
        }

    }


}
