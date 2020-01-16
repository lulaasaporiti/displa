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
    [Route("api/MovimientoBlock")]

    public class MovimientoBlockController : Controller
    {
        public IMovimientoBlockService _movimientoBlockService;

        public MovimientoBlockController(IMovimientoBlockService movimientoBlockService) //Este es el constructor
        {
            _movimientoBlockService = movimientoBlockService;
        }


        [HttpGet("{id}"), Route("GetMovimientosBlock")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetMovimientosBlock(int id)
        {
            return _movimientoBlockService.GetMovimientosBlock(id);
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]MovimientoBlock movimientoBlock)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //MovimientoBlock movimientoBlock = JsonConvert.DeserializeObject<MovimientoBlock>(aux);

            return Ok(_movimientoBlockService.SaveOrUpdate(movimientoBlock));
            
        }

        [HttpDelete("{idMovimientoBlock}")]
        public IActionResult Delete([FromRoute]int idMovimientoBlock)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var movimientoBlock = _movimientoBlockService.GetById(idMovimientoBlock);

            if (movimientoBlock == null)
            {
                return NotFound();
            }

            return Ok(_movimientoBlockService.Delete(movimientoBlock));
        }

    }


}
