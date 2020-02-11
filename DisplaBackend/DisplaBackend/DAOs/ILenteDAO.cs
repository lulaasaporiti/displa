using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
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
                .OrderByDescending(l => l.Borrado)
                .ToList();
        }

        public List<Lente> GetLentesVigentes()
        {
            return _context.Lente
                .Where(l => l.Borrado == false)
                .ToList();
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
                        p.IdLente = lente.Id;
                        p.Precio = p.Precio;
                        p.Cilindrico = p.Cilindrico;
                        p.Esferico = p.Esferico;
                        _context.PrecioLente.Add(p);
                    });
                }
                else
                {
                    var precioLente = _context.PrecioLente.Where(s => s.IdLente == lente.Id).ToList();
                    if (precioLente.Count() > 0)
                    {
                        foreach (var p in precioLente)
                        {
                            _context.PrecioLente.Remove(p);
                        }
                        _context.SaveChanges();
                    }

                    List<PrecioLente> precioLenteNuevos = lente.PrecioLente.ToList();
                    lente.PrecioLente = null;

                    lente = _context.Lente.Update(lente).Entity;

                    if (precioLenteNuevos != null)
                    {
                        precioLenteNuevos.ForEach(p =>
                        {
                            p.Id = 0;
                            p.IdLente = lente.Id;
                            _context.PrecioLente.Add(p);
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

        public Lente GetById(int idLente)
        {
            return _context.Lente.FirstOrDefault(tb => tb.Id == idLente);
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
