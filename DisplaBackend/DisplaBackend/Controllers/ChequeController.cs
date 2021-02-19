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
    [Route("api/Cheque")]

    public class ChequeController : Controller
    {
        public IChequeService _chequeService;

        public ChequeController(IChequeService chequeService) //Este es el constructor
        {
            _chequeService = chequeService;
        }


        [HttpGet, Route("GetChequesCartera")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetChequesCartera()
        {
            return _chequeService.GetChequesCartera();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]Cheque cheque)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(_chequeService.SaveOrUpdate(cheque));
            
        }

        [HttpDelete("{idCheque}")]
        public IActionResult Delete([FromRoute]int idCheque)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cheque = _chequeService.GetById(idCheque);

            if (cheque == null)
            {
                return NotFound();
            }

            return Ok(_chequeService.Delete(cheque));
        }

    }


}
