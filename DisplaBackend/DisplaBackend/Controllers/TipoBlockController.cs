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
    [Route("api/TipoBlock")]

    public class TipoBlockController : Controller
    {
        public ITipoBlockService _tipoBlockService;

        public TipoBlockController(ITipoBlockService tipoBlockService) //Este es el constructor
        {
            _tipoBlockService = tipoBlockService;
        }
        
        [HttpGet, Route("GetTiposBlock")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetTiposBlock()
        {
            return _tipoBlockService.GetTiposBlock();
        }

        [HttpGet, Route("GetTiposBlockVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetTiposBlockVigentes()
        {
            return _tipoBlockService.GetTiposBlockVigentes();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]TipoBlock tipoBlock)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //TipoBlock tipoBlock = JsonConvert.DeserializeObject<TipoBlock>(aux);

            return Ok(_tipoBlockService.SaveOrUpdate(tipoBlock));
            
        }

        [HttpDelete("{idTipoBlock}")]
        public IActionResult Delete([FromRoute]int idTipoBlock)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tipoBlock = _tipoBlockService.GetById(idTipoBlock);

            if (tipoBlock == null)
            {
                return NotFound();
            }

            return Ok(_tipoBlockService.Delete(tipoBlock));
        }

    }


}
