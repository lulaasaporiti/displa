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
    [Route("api/Gasto")]

    public class GastoController : Controller
    {
        public IGastoService _gastoService;

        public GastoController(IGastoService gastoService) //Este es el constructor
        {
            _gastoService = gastoService;
        }

        [HttpGet, Route("GetGastos")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetGastos()
        {
            return _gastoService.GetGastos();
        }

        //[HttpGet, Route("GetGastosVigentes")]
        //[EnableCors("DisplaAPIPolicy")]
        //public object GetGastosVigentes()
        //{
        //    return _gastoService.GetGastosVigentes();
        //}

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]Gasto gasto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //Gasto gasto = JsonConvert.DeserializeObject<Gasto>(aux);

            return Ok(_gastoService.SaveOrUpdate(gasto));
            
        }

        [HttpDelete("{idGasto}")]
        public IActionResult Delete([FromRoute]int idGasto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var gasto = _gastoService.GetById(idGasto);

            if (gasto == null)
            {
                return NotFound();
            }

            return Ok(_gastoService.Delete(gasto));
        }

    }


}
