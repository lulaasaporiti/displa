using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface ILenteDAO
    {
        List<Lente> GetLentes();
        List<Lente> GetLentesVigentes();
        bool SaveOrUpdate(Lente lente);
        bool Delete(Lente lente);
        Lente GetById(int idLente);
        int GetLastCode();
        List<string> GetCombinaciones();
        List<dynamic> GetLentesVigentesAgrupados();
        bool SaveActualizacionPrecio(JObject[] porcentajePrecios);
    }

    public class LenteDAO : ILenteDAO
    {
        private readonly DisplaNEWContext _context;

        public LenteDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<Lente> GetLentes()
        {
            return _context.Lente
                .Include(l => l.PrecioLente)
                .OrderBy(l => l.Borrado)
                .ToList();
        }

        public List<Lente> GetLentesVigentes()
        {
            List<Lente> lentes = _context.Lente
                .Where(l => l.Borrado == false)
                .Select(l => new Lente
                {
                    Id = l.Id,
                    Nombre = l.Nombre,
                    DescripcionFactura = l.DescripcionFactura,
                    Borrado = l.Borrado,
                    Combinacion = l.Combinacion,
                    PrecioLente = l.PrecioLente
                        .Where(p => p.PrecioLenteCliente.Where(pc => pc.Especial == true).Count() == 0)
                        .Select(p => new PrecioLente { Id = p.Id, Precio = p.Precio, IdLente = p.IdLente, PrecioLenteCliente = p.PrecioLenteCliente, Cilindrico = p.Cilindrico, Esferico = p.Esferico })
                        .OrderBy(p => p.Precio).ToList()
                })
                .ToList();
            return lentes;
        }


        public List<dynamic> GetLentesVigentesAgrupados()
        {
            List<dynamic> lentes = _context.Lente
                .Where(l => l.Borrado == false)
                .Select(l => new
                {
                    Id = l.Id,
                    Nombre = l.Nombre,
                    DescripcionFactura = l.DescripcionFactura,
                    Borrado = l.Borrado,
                    PrecioLente = l.PrecioLente
                        .Where(p => p.PrecioLenteCliente.Where(pc => pc.Especial == true).Count() == 0)
                        .GroupBy(p => new {
                            IdLente = p.IdLente,
                            Esferico = p.Esferico,
                            Cilindrico = p.Cilindrico
                        })
                        .Select(p => new {
                            Precio = _context.PrecioLente.Where(pl => pl.IdLente == p.Key.IdLente && pl.Esferico == p.Key.Esferico && pl.Cilindrico == p.Key.Cilindrico)
                                .OrderBy(pl => pl.Precio)
                                .Select(pl => new { pl.Id, pl.Precio }),
                            IdLente = p.Key.IdLente,
                            Cilindrico = p.Key.Cilindrico,
                            Esferico = p.Key.Esferico
                        })
                        .ToList<dynamic>()
                })
                .ToList<dynamic>();
            return lentes;
        }

        public List<string> GetCombinaciones()
        {
            return _context.Lente.Where(l => l.Borrado == false)
                .GroupBy(l => l.Combinacion)
                .Select(l => l.Key)
                .ToList<string>();
        }


        public int GetLastCode() {
            return _context.Lente.Last().Id + 1;
        }

        public bool SaveOrUpdate(Lente lente)
        {
            try
            {
                if (lente.Id == 0)
                {
                    lente = _context.Add(lente).Entity;
                    lente.PrecioLente.ToList().ForEach(p =>
                    {
                        //p.IdLente = lente.Id;
                        //p.Precio = p.Precio;
                        //p.Cilindrico = p.Cilindrico;
                        //p.Esferico = p.Esferico;
                        _context.PrecioLente.Add(p);
                    });

                    if (lente.RecargoLente.Count > 0) {
                        lente.RecargoLente.ToList().ForEach(r =>
                        {
                            _context.RecargoLente.Add(r);
                        });
                    }
                }
                else
                {
                    List<PrecioLente> precioLenteNuevos = lente.PrecioLente.ToList();
                    List<RecargoLente> recargoLenteNuevos = lente.RecargoLente.ToList();
                    lente.PrecioLente = null;
                    lente.RecargoLente = null;

                    lente = _context.Lente.Update(lente).Entity;

                    if (precioLenteNuevos.Count > 0)
                    {
                        precioLenteNuevos.ForEach(p =>
                        {
                            if(p.Id == 0)
                            {
                                _context.PrecioLente.Add(p);
                            }
                            else
                            {
                                var precioBBDD = _context.PrecioLente.FirstOrDefault(pl => pl.Id == p.Id && pl.Esferico == p.Esferico && pl.Cilindrico == p.Cilindrico);
                                if (precioBBDD == null)
                                {
                                    _context.PrecioLente.Update(p);
                                }
                            }
                        });
                    }

                    if (recargoLenteNuevos.Count > 0)
                    {
                        recargoLenteNuevos.ForEach(r =>
                        {
                            _context.RecargoLente.Add(r);
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

        public bool SaveActualizacionPrecio(JObject[] porcentajePrecios)
        {
            try
            {
                if (porcentajePrecios != null)
                {
                    int precio = 0;
                    int porcentaje = 0;
                    var precioLente = new PrecioLente();

                    foreach (var p in porcentajePrecios)
                    {
                        precio = Convert.ToInt32(p.GetValue("IdPrecio"));
                        porcentaje = Convert.ToInt32(p.GetValue("Porcentaje"));
                        precioLente = _context.PrecioLente.Find(precio);
                        precioLente.Precio = Math.Round(precioLente.Precio + ((precioLente.Precio * porcentaje) / 100), 2);
                        _context.PrecioLente.Update(precioLente);
                    }
                }
                return _context.SaveChanges() >= 1;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public Lente GetById(int idLente)
        {
            return _context.Lente
                .Include(l => l.PrecioLente)
                .Include(l => l.RecargoLente)
                .FirstOrDefault(tb => tb.Id == idLente);
        }

        public bool Delete(Lente lente)
        {
            try
            {
                lente.Borrado = !lente.Borrado;
                lente = _context.Lente.Update(lente).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
