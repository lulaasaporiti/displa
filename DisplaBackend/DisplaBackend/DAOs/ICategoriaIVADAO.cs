using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface ICategoriaIVADAO
    {
        List<CategoriaIva> GetCategoriasIVA();
        List<CategoriaIva> GetCategoriasIVAVigentes();
        bool SaveOrUpdate(CategoriaIva CategoriaIVA);
        bool Delete(CategoriaIva CategoriaIVA);
        CategoriaIva GetById(int idCategoriaIVA);

    }

    public class CategoriaIVADAO : ICategoriaIVADAO
    {
        private readonly DisplaNEWContext _context;

        public CategoriaIVADAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<CategoriaIva> GetCategoriasIVA()
        {
            return _context.CategoriaIva
                .OrderByDescending(u => u.Borrado)
                .ToList();
        }

        public List<CategoriaIva> GetCategoriasIVAVigentes()
        {
            return _context.CategoriaIva
                .Where(c => c.Borrado == false)
                .ToList();
        }

        public bool SaveOrUpdate(CategoriaIva categoriaIVA)
        {
            try
            {
                if (categoriaIVA.Id == 0)
                {
                    categoriaIVA = _context.Add(categoriaIVA).Entity;
                }
                else
                {
                    categoriaIVA = _context.CategoriaIva.Update(categoriaIVA).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public CategoriaIva GetById(int idCategoriaIVA)
        {
            return _context.CategoriaIva.FirstOrDefault(tb => tb.Id == idCategoriaIVA);
        }

        public bool Delete(CategoriaIva categoriaIVA)
        {
            try
            {
                categoriaIVA.Borrado = !categoriaIVA.Borrado;
                categoriaIVA = _context.CategoriaIva.Update(categoriaIVA).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
