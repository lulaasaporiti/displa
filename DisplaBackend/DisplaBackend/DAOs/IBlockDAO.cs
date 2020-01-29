using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IBlockDAO
    {
        List<Block> GetBlocks();
        List<Block> GetBlocksVigentes();
        bool SaveOrUpdate(Block block);
        bool Delete(Block block);
        Block GetById(int idBlock);

    }

    public class BlockDAO : IBlockDAO
    {
        private readonly DisplaNEWContext _context;

        public BlockDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<Block> GetBlocksVigentes()
        {
            return _context.Block
                .Include(b => b.IdTipoBlockNavigation)
                .Where(b => b.Borrado == true)
                //.OrderByDescending(b => b.Borrado)
                .ToList();
        }

        public List<Block> GetBlocks()
        {
            return _context.Block
                .Include(b => b.IdTipoBlockNavigation)
                .OrderByDescending(b => b.Borrado)
                .ToList();
        }

        public bool SaveOrUpdate(Block block)
        {
            try
            {
                if (block.Id == 0)
                {
                    block = _context.Add(block).Entity;
                }
                else
                {
                    block = _context.Block.Update(block).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public Block GetById(int idBlock)
        {
            return _context.Block.FirstOrDefault(tb => tb.Id == idBlock);
        }

        public bool Delete(Block block)
        {
            try
            {
                block.Borrado = !block.Borrado;
                block = _context.Block.Update(block).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
