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
    [Route("api/MovimientoInsumo")]

    public class MovimientoInsumoController : Controller
    {
        public IMovimientoInsumoService _movimientoInsumoService;

        public MovimientoInsumoController(IMovimientoInsumoService movimientoInsumoService) //Este es el constructor
        {
            _movimientoInsumoService = movimientoInsumoService;
        }


        [HttpGet("{id}"), Route("GetMovimientosInsumo")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetMovimientosInsumo(int id)
        {
            return _movimientoInsumoService.GetMovimientosInsumo(id);
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]MovimientoInsumo movimientoInsumo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //MovimientoInsumo movimientoInsumo = JsonConvert.DeserializeObject<MovimientoInsumo>(aux);

            return Ok(_movimientoInsumoService.SaveOrUpdate(movimientoInsumo));
            
        }

        [HttpDelete("{idMovimientoInsumo}")]
        public IActionResult Delete([FromRoute]int idMovimientoInsumo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var movimientoInsumo = _movimientoInsumoService.GetById(idMovimientoInsumo);

            if (movimientoInsumo == null)
            {
                return NotFound();
            }

            return Ok(_movimientoInsumoService.Delete(movimientoInsumo));
        }

    }


}
