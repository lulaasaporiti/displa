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
    [Route("api/LimitesGrilla")]

    public class LimitesGrillaController : Controller
    {
        public ILimitesGrillaService _limiteGrillaService;

        public LimitesGrillaController(ILimitesGrillaService limiteGrillaService) //Este es el constructor
        {
            _limiteGrillaService = limiteGrillaService;
        }

        [HttpGet, Route("GetLimitesGrilla")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetLimitesGrilla()
        {
            return _limiteGrillaService.GetLimitesGrilla();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]LimitesGrilla limiteGrilla)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_limiteGrillaService.SaveOrUpdate(limiteGrilla));
            
        }

        [HttpDelete("{idLimitesGrilla}")]
        public IActionResult Delete([FromRoute]int idLimitesGrilla)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var limiteGrilla = _limiteGrillaService.GetById(idLimitesGrilla);

            if (limiteGrilla == null)
            {
                return NotFound();
            }

            return Ok(_limiteGrillaService.Delete(limiteGrilla));
        }

        [HttpGet, Route("GetByCombinacion")]
        //[EnableCors("DisplaAPIPolicy")]
        [EnableCors("AllowSpecificOrigin")]
        public object GetByCombinacion(string combinacion)
        {
            combinacion = System.Web.HttpUtility.UrlDecode(combinacion);
            return _limiteGrillaService.GetByCombinacion(combinacion);
        }

        [HttpGet("{id}")]
        //[EnableCors("DisplaAPIPolicy")]
        public object GetById([FromRoute] int id)
        {
            return _limiteGrillaService.GetById(id);
        }
    }
}
