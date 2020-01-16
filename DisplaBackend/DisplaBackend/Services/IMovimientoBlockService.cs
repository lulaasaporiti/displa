using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IMovimientoBlockService
    {
        List<MovimientoBlock> GetMovimientosBlock(int idBlock);
        bool SaveOrUpdate(MovimientoBlock movimientoBlock);
        bool Delete(MovimientoBlock movimientoBlock);
        MovimientoBlock GetById(int idMovimientoBlock);
    }

    public class MovimientoBlockService : IMovimientoBlockService
    {
        private IMovimientoBlockDAO _movimientoBlockDAO;
        private IBlockDAO _blockDAO;


        public MovimientoBlockService(IMovimientoBlockDAO movimientoBlockDAO, IBlockDAO blockDAO)
        {
            _movimientoBlockDAO = movimientoBlockDAO;
            _blockDAO = blockDAO;
        }

        public List<MovimientoBlock> GetMovimientosBlock(int idBlock)
        {
            return _movimientoBlockDAO.GetMovimientosBlock(idBlock);
        }

        public bool SaveOrUpdate(MovimientoBlock movimientoBlock)
        {
            Block block = _blockDAO.GetById(movimientoBlock.IdBlock);
            try {
                if (movimientoBlock.TipoMovimiento == "Alta")
                {
                    foreach (var c in movimientoBlock.Caja)
                        block.StockActual = block.StockActual + c.Cantidad;
                }
                else {
                    foreach (var c in movimientoBlock.Caja)
                        block.StockActual = block.StockActual - c.Cantidad;
                }
                
                _movimientoBlockDAO.SaveOrUpdate(movimientoBlock);
                return  _blockDAO.SaveOrUpdate(block);

            }
            catch (Exception e)
            {
                return false;
            }

        }

        public bool Delete(MovimientoBlock movimientoBlock)
        {
            return _movimientoBlockDAO.Delete(movimientoBlock);
        }

        public MovimientoBlock GetById(int idMovimientoBlock)
        {
            return _movimientoBlockDAO.GetById(idMovimientoBlock);
        }

    }

}
