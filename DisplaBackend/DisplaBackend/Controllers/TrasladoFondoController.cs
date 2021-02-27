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
    [Route("api/TrasladoFondo")]

    public class TrasladoFondosController : Controller
    {
        public ITrasladoFondoService _trasladoFondoService;

        public TrasladoFondosController(ITrasladoFondoService trasladoFondoService) //Este es el constructor
        {
            _trasladoFondoService = trasladoFondoService;
        }

        [HttpGet, Route("GetTrasladoFondos")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetTrasladoFondos()
        {
            return _trasladoFondoService.GetTrasladoFondos();
        }

        //[HttpGet, Route("GetTrasladoFondosVigentes")]
        //[EnableCors("DisplaAPIPolicy")]
        //public object GetTrasladoFondosVigentes()
        //{
        //    return _trasladoFondoService.GetTrasladoFondosVigentes();
        //}

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]TrasladoFondo trasladoFondo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //TrasladoFondos cuentasBancaria = JsonConvert.DeserializeObject<TrasladoFondos>(aux);

            return Ok(_trasladoFondoService.SaveOrUpdate(trasladoFondo));
            
        }

        [HttpDelete("{idTrasladoFondos}")]
        public IActionResult Delete([FromRoute]int idTrasladoFondos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cuentasBancaria = _trasladoFondoService.GetById(idTrasladoFondos);

            if (cuentasBancaria == null)
            {
                return NotFound();
            }

            return Ok(_trasladoFondoService.Delete(cuentasBancaria));
        }

    }


}
