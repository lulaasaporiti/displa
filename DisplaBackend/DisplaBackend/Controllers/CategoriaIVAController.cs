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
    [Route("api/CategoriaIVA")]

    public class CategoriaIVAController : Controller
    {
        public ICategoriaIVAService _categoriaIVAService;

        public CategoriaIVAController(ICategoriaIVAService categoriaIVAService) //Este es el constructor
        {
            _categoriaIVAService = categoriaIVAService;
        }

        [HttpGet, Route("GetCategoriasIVA")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetCategoriasIVA()
        {
            return _categoriaIVAService.GetCategoriasIVA();
        }

        [HttpGet, Route("GetCategoriasIVAVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetCategoriasIVAVigentes()
        {
            return _categoriaIVAService.GetCategoriasIVAVigentes();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]CategoriaIva categoriaIVA)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //CategoriaIVA categoriaIVA = JsonConvert.DeserializeObject<CategoriaIVA>(aux);

            return Ok(_categoriaIVAService.SaveOrUpdate(categoriaIVA));
            
        }

        [HttpDelete("{idCategoriaIVA}")]
        public IActionResult Delete([FromRoute]int idCategoriaIVA)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var categoriaIVA = _categoriaIVAService.GetById(idCategoriaIVA);

            if (categoriaIVA == null)
            {
                return NotFound();
            }

            return Ok(_categoriaIVAService.Delete(categoriaIVA));
        }

    }


}
