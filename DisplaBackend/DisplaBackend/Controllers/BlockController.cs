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
    [Route("api/Block")]

    public class BlockController : Controller
    {
        public IBlockService _blockService;

        public BlockController(IBlockService blockService) //Este es el constructor
        {
            _blockService = blockService;
        }


        [HttpGet, Route("GetBlocks")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetBlocks()
        {
            return _blockService.GetBlocks();
        }

        [HttpGet, Route("GetBlocksVigentes")]
        [EnableCors("DisplaAPIPolicy")]
        public object GetBlocksVigentes()
        {
            return _blockService.GetBlocksVigentes();
        }

        [HttpPost]
        public IActionResult SaveOrUpdate([FromBody]Block block)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //int idAsignacion = Convert.ToInt32(model.GetValue("idAsignacion").Value<string>());

            //var aux = model.GetValue("nombre").ToString();
            //Block block = JsonConvert.DeserializeObject<Block>(aux);

            return Ok(_blockService.SaveOrUpdate(block));
            
        }

        [HttpDelete("{idBlock}")]
        public IActionResult Delete([FromRoute]int idBlock)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var block = _blockService.GetById(idBlock);

            if (block == null)
            {
                return NotFound();
            }

            return Ok(_blockService.Delete(block));
        }

    }


}
