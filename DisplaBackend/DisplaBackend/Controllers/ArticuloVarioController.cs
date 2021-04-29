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
    [Route("api/ArticuloVario")]

    public class ArticuloVarioController : Controller
    {
        public IArticuloVarioService _articuloVarioService;

        public ArticuloVarioController(IArticuloVarioService articuloVarioService) //Este es el constructor
        {
            _articuloVarioService = articuloVarioService;
        }


        [HttpGet, Route("GetArticulosVarios")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetArticulosVarios()
        {
            return _articuloVarioService.GetArticulosVarios();
        }

        [HttpGet, Route("GetCantidadListas")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetCantidadListas()
        {
            return _articuloVarioService.GetCantidadListas();
        }

        [HttpGet, Route("GetArticulosVariosVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetArticulosVariosVigentes()
        {
            return _articuloVarioService.GetArticulosVariosVigentes();
        }

        [HttpGet, Route("GetArticulosVariosPrecios")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetArticulosVariosPrecios()
        {
            return _articuloVarioService.GetArticulosVariosPrecios();
        }


        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]ArticuloVario articuloVario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //ArticuloVario articuloVario = JsonConvert.DeserializeObject<ArticuloVario>(aux);

            return Ok(_articuloVarioService.SaveOrUpdate(articuloVario));
            
        }

        [HttpPut]
        public IActionResult SaveActualizacionPrecio([FromBody] JObject[] porcentajePrecios)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //int[] aux = JsonConvert.DeserializeObject<JObject>(porcentajePrecios);

            return Ok(_articuloVarioService.SaveActualizacionPrecio(porcentajePrecios));

        }

        [HttpDelete("{idArticuloVario}")]
        public IActionResult Delete([FromRoute]int idArticuloVario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var articuloVario = _articuloVarioService.GetById(idArticuloVario);

            if (articuloVario == null)
            {
                return NotFound();
            }

            return Ok(_articuloVarioService.Delete(articuloVario));
        }

        [HttpPost, Route("GenerarPrecioLista")]
        [EnableCors("DisplaAPIPolicy")]
        public IActionResult GenerarPrecioLista([FromBody]  JObject generarPrecios)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            int porcentaje = Convert.ToInt32(generarPrecios.GetValue("Porcentaje").Value<string>());
            int lista = Convert.ToInt32(generarPrecios.GetValue("Lista").Value<string>());

            return Ok(_articuloVarioService.GenerarPrecioLista(porcentaje, lista));

        }

        [HttpGet("{id}")]
        public object GetById([FromRoute]int id)
        {
            return _articuloVarioService.GetById(id);
        }


    }


}
