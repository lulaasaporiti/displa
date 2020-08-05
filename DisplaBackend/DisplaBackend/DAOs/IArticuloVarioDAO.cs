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
        List<ArticuloVario> GetArticulosVariosPrecios();
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
                .Include(b => b.IdTipoArticuloNavigation)
                .Include(b => b.PrecioArticulo)
                .Where(a => a.Borrado == false)
                .ToList();
        }

        public List<ArticuloVario> GetArticulosVariosPrecios()
        {
            List<ArticuloVario> articulos = _context.ArticuloVario
                .Where(a => a.Borrado == false)
                .Select(a => new ArticuloVario
                {
                    Id = a.Id,
                    Nombre = a.Nombre,
                    IdTipoArticulo = a.IdTipoArticulo,
                    IdTipoArticuloNavigation = a.IdTipoArticuloNavigation,
                    Borrado = a.Borrado,
                    StockActual = a.StockActual,
                    StockMinimo = a.StockMinimo,
                    PorcentajeUtilidad = a.PorcentajeUtilidad,
                    PrecioCosto = a.PrecioCosto,
                    PrecioArticulo = a.PrecioArticulo
                        .Where(p => p.PrecioArticuloCliente.Where(pc => pc.Especial == true).Count() == 0)
                        .Select(p => new PrecioArticulo { Id = p.Id, Precio = p.Precio, IdArticulo = p.IdArticulo, IdArticuloNavigation = p.IdArticuloNavigation })
                        //.Select(p => new PrecioArticulo { Id = p.Id, Precio = p.Precio, IdArticulo = p.IdArticulo, PrecioArticuloCliente = p.PrecioArticuloCliente })
                        .OrderBy(p => p.Precio).ToList()
                })
                .ToList();

            articulos.GroupBy(a => a.IdTipoArticulo);
            return articulos;
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
            return _context.ArticuloVario.Include(av => av.PrecioArticulo).FirstOrDefault(tb => tb.Id == idArticuloVario);
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
