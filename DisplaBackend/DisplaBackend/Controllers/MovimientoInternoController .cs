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
    [Route("api/MovimientoInterno")]

    public class MovimientoInternoController : Controller
    {
        public IMovimientoInternoService _movimientoInternoService;

        public MovimientoInternoController(IMovimientoInternoService movimientoInternoService) //Este es el constructor
        {
            _movimientoInternoService = movimientoInternoService;
        }

        [HttpGet, Route("GetMovimientoInternos")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetMovimientoInternos()
        {
            return _movimientoInternoService.GetMovimientoInternos();
        }

        [HttpGet, Route("GetMovimientoInternosVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetMovimientoInternosVigentes()
        {
            return _movimientoInternoService.GetMovimientoInternosVigentes();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]MovimientoInterno movimientoInterno)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //MovimientoInterno movimientoInterno = JsonConvert.DeserializeObject<MovimientoInterno>(aux);

            return Ok(_movimientoInternoService.SaveOrUpdate(movimientoInterno));
            
        }

        [HttpDelete("{idMovimientoInterno}")]
        public IActionResult Delete([FromRoute]int idMovimientoInterno)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var movimientoInterno = _movimientoInternoService.GetById(idMovimientoInterno);

            if (movimientoInterno == null)
            {
                return NotFound();
            }

            return Ok(_movimientoInternoService.Delete(movimientoInterno));
        }

        [HttpGet("{id}")]
        public object GetById([FromRoute]int id)
        {
            return _movimientoInternoService.GetById(id);
        }

        [HttpGet, Route("BuscarMovimiento")]
        [EnableCors("DisplaAPIPolicy")]
        public object BuscarMovimiento(int idCliente, DateTime fechaDesde, DateTime fechaHasta)
        {
            return _movimientoInternoService.BuscarMovimiento(idCliente, fechaDesde, fechaHasta);
        }

        [HttpGet, Route("BuscarMovimientoProveedor")]
        [EnableCors("DisplaAPIPolicy")]
        public object BuscarMovimientoProveedor(int idProveedor, DateTime fechaDesde, DateTime fechaHasta)
        {
            return _movimientoInternoService.BuscarMovimientoProveedor(idProveedor, fechaDesde, fechaHasta);
        }


    }


}
