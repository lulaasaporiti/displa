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
        public IProveedorService _proveedorService;

        public ProveedorController(IProveedorService proveedorService) //Este es el constructor
        {
            _proveedorService = proveedorService;
        }

        [HttpGet, Route("GetProveedores")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetProveedores()
        {
            return _proveedorService.GetProveedores();
        }

        [HttpGet, Route("GetProveedoresVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetProveedoresVigentes()
        {
            return _proveedorService.GetProveedoresVigentes();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]Proveedor proveedor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //Proveedor proveedor = JsonConvert.DeserializeObject<Proveedor>(aux);

            return Ok(_proveedorService.SaveOrUpdate(proveedor));
            
        }

        [HttpDelete("{idProveedor}")]
        public IActionResult Delete([FromRoute]int idProveedor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var proveedor = _proveedorService.GetById(idProveedor);

            if (proveedor == null)
            {
                return NotFound();
            }

            return Ok(_proveedorService.Delete(proveedor));
        }

    }


}
