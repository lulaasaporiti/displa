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
    [Route("api/CuentaBancaria")]

    public class CuentasBancariasController : Controller
    {
        public ICuentaBancariaService _cuentaBancariaService;

        public CuentasBancariasController(ICuentaBancariaService cuentaBancariaService) //Este es el constructor
        {
            _cuentaBancariaService = cuentaBancariaService;
        }

        [HttpGet, Route("GetCuentasBancarias")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetCuentasBancarias()
        {
            return _cuentaBancariaService.GetCuentasBancarias();
        }

        [HttpGet, Route("GetNumero")]
        [EnableCors("DisplaAPIPolicy")]
        public bool GetNumero(string numero, int id, int idBanco)
        {
            return _cuentaBancariaService.GetNumero(numero, id, idBanco);
        }

        [HttpGet, Route("GetCuentasBancariasVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetCuentasBancariasVigentes()
        {
            return _cuentaBancariaService.GetCuentasBancariasVigentes();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]CuentaBancaria cuentaBancaria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //CuentasBancarias cuentasBancaria = JsonConvert.DeserializeObject<CuentasBancarias>(aux);

            return Ok(_cuentaBancariaService.SaveOrUpdate(cuentaBancaria));
            
        }

        [HttpDelete("{idCuentasBancarias}")]
        public IActionResult Delete([FromRoute]int idCuentasBancarias)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cuentasBancaria = _cuentaBancariaService.GetById(idCuentasBancarias);

            if (cuentasBancaria == null)
            {
                return NotFound();
            }

            return Ok(_cuentaBancariaService.Delete(cuentasBancaria));
        }

    }


}
