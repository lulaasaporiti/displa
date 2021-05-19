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
        bool GenerarPrecioLista(int porcentaje, int lista);
        PrecioLente GetPrecioMinimo(int idLente);
        List<RecargoLente> GetRecargoLente(int idLente);

        int GetCantidadListas();
    }

    public class LenteDAO : ILenteDAO
    {
        private readonly DisplaNEWContext _context;

        public LenteDAO(DisplaNEWContext context)
        {
            _context = context;
        }

        public int GetCantidadListas()
        {


            int lentes = _context.Lente
                .Where(l => l.Borrado == false && l.PrecioLente.Count > 0)
                .Max(l => l.PrecioLente
                        .Where(p => p.PrecioLenteCliente.Where(pc => pc.Especial == true).Count() == 0)
                        .Max(p => _context.PrecioLente.Where(pl => pl.IdLente == p.IdLente && pl.MedidaEsferico == p.MedidaEsferico
                            && pl.MedidaCilindrico == p.MedidaCilindrico).Select(pl => pl.Precio).Count())
            );

            return lentes;


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
                    Iva = l.Iva,
                    GraduacionesCilindricas = l.GraduacionesCilindricas,
                    Combinacion = l.Combinacion,
                    Fraccionado = l.Fraccionado,
                    PrecioLente = l.PrecioLente
                        .Where(p => p.PrecioLenteCliente.Where(pc => pc.Especial == true).Count() == 0)
                        .Select(p => new PrecioLente { Id = p.Id, Precio = p.Precio, IdLente = p.IdLente, PrecioLenteCliente = p.PrecioLenteCliente, MedidaCilindrico = p.MedidaCilindrico, MedidaEsferico = p.MedidaEsferico })
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
                        .GroupBy(p => new
                        {
                            IdLente = p.IdLente,
                            Esferico = p.MedidaEsferico,
                            Cilindrico = p.MedidaCilindrico
                        })
                        .Select(p => new
                        {
                            Precio = _context.PrecioLente.Where(pl => pl.IdLente == p.Key.IdLente && pl.MedidaEsferico == p.Key.Esferico && pl.MedidaCilindrico == p.Key.Cilindrico)
                                .OrderBy(pl => pl.Precio)
                                .Select(pl => new { pl.Id, pl.Precio }).ToArray<dynamic>(),
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


        public int GetLastCode()
        {
            return _context.Lente.Last().Id + 1;
        }

        public bool GenerarPrecioLista(int porcentaje, int lista)
        {
            try
            {
                List<dynamic> lentes = this.GetLentesVigentesAgrupados();

                List<PrecioLente> precios = new List<PrecioLente>();

                foreach (var l in lentes)
                {
                    foreach (var p in l.PrecioLente)
                    {
                        var precio = new PrecioLente();
                        var aux = p.Precio;

                        if (p.Precio.Length >= lista)//si el numero de "lista" ya esta generado
                        {
                            if (p.Precio[lista - 1] != null) // si tiene el precio para ese numero de lista para actualizar el que ya esta
                            {
                                precio.Id = p.Precio[lista - 1].Id;
                            }
                        }
                        precio.Precio = Math.Round(p.Precio[0].Precio + ((p.Precio[0].Precio * porcentaje) / 100), 2);
                        precio.MedidaEsferico = p.Esferico;
                        precio.MedidaCilindrico = p.Cilindrico;
                        precio.IdLente = p.IdLente;

                        precios.Add(precio);
                    }
                }

                foreach (var p in precios)
                {
                    if (p.Id == 0)
                    {
                        _context.PrecioLente.Add(p);
                    }
                    else
                    {
                        _context.PrecioLente.Update(p);
                    }

                }
                return _context.SaveChanges() >= 1;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool SaveOrUpdate(Lente lente)
        {
            try
            {
                if (lente.FechaCreacion == null)
                {
                    lente.FechaCreacion = DateTime.Now;
                    lente = _context.Add(lente).Entity;
                    lente.PrecioLente.ToList().ForEach(p =>
                    {
                        //p.IdLente = lente.Id;
                        //p.Precio = p.Precio;
                        //p.Cilindrico = p.Cilindrico;
                        //p.Esferico = p.Esferico;
                        //if (lente.GraduacionesCilindricas == '-'.ToString()) {
                        //    p.MedidaCilindrico = 0 - p.MedidaCilindrico;
                        //}
                        p.MedidaCilindrico = Math.Abs(p.MedidaCilindrico);
                        _context.PrecioLente.Add(p);
                    });

                    if (lente.RecargoLente.Count > 0)
                    {
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
                            if (p.Id == 0)
                            {
                                //if (lente.GraduacionesCilindricas == '-'.ToString())
                                //{
                                //    p.MedidaCilindrico = 0 - p.MedidaCilindrico;
                                //}
                                p.MedidaCilindrico = Math.Abs(p.MedidaCilindrico);
                                _context.PrecioLente.Add(p);
                            }
                            else
                            {
                                var precioBBDD = _context.PrecioLente.AsNoTracking().FirstOrDefault(pl => pl.Id == p.Id && pl.MedidaEsferico == p.MedidaEsferico && pl.MedidaCilindrico == p.MedidaCilindrico);
                                if (precioBBDD != null)
                                {
                                    //if (lente.GraduacionesCilindricas == '-'.ToString())
                                    //{
                                    //    p.MedidaCilindrico = 0 - p.MedidaCilindrico;
                                    //}
                                    p.MedidaCilindrico = Math.Abs(p.MedidaCilindrico);
                                    _context.PrecioLente.Update(p);
                                }
                            }
                            _context.SaveChanges();
                        });
                    }

                    if (recargoLenteNuevos.Count > 0)
                    {
                        recargoLenteNuevos.ForEach(r =>
                        {
                            if (r.Id == 0)
                            {
                                _context.RecargoLente.Add(r);
                            }
                            else
                            {
                                var recargoBBDD = _context.RecargoLente.AsNoTracking().FirstOrDefault(rl => rl.Id == r.Id && r.IdLente == r.IdLente && rl.Descripcion == r.Descripcion && rl.Porcentaje == r.Porcentaje);
                                if (recargoBBDD != null)
                                {
                                    _context.RecargoLente.Update(r);
                                }
                            }
                        });
                    }

                    List<PrecioLente> precioLenteDDBB = _context.PrecioLente.Where(pl => pl.IdLente == lente.Id).ToList();
                    List<RecargoLente> recargoLenteDDBB = _context.RecargoLente.Where(pl => pl.IdLente == lente.Id).ToList();

                    precioLenteDDBB.ForEach(p =>
                    {
                        if (precioLenteNuevos.Find(pl => pl.Id == p.Id) == null)
                        {
                            _context.PrecioLente.Remove(p);
                        }
                    });

                    recargoLenteDDBB.ForEach(r =>
                    {
                        if (recargoLenteNuevos.Find(rl => rl.Id == r.Id) == null)
                        {
                            _context.RecargoLente.Remove(r);
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

        public PrecioLente GetPrecioMinimo(int idLente)
        {
            return _context.PrecioLente.Where(p => p.IdLente == idLente).OrderBy(p => p.MedidaCilindrico).ThenBy(p => p.MedidaEsferico).FirstOrDefault();
        }

        public List<RecargoLente> GetRecargoLente(int idLente)
        {
            return _context.RecargoLente
                .Include(rl => rl.IdLenteNavigation)
                .Where(rl => rl.IdLente == idLente)
                .ToList();
        }
    }


}
