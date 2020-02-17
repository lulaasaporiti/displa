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
    [Route("api/Lente")]

    public class LenteController : Controller
    {
        public ILenteService _lenteService;

        public LenteController(ILenteService lenteService) //Este es el constructor
        {
            _lenteService = lenteService;
        }

        [HttpGet("{id}")]
        //[EnableCors("DisplaAPIPolicy")]
        public object GetById([FromRoute] int id)
        {
            return _lenteService.GetById(id);
        }

        [HttpGet, Route("GetLentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetLentes()
        {
            return _lenteService.GetLentes();
        }

        [HttpGet, Route("GetLentesVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetLentesVigentes()
        {
            return _lenteService.GetLentesVigentes();
        }

        [HttpGet, Route("GetLastCode")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetLastCode()
        {
            return _lenteService.GetLastCode();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]Lente lente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //Lente lente = JsonConvert.DeserializeObject<Lente>(aux);

            return Ok(_lenteService.SaveOrUpdate(lente));
            
        }

        [HttpDelete("{idLente}")]
        public IActionResult Delete([FromRoute]int idLente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var lente = _lenteService.GetById(idLente);

            if (lente == null)
            {
                return NotFound();
            }

            return Ok(_lenteService.Delete(lente));
        }

    }


}
