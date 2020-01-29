using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IInsumoDAO
    {
        List<Insumo> GetInsumos();
        List<Insumo> GetInsumosVigentes();
        bool SaveOrUpdate(Insumo insumo);
        bool Delete(Insumo insumo);
        Insumo GetById(int idInsumo);

    }

    public class InsumoDAO : IInsumoDAO
    {
        private readonly DisplaNEWContext _context;

        public InsumoDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<Insumo> GetInsumos()
        {
            return _context.Insumo
                .Include(b => b.IdTipoInsumoNavigation)
                .OrderByDescending(b => b.Borrado)
                .ToList();
        }

        public List<Insumo> GetInsumosVigentes()
        {
            return _context.Insumo
                .Include(i => i.IdTipoInsumoNavigation)
                .Where(i => i.Borrado == false)
                .ToList();
        }

        public bool SaveOrUpdate(Insumo insumo)
        {
            try
            {
                if (insumo.Id == 0)
                {
                    insumo = _context.Add(insumo).Entity;
                }
                else
                {
                    insumo = _context.Insumo.Update(insumo).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public Insumo GetById(int idInsumo)
        {
            return _context.Insumo.FirstOrDefault(tb => tb.Id == idInsumo);
        }

        public bool Delete(Insumo insumo)
        {
            try
            {
                insumo.Borrado = !insumo.Borrado;
                insumo = _context.Insumo.Update(insumo).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
