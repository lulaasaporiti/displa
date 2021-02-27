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
    [Route("api/OperacionBancaria")]

    public class OperacionBancariaController : Controller
    {
        public IOperacionBancariaService _operacionService;

        public OperacionBancariaController(IOperacionBancariaService operacionService) //Este es el constructor
        {
            _operacionService = operacionService;
        }

        [HttpGet, Route("GetOperacionesBancarias")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetOperacionesBancarias()
        {
            return _operacionService.GetOperacionesBancarias();
        }

        //[HttpGet, Route("GetOperacionesBancariasVigentes")]
        //[EnableCors("DisplaAPIPolicy")]
        //public object GetOperacionesBancariasVigentes()
        //{
        //    return _operacionService.GetOperacionesBancariasVigentes();
        //}

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]OperacionBancaria operacion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //OperacionBancaria operacion = JsonConvert.DeserializeObject<OperacionBancaria>(aux);

            return Ok(_operacionService.SaveOrUpdate(operacion));
            
        }

        [HttpDelete("{idOperacionBancaria}")]
        public IActionResult Delete([FromRoute]int idOperacionBancaria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var operacion = _operacionService.GetById(idOperacionBancaria);

            if (operacion == null)
            {
                return NotFound();
            }

            return Ok(_operacionService.Delete(operacion));
        }

    }


}
