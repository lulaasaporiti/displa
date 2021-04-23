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
    [Route("api/ComprobanteCliente")]

    public class ComprobanteClienteController : Controller
    {
        public IComprobanteClienteService _comprobanteClienteService;

        public ComprobanteClienteController(IComprobanteClienteService comprobanteClienteService) //Este es el constructor
        {
            _comprobanteClienteService = comprobanteClienteService;
        }

        [HttpGet, Route("GetComprobantesCliente")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetComprobantesCliente()
        {
            return _comprobanteClienteService.GetComprobantesCliente();
        }

        [HttpGet, Route("GetComprobantesClienteVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetComprobantesClienteVigentes()
        {
            return _comprobanteClienteService.GetComprobantesClienteVigentes();
        }

        [HttpPost, Route("AltaComprobantes")]
        public async Task<ComprobanteCliente> AltaComprobantes([FromBody] ComprobanteCliente comprobanteCliente)
        {
            if (!ModelState.IsValid)
            {
                return null;
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //ComprobanteCliente comprobanteCliente = JsonConvert.DeserializeObject<ComprobanteCliente>(aux);

            return await _comprobanteClienteService.AltaComprobantes(comprobanteCliente);

        }

        [HttpPost]
        public async Task<ComprobanteCliente> SaveOrUpdate([FromBody]ComprobanteCliente comprobanteCliente)
        {
            if (!ModelState.IsValid)
            {
                return null;
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //ComprobanteCliente comprobanteCliente = JsonConvert.DeserializeObject<ComprobanteCliente>(aux);

            return await _comprobanteClienteService.SaveOrUpdate(comprobanteCliente);
            
        }
    
        [HttpDelete("{idComprobanteCliente}")]
        public IActionResult Delete([FromRoute]int idComprobanteCliente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var comprobanteCliente = _comprobanteClienteService.GetById(idComprobanteCliente);

            if (comprobanteCliente == null)
            {
                return NotFound();
            }

            return Ok(_comprobanteClienteService.Delete(comprobanteCliente));
        }

        [HttpGet("{id}")]
        public object GetById([FromRoute]int id)
        {
            return _comprobanteClienteService.GetById(id);
        }

        [HttpGet, Route("GetCuentaPorCliente")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetCuentaPorCliente(int idCliente, DateTime fecha)
        {
            return _comprobanteClienteService.GetCuentaPorCliente(idCliente, fecha);
        }

        [HttpGet, Route("BuscarItem")]
        [EnableCors("DisplaAPIPolicy")]
        public object BuscarItem(int idLente, int idArticulo, string libre, DateTime desde, DateTime hasta)
        {
            return _comprobanteClienteService.BuscarItem(idLente, idArticulo, libre, desde, hasta);
        }


        [HttpGet, Route("BuscarComprobante")]
        [EnableCors("DisplaAPIPolicy")]
        public object BuscarComprobante(int idCliente, DateTime fechaDesde, DateTime fechaHasta)
        {
            return _comprobanteClienteService.BuscarComprobante(idCliente, fechaDesde, fechaHasta);
        }
    }


}
