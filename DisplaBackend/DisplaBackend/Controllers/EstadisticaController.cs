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
    [Route("api/Estadistica")]

    public class EstadisticaController : Controller
    {
        public IEstadisticaService _estadisticaService;

        public EstadisticaController(IEstadisticaService estadisticaService) //Este es el constructor
        {
            _estadisticaService = estadisticaService;
        }

        [HttpGet, Route("GetDetalleArticulos")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetDetalleArticulos()
        {
            return _estadisticaService.GetDetalleArticulos();
        }


    }


}
