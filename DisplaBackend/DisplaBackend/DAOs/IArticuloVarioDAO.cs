using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IArticuloVarioDAO
    {
        List<ArticuloVario> GetArticulosVarios();
        List<ArticuloVario> GetArticulosVariosVigentes();
        bool SaveOrUpdate(ArticuloVario articuloVario);
        bool Delete(ArticuloVario articuloVario);
        ArticuloVario GetById(int idArticuloVario);

    }

    public class ArticuloVarioDAO : IArticuloVarioDAO
    {
        private readonly DisplaNEWContext _context;

        public ArticuloVarioDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<ArticuloVario> GetArticulosVarios()
        {
            return _context.ArticuloVario
                .Include(b => b.IdTipoArticuloNavigation)
                .Include(b => b.PrecioArticulo)
                .OrderByDescending(b => b.Borrado)
                .ToList();
        }

        public List<ArticuloVario> GetArticulosVariosVigentes()
        {
            return _context.ArticuloVario
                .Include(i => i.IdTipoArticuloNavigation)
                .Where(i => i.Borrado == false)
                .ToList();
        }

        public bool SaveOrUpdate(ArticuloVario articuloVario)
        {
            try
            {
                if (articuloVario.Id == 0)
                {
                    articuloVario = _context.Add(articuloVario).Entity;
                    articuloVario.PrecioArticulo.ToList().ForEach(p =>
                    {
                        p.IdArticulo = articuloVario.Id;
                        p.Precio = p.Precio;
                        _context.PrecioArticulo.Add(p);
                    });
                }
                else
                {
                    var precioArticuloVario = _context.PrecioArticulo.Where(s => s.IdArticulo == articuloVario.Id).ToList();
                    if (precioArticuloVario.Count() > 0)
                    {
                        foreach (var p in precioArticuloVario)
                        {
                            _context.PrecioArticulo.Remove(p);
                        }
                        _context.SaveChanges();
                    }

                    List<PrecioArticulo> precioArticuloVarioNuevos = articuloVario.PrecioArticulo.ToList();
                    articuloVario.PrecioArticulo = null;

                    articuloVario = _context.ArticuloVario.Update(articuloVario).Entity;

                    if (precioArticuloVarioNuevos != null)
                    {
                        precioArticuloVarioNuevos.ForEach(p =>
                        {
                            p.Id = 0;
                            p.IdArticulo = articuloVario.Id;
                            p.IdArticuloNavigation = null;
                            _context.PrecioArticulo.Add(p);
                        });
                    }
                }
                return _context.SaveChanges() >= 1;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public ArticuloVario GetById(int idArticuloVario)
        {
            return _context.ArticuloVario.FirstOrDefault(tb => tb.Id == idArticuloVario);
        }

        public bool Delete(ArticuloVario articuloVario)
        {
            try
            {
                articuloVario.Borrado = !articuloVario.Borrado;
                articuloVario = _context.ArticuloVario.Update(articuloVario).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
