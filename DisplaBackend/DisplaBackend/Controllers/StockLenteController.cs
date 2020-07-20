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
    [Route("api/StockLente")]

    public class StockLenteController : Controller
    {
        public IStockLenteService _stockLenteService;

        public StockLenteController(IStockLenteService stockLenteService) //Este es el constructor
        {
            _stockLenteService = stockLenteService;
        }


        [HttpGet("{idLente}")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetStockLente([FromRoute]int idLente)
        {
            return _stockLenteService.GetStockLente(idLente);
        }

       

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]List<StockLente> stocksLente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_stockLenteService.SaveOrUpdate(stocksLente));
            
        }

        [HttpDelete("{idStockLente}")]
        public IActionResult Delete([FromRoute] decimal medidaCilindrico, decimal medidaEsferico, int idLente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var stockLente = _stockLenteService.GetStockLente(medidaCilindrico, medidaEsferico, idLente);

            if (stockLente == null)
            {
                return NotFound();
            }

            return Ok(_stockLenteService.Delete(stockLente));
        }

    }


}
