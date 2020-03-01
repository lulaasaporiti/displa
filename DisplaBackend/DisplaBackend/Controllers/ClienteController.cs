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
    [Route("api/Cliente")]

    public class ClienteController : Controller
    {
        public IClienteService _clienteService;

        public ClienteController(IClienteService clienteService) //Este es el constructor
        {
            _clienteService = clienteService;
        }


        [HttpGet, Route("GetClientes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetClientes()
        {
            return _clienteService.GetClientes();
        }

        [HttpGet, Route("GetClientesVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetClientesVigentes()
        {
            return _clienteService.GetClientesVigentes();
        }

        [HttpGet, Route("GetClientesActivos")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetClientesActivos()
        {
            return _clienteService.GetClientesActivos();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]Cliente cliente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_clienteService.SaveOrUpdate(cliente));
            
        }

        [HttpDelete("{idCliente}")]
        public IActionResult Delete([FromRoute]int idCliente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cliente = _clienteService.GetById(idCliente);

            if (cliente == null)
            {
                return NotFound();
            }

            return Ok(_clienteService.Delete(cliente));
        }

    }


}
