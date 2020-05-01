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
    [Route("api/Banco")]

    public class BancoController : Controller
    {
        public IBancoService _bancoService;

        public BancoController(IBancoService bancoService) //Este es el constructor
        {
            _bancoService = bancoService;
        }

        [HttpGet, Route("GetBancos")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetBancos()
        {
            return _bancoService.GetBancos();
        }

        [HttpGet, Route("GetBancosVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetBancosVigentes()
        {
            return _bancoService.GetBancosVigentes();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]Banco banco)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //Banco banco = JsonConvert.DeserializeObject<Banco>(aux);

            return Ok(_bancoService.SaveOrUpdate(banco));
            
        }

        [HttpDelete("{idBanco}")]
        public IActionResult Delete([FromRoute]int idBanco)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var banco = _bancoService.GetById(idBanco);

            if (banco == null)
            {
                return NotFound();
            }

            return Ok(_bancoService.Delete(banco));
        }

    }


}
