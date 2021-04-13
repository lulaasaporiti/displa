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
    [Route("api/Insumo")]

    public class InsumoController : Controller
    {
        public IInsumoService _insumoService;

        public InsumoController(IInsumoService insumoService) //Este es el constructor
        {
            _insumoService = insumoService;
        }


        [HttpGet, Route("GetInsumos")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetInsumos()
        {
            return _insumoService.GetInsumos();
        }

        [HttpGet, Route("GetInsumosVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetInsumosVigentes()
        {
            return _insumoService.GetInsumosVigentes();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]Insumo insumo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //Insumo insumo = JsonConvert.DeserializeObject<Insumo>(aux);

            return Ok(_insumoService.SaveOrUpdate(insumo));
            
        }

        [HttpDelete("{idInsumo}")]
        public IActionResult Delete([FromRoute]int idInsumo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var insumo = _insumoService.GetById(idInsumo);

            if (insumo == null)
            {
                return NotFound();
            }

            return Ok(_insumoService.Delete(insumo));
        }

        [HttpGet("{id}")]
        //[EnableCors("DisplaAPIPolicy")]
        public object GetById([FromRoute] int id)
        {
            return _insumoService.GetById(id);
        }


    }


}
