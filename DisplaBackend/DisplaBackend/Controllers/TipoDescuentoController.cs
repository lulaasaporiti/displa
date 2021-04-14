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
    [Route("api/TipoDescuento")]

    public class TipoDescuentoController : Controller
    {
        public ITipoDescuentoService _tipoDescuentoService;

        public TipoDescuentoController(ITipoDescuentoService tipoDescuentoService) //Este es el constructor
        {
            _tipoDescuentoService = tipoDescuentoService;
        }
        
        [HttpGet, Route("GetTiposDescuento")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetTiposDescuento()
        {
            return _tipoDescuentoService.GetTiposDescuento();
        }

        [HttpGet, Route("GetTiposDescuentoVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetTiposDescuentoVigentes()
        {
            return _tipoDescuentoService.GetTiposDescuentoVigentes();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]TipoDescuento tipoDescuento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //TipoDescuento tipoDescuento = JsonConvert.DeserializeObject<TipoDescuento>(aux);

            return Ok(_tipoDescuentoService.SaveOrUpdate(tipoDescuento));
            
        }

        [HttpDelete("{idTipoDescuento}")]
        public IActionResult Delete([FromRoute]int idTipoDescuento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tipoDescuento = _tipoDescuentoService.GetById(idTipoDescuento);

            if (tipoDescuento == null)
            {
                return NotFound();
            }

            return Ok(_tipoDescuentoService.Delete(tipoDescuento));
        }

    }


}
