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
    [Route("api/TipoArticulo")]

    public class TipoArticuloController : Controller
    {
        public ITipoArticuloService _tipoArticuloService;

        public TipoArticuloController(ITipoArticuloService tipoArticuloService) //Este es el constructor
        {
            _tipoArticuloService = tipoArticuloService;
        }
        
        [HttpGet, Route("GetTiposArticulo")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetTiposArticulo()
        {
            return _tipoArticuloService.GetTiposArticulo();
        }

        [HttpGet, Route("GetTiposArticuloVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetTiposArticuloVigentes()
        {
            return _tipoArticuloService.GetTiposArticuloVigentes();
        }

        [HttpGet, Route("GetTiposArticuloConArticulos")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetTiposArticuloConArticulos()
        {
            return _tipoArticuloService.GetTiposArticuloConArticulos();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]TipoArticulo tipoArticulo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //TipoArticulo tipoArticulo = JsonConvert.DeserializeObject<TipoArticulo>(aux);

            return Ok(_tipoArticuloService.SaveOrUpdate(tipoArticulo));
            
        }

        [HttpDelete("{idTipoArticulo}")]
        public IActionResult Delete([FromRoute]int idTipoArticulo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tipoArticulo = _tipoArticuloService.GetById(idTipoArticulo);

            if (tipoArticulo == null)
            {
                return NotFound();
            }

            return Ok(_tipoArticuloService.Delete(tipoArticulo));
        }

    }


}
