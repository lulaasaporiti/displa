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
    [Route("api/ComprobanteProveedor")]

    public class ComprobanteProveedorController : Controller
    {
        public IComprobanteProveedorService _comprobanteProveedorService;

        public ComprobanteProveedorController(IComprobanteProveedorService comprobanteProveedorService) //Este es el constructor
        {
            _comprobanteProveedorService = comprobanteProveedorService;
        }

        [HttpGet, Route("GetComprobantesProveedor")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetComprobantesProveedor()
        {
            return _comprobanteProveedorService.GetComprobantesProveedor();
        }

        //[HttpGet, Route("GetComprobantesProveedorVigentes")]
        //[EnableCors("DisplaAPIPolicy")]
        //public object GetComprobantesProveedorVigentes()
        //{
        //    return _comprobanteProveedorService.GetComprobantesProveedorVigentes();
        //}

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]ComprobanteProveedor comprobanteProveedor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //ComprobanteProveedor comprobanteProveedor = JsonConvert.DeserializeObject<ComprobanteProveedor>(aux);

            return Ok(_comprobanteProveedorService.SaveOrUpdate(comprobanteProveedor));
            
        }

        [HttpDelete("{idComprobanteProveedor}")]
        public IActionResult Delete([FromRoute]int idComprobanteProveedor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var comprobanteProveedor = _comprobanteProveedorService.GetById(idComprobanteProveedor);

            if (comprobanteProveedor == null)
            {
                return NotFound();
            }

            return Ok(_comprobanteProveedorService.Delete(comprobanteProveedor));
        }

    }


}
