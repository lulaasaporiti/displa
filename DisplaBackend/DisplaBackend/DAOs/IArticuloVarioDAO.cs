using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
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
        bool SaveActualizacionPrecio(JObject[] porcentajePrecios);
        bool GenerarPrecioLista(int porcentaje, int lista);

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
                    List<PrecioArticulo> precioArticuloVarioNuevos = articuloVario.PrecioArticulo.ToList();
                    articuloVario.PrecioArticulo = null;

                    articuloVario = _context.ArticuloVario.Update(articuloVario).Entity;

                    if (precioArticuloVarioNuevos.Count > 0)
                    {
                        precioArticuloVarioNuevos.ForEach(p =>
                        {
                            if (p.Id == 0)
                            {
                                _context.PrecioArticulo.Add(p);
                            }
                            else
                            {
                                var precioBBDD = _context.PrecioArticulo.FirstOrDefault(pa => pa.Id == p.Id && pa.IdArticulo == p.IdArticulo && pa.Precio == p.Precio);
                                if (precioBBDD == null)
                                {
                                    _context.PrecioArticulo.Update(p);
                                }
                            }
                        });
                    }

                    List<PrecioArticulo> precioArticuloBBDD = _context.PrecioArticulo.Where(pa => pa.IdArticulo == articuloVario.Id).ToList();

                    precioArticuloBBDD.ForEach(p =>
                    {
                        if (precioArticuloVarioNuevos.Find(pa => pa.Id == p.Id) == null)
                        {
                            _context.PrecioArticulo.Remove(p);
                        }

                    });

            }
                return _context.SaveChanges() >= 1;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool SaveActualizacionPrecio(JObject[] porcentajePrecios)
        {
            try
            {
                if (porcentajePrecios != null)
                {
                    int precio = 0;
                    int porcentaje = 0;
                    var precioArticulo = new PrecioArticulo();

                    foreach (var p in porcentajePrecios)
                    {
                        precio = Convert.ToInt32(p.GetValue("IdPrecio"));
                        porcentaje = Convert.ToInt32(p.GetValue("Porcentaje"));
                        precioArticulo = _context.PrecioArticulo.Find(precio);
                        precioArticulo.Precio = Math.Round(precioArticulo.Precio + ((precioArticulo.Precio * porcentaje) / 100),2);
                        _context.PrecioArticulo.Update(precioArticulo);
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
            return _context.ArticuloVario.Include(av => av.PrecioArticulo)
                //.ThenInclude(pa => pa.Precio)
                .FirstOrDefault(tb => tb.Id == idArticuloVario);
        }

        public bool GenerarPrecioLista(int porcentaje, int lista)
        {
            try
            {
                List<ArticuloVario> articulos = GetArticulosVariosPrecios();

                List<PrecioArticulo> precios = new List<PrecioArticulo>();

                foreach (var a in articulos)
                {
                    var precio = new PrecioArticulo();

                    if (a.PrecioArticulo.Count >= lista)
                    {
                        if (a.PrecioArticulo.ElementAt(lista - 1) != null)
                        {
                            precio.Id = a.PrecioArticulo.ElementAt(lista - 1).Id;
                        }
                    }
                    precio.IdArticulo = a.Id;
                    precio.Precio = Math.Round(a.PrecioArticulo.ElementAt(0).Precio + ((a.PrecioArticulo.ElementAt(0).Precio * porcentaje) / 100), 2);
                    precios.Add(precio);
                }

                foreach (var p in precios)
                {
                    if (p.Id == 0)
                    {
                        _context.PrecioArticulo.Add(p);
                    }
                    else
                    {
                        _context.PrecioArticulo.Update(p);
                    }
                }

                return _context.SaveChanges() >= 1;
            }
            catch (Exception e)
            {
                return false;
            }
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
