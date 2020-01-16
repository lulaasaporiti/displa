using DisplaBackend.DAOs;
using DisplaBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DisplaBackend.Services
{
    public interface IBlockService
    {
        List<Block> GetBlocks();
        bool SaveOrUpdate(Block block);
        bool Delete(Block block);
        Block GetById(int idBlock);
    }

    public class BlockService : IBlockService
    {
        private IBlockDAO _blockDAO;

        public BlockService(IBlockDAO blockDAO)
        {
            _blockDAO = blockDAO;
        }

        public List<Block> GetBlocks()
        {
            return _blockDAO.GetBlocks();
        }

        public bool SaveOrUpdate(Block block)
        {
            return _blockDAO.SaveOrUpdate(block);

        }

        public bool Delete(Block block)
        {
            return _blockDAO.Delete(block);
        }

        public Block GetById(int idBlock)
        {
            return _blockDAO.GetById(idBlock);
        }

    }

}
