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
    [Route("api/Sobre")]

    public class SobreController : Controller
    {
        public ISobreService _sobreService;

        public SobreController(ISobreService sobreService) //Este es el constructor
        {
            _sobreService = sobreService;
        }

        [HttpGet, Route("GetSobres")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetSobres()
        {
            return _sobreService.GetSobres();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]Sobre[] sobres)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(_sobreService.SaveOrUpdate(sobres));
            
        }

        [HttpDelete("{idSobre}")]
        public IActionResult Delete([FromRoute]int idSobre)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sobre = _sobreService.GetById(idSobre);

            if (sobre == null)
            {
                return NotFound();
            }

            return Ok(_sobreService.Delete(sobre));
        }


        [HttpGet, Route("GetSobresConsulta")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetSobresConsulta(int IdCliente, DateTime fechaDesde, DateTime fechaHasta)
        {
            return _sobreService.GetSobresConsulta(IdCliente, fechaDesde, fechaHasta);
        }
    }
}
