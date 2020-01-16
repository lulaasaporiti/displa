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
    [Route("api/Caja")]

    public class CajaController : Controller
    {
        public ICajaService _cajaService;

        public CajaController(ICajaService cajaService) //Este es el constructor
        {
            _cajaService = cajaService;
        }


        [HttpGet, Route("GetCajas")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetTiposBlock()
        {
            return _cajaService.GetCajas();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]Caja caja)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //Caja caja = JsonConvert.DeserializeObject<Caja>(aux);

            return Ok(_cajaService.SaveOrUpdate(caja));
            
        }

        [HttpDelete("{idCaja}")]
        public IActionResult Delete([FromRoute]int idCaja)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var caja = _cajaService.GetById(idCaja);

            if (caja == null)
            {
                return NotFound();
            }

            return Ok(_cajaService.Delete(caja));
        }

    }


}
