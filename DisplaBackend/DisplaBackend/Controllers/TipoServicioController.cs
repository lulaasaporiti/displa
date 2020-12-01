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
    [Route("api/TipoServicio")]

    public class TipoServicioController : Controller
    {
        public ITipoServicioService _tipoServicioService;

        public TipoServicioController(ITipoServicioService tipoServicioService) //Este es el constructor
        {
            _tipoServicioService = tipoServicioService;
        }
        
        [HttpGet, Route("GetTiposServicio")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetTiposServicio()
        {
            return _tipoServicioService.GetTiposServicio();
        }

        [HttpGet, Route("GetTiposServicioVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetTiposServicioVigentes()
        {
            return _tipoServicioService.GetTiposServicioVigentes();
        }

        [HttpGet, Route("GetServiciosSinCalibrados")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetServiciosSinCalibrados(int idCliente)
        {
            return _tipoServicioService.GetServiciosSinCalibrados(idCliente);
        }

        [HttpGet, Route("GetTiposServicioConServicios")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetTiposServicioConServicios()
        {
            return _tipoServicioService.GetTiposServicioConServicios();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]TipoServicio tipoServicio)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //TipoServicio tipoServicio = JsonConvert.DeserializeObject<TipoServicio>(aux);

            return Ok(_tipoServicioService.SaveOrUpdate(tipoServicio));
            
        }

        [HttpDelete("{idTipoServicio}")]
        public IActionResult Delete([FromRoute]int idTipoServicio)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tipoServicio = _tipoServicioService.GetById(idTipoServicio);

            if (tipoServicio == null)
            {
                return NotFound();
            }

            return Ok(_tipoServicioService.Delete(tipoServicio));
        }

    }


}
