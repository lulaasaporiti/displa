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
    [Route("api/Remito")]

    public class RemitoController : Controller
    {
        public IRemitoService _remitoService;

        public RemitoController(IRemitoService remitoService) //Este es el constructor
        {
            _remitoService = remitoService;
        }

        [HttpGet, Route("GetRemitosPendientesCliente")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetRemitos(int idCliente)
        {
            return _remitoService.GetRemitosPendientesCliente(idCliente);
        }

        [HttpGet, Route("GetRemitosVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetRemitosVigentes()
        {
            return _remitoService.GetRemitosVigentes();
        }

        [HttpPost]
        public async Task<IActionResult> SaveOrUpdate([FromBody]Remito remito)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //Remito remito = JsonConvert.DeserializeObject<Remito>(aux);

            return Ok(await _remitoService.SaveOrUpdate(remito));
            
        }
    
        [HttpDelete("{idRemito}")]
        public IActionResult Delete([FromRoute]int idRemito)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var remito = _remitoService.GetById(idRemito);

            if (remito == null)
            {
                return NotFound();
            }

            return Ok(_remitoService.Delete(remito));
        }

        [HttpGet("{id}")]
        public object GetById([FromRoute]int id)
        {
            return _remitoService.GetById(id);
        }

        [HttpGet, Route("GetLastCode")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetLastCode()
        {
            return _remitoService.GetLastCode();
        }

        [HttpGet, Route("BuscarItemRemito")]
        [EnableCors("DisplaAPIPolicy")]
        public object BuscarItemRemito(int idLente, int idArticulo, string libre, DateTime desde, DateTime hasta)
        {
            return _remitoService.BuscarItemRemito(idLente, idArticulo, libre, desde, hasta);
        }

        [HttpGet, Route("BuscarRemito")]
        [EnableCors("DisplaAPIPolicy")]
        public object BuscarRemito(int idCliente, DateTime fechaDesde, DateTime fechaHasta)
        {
            return _remitoService.BuscarRemito(idCliente, fechaDesde, fechaHasta);
        }

        [HttpGet, Route("BuscarRemitosAnulados")]
        [EnableCors("DisplaAPIPolicy")]
        public object BuscarRemitosAnulados(DateTime fechaDesde, DateTime fechaHasta)
        {
            return _remitoService.BuscarRemitosAnulados(fechaDesde, fechaHasta);
        }

        [HttpGet, Route("BuscarRemitoPorNumero")]
        [EnableCors("DisplaAPIPolicy")]
        public object BuscarRemitoPorNumero(int numeroRemito)
        {
            return _remitoService.BuscarRemitoPorNumero(numeroRemito);
        }
    }


}
