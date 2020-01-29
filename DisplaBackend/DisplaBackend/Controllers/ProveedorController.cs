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
    [Route("api/Proveedor")]

    public class ProveedorController : Controller
    {
        public IProveedorService _ubicacionService;

        public ProveedorController(IProveedorService ubicacionService) //Este es el constructor
        {
            _ubicacionService = ubicacionService;
        }

        [HttpGet, Route("GetProveedores")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetProveedores()
        {
            return _ubicacionService.GetProveedores();
        }

        [HttpGet, Route("GetProveedoresVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetProveedoresVigentes()
        {
            return _ubicacionService.GetProveedoresVigentes();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]Proveedor ubicacion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //Proveedor ubicacion = JsonConvert.DeserializeObject<Proveedor>(aux);

            return Ok(_ubicacionService.SaveOrUpdate(ubicacion));
            
        }

        [HttpDelete("{idProveedor}")]
        public IActionResult Delete([FromRoute]int idProveedor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ubicacion = _ubicacionService.GetById(idProveedor);

            if (ubicacion == null)
            {
                return NotFound();
            }

            return Ok(_ubicacionService.Delete(ubicacion));
        }

    }


}
