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
    [Route("api/Funcion")]

    public class FuncionController : Controller
    {
        public IFuncionService _funcionService;

        public FuncionController(IFuncionService funcionService) //Este es el constructor
        {
            _funcionService = funcionService;
        }

        [HttpGet, Route("GetFunciones")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetFunciones()
        {
            return _funcionService.GetFunciones();
        }

        [HttpGet, Route("GetFuncionesAgrupadas")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetFuncionesArupadas()
        {
            return _funcionService.GetFuncionesAgrupadas();
        }
    }
}
