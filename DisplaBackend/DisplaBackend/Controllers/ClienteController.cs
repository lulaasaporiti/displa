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
        public int SaveOrUpdate([FromBody]Cliente cliente)
        {
            if (!ModelState.IsValid)
            {
                return -1;
                //return BadRequest(ModelState);
            }
            return _clienteService.SaveOrUpdate(cliente);
            
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

        [HttpGet("{id}")]
        public object GetById([FromRoute]int id)
        {
            return _clienteService.GetById(id);
        }

        [HttpPost, Route("SavePreciosArticulos")]
        public IActionResult SavePreciosArticulos([FromBody]List<PrecioArticuloCliente> preciosArticulos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_clienteService.SavePreciosArticulos(preciosArticulos));
        }

        [HttpPost, Route("SavePreciosServicios")]
        public IActionResult SavePreciosServicios([FromBody]List<PrecioServicioCliente> preciosServicios)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_clienteService.SavePreciosServicios(preciosServicios));
        }

        [HttpPost, Route("SavePreciosLentes")]
        public IActionResult SavePreciosLentes([FromBody]List<PrecioLenteCliente> preciosLentes)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_clienteService.SavePreciosLentes(preciosLentes));
        }

        //[HttpPost, Route("SavePreciosEspecialesArticulos")]
        //public IActionResult SavePreciosEspecialesArticulos([FromBody]List<PrecioEspecialArticuloCliente> preciosArticulos)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    return Ok(_clienteService.SavePreciosEspecialesArticulos(preciosArticulos));
        //}

        [HttpPost, Route("SaveFicha")]
        public IActionResult SaveFicha([FromBody]Ficha ficha)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(_clienteService.SaveFicha(ficha));
        }

        [HttpGet("{idCliente}"), Route("GetPreciosArticulosCliente")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetPreciosArticulosCliente(int idCliente)
        {
            return _clienteService.GetPreciosArticulosCliente(idCliente);
        }

        [HttpGet("{idCliente}"), Route("GetPreciosServiciosCliente")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetPreciosServiciosCliente(int idCliente)
        {
            return _clienteService.GetPreciosServiciosCliente(idCliente);
        }

        [HttpGet("{idCliente}"), Route("GetPreciosLentesCliente")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetPreciosLentesCliente(int idCliente)
        {
            return _clienteService.GetPreciosLentesCliente(idCliente);
        }

        [HttpGet("{idCliente}"), Route("GetFichaCliente")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetFichaCliente(int idCliente)
        {
            return _clienteService.GetFichaCliente(idCliente);
        }

        [HttpGet, Route("BloquearClientes")]
        public IActionResult BloquearClientes()
        {
            return Ok(_clienteService.BloquearClientes());
        }

        [HttpGet, Route("GetCuentasClientes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetCuentasClientes()
        {
            return _clienteService.GetCuentasClientes();
        }

        [HttpPost, Route("AsignarPreciosLentes")]
        public int AsignarPreciosLentes([FromBody]JObject[] preciosLentes)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}
            return _clienteService.AsignarPreciosLentes(preciosLentes);
        }

        [HttpPost, Route("AsignarPreciosServicios")]
        public int AsignarPreciosServicios([FromBody]JObject[] preciosServicios)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}
            return _clienteService.AsignarPreciosServicios(preciosServicios);
        }

        [HttpPost, Route("AsignarPreciosArticulos")]
        public int AsignarPreciosArticulos([FromBody]JObject[] preciosArticulos)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}
            return _clienteService.AsignarPreciosArticulos(preciosArticulos);
        }

        [HttpGet, Route("GetListaAsignacionLente")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetListaAsignacionLente()
        {
            return _clienteService.GetListaAsignacionLente();
        }

        [HttpGet, Route("GetListaAsignacionServicio")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetListaAsignacionServicio()
        {
            return _clienteService.GetListaAsignacionServicio();
        }

        [HttpGet, Route("GetListaAsignacionArticulo")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetListaAsignacionArticulo()
        {
            return _clienteService.GetListaAsignacionArticulo();
        }

        [HttpGet, Route("GetPrecioLenteFactura")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetPrecioLenteFactura(int idCliente, int idLente, int Esferico, int Cilindrico)
        {
            return _clienteService.GetPrecioLenteFactura(idCliente, idLente, Esferico, Cilindrico);
        }

        [HttpGet, Route("GetPrecioArticuloFactura")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetPrecioArticuloFactura(int idCliente, int[] articulos)
        {
            return _clienteService.GetPrecioArticuloFactura(idCliente, articulos);
        }

        [HttpGet, Route("GetPrecioServicioFactura")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetPrecioServicioFactura(int idCliente, int idServicio)
        {
            return _clienteService.GetPrecioServicioFactura(idCliente, idServicio);
        }
    }


}
