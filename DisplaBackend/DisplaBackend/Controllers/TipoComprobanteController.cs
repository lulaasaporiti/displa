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
    [Route("api/TipoComprobante")]

    public class TipoComprobanteController : Controller
    {
        public ITipoComprobanteService _tipoComprobanteService;

        public TipoComprobanteController(ITipoComprobanteService tipoComprobanteService) //Este es el constructor
        {
            _tipoComprobanteService = tipoComprobanteService;
        }

        [HttpGet, Route("GetTiposConsumos")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetTiposComprobante()
        {
            return _tipoComprobanteService.GetTiposComprobante();
        }

    

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]TipoComprobante tipoComprobante)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(_tipoComprobanteService.SaveOrUpdate(tipoComprobante));

        }

        [HttpDelete("{idTipoComprobante}")]
        public IActionResult Delete([FromRoute]int idTipoComprobante)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tipoComprobante = _tipoComprobanteService.GetById(idTipoComprobante);

            if (tipoComprobante == null)
            {
                return NotFound();
            }

            return Ok(_tipoComprobanteService.Delete(tipoComprobante));
        }

    }


}
