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
    [Route("api/Provincia")]

    public class ProvinciaController : Controller
    {
        public IProvinciaService _provinciaService;

        public ProvinciaController(IProvinciaService provinciaService) //Este es el constructor
        {
            _provinciaService = provinciaService;
        }

        [HttpGet, Route("GetProvincias")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetProvincias()
        {
            return _provinciaService.GetProvincias();
        }

        [HttpGet, Route("GetProvinciasVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetProvinciasVigentes()
        {
            return _provinciaService.GetProvinciasVigentes();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]Provincia provincia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //Provincia provincia = JsonConvert.DeserializeObject<Provincia>(aux);

            return Ok(_provinciaService.SaveOrUpdate(provincia));
            
        }

        [HttpDelete("{idProvincia}")]
        public IActionResult Delete([FromRoute]int idProvincia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var provincia = _provinciaService.GetById(idProvincia);

            if (provincia == null)
            {
                return NotFound();
            }

            return Ok(_provinciaService.Delete(provincia));
        }

    }


}
