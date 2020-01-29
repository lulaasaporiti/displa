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
    [Route("api/TipoInsumo")]

    public class TipoInsumoController : Controller
    {
        public ITipoInsumoService _tipoInsumoService;

        public TipoInsumoController(ITipoInsumoService tipoInsumoService) //Este es el constructor
        {
            _tipoInsumoService = tipoInsumoService;
        }
        
        [HttpGet, Route("GetTiposInsumo")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetTiposInsumo()
        {
            return _tipoInsumoService.GetTiposInsumo();
        }

        [HttpGet, Route("GetTiposInsumoVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetTiposInsumoVigentes()
        {
            return _tipoInsumoService.GetTiposInsumoVigentes();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]TipoInsumo tipoInsumo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //TipoInsumo tipoInsumo = JsonConvert.DeserializeObject<TipoInsumo>(aux);

            return Ok(_tipoInsumoService.SaveOrUpdate(tipoInsumo));
            
        }

        [HttpDelete("{idTipoInsumo}")]
        public IActionResult Delete([FromRoute]int idTipoInsumo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tipoInsumo = _tipoInsumoService.GetById(idTipoInsumo);

            if (tipoInsumo == null)
            {
                return NotFound();
            }

            return Ok(_tipoInsumoService.Delete(tipoInsumo));
        }

    }


}
