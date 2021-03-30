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
    [Route("api/MovimientoCaja")]

    public class MovimientoCajaController : Controller
    {
        public IMovimientoCajaService _movimientoCajaService;

        public MovimientoCajaController(IMovimientoCajaService movimientoCajaService) //Este es el constructor
        {
            _movimientoCajaService = movimientoCajaService;
        }

        [HttpGet, Route("GetMovimientosCaja")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetMovimientosCaja()
        {
            return _movimientoCajaService.GetMovimientosCaja();
        }

        [HttpGet, Route("GetMovimientosCajaVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetMovimientosCajaVigentes()
        {
            return _movimientoCajaService.GetMovimientosCajaVigentes();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]MovimientoCaja movimientoCaja)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            return Ok(_movimientoCajaService.SaveOrUpdate(movimientoCaja));
            
        }

        [HttpDelete("{idMovimientoCaja}")]
        public IActionResult Delete([FromRoute]int idMovimientoCaja)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var movimientoCaja = _movimientoCajaService.GetById(idMovimientoCaja);

            if (movimientoCaja == null)
            {
                return NotFound();
            }

            return Ok(_movimientoCajaService.Delete(movimientoCaja));
        }

    }


}
