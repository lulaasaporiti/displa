using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface ITrasladoFondoDAO
    {
        List<TrasladoFondo> GetTrasladoFondos();
        //List<TrasladoFondo> GetTrasladoFondosVigentes();
        bool SaveOrUpdate(TrasladoFondo traslado);
        bool Delete(TrasladoFondo traslado);
        TrasladoFondo GetById(int idTrasladoFondo);

    }

    public class TrasladoFondoDAO : ITrasladoFondoDAO
    {
        private readonly DisplaNEWContext _context;

        public TrasladoFondoDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<TrasladoFondo> GetTrasladoFondos()
        {
            return _context.TrasladoFondo
                .ToList();
        }

        //public List<TrasladoFondo> GetTrasladoFondosVigentes()
        //{
        //    return _context.TrasladoFondo
        //        .Include(cu => cu.IdBancoNavigation)
        //        .Where(c => c.Borrado != true)
        //        .ToList();
        //}

        public bool SaveOrUpdate(TrasladoFondo traslado)
        {
            try
            {
                if (traslado.Id == 0)
                {
                    traslado.IdCuentaDestinoNavigation = null;
                    traslado.IdCuentaOrigenNavigation = null;
                    traslado = _context.Add(traslado).Entity;
                }
                else
                {
                    traslado = _context.TrasladoFondo.Update(traslado).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public TrasladoFondo GetById(int idTrasladoFondo)
        {
            return _context.TrasladoFondo.FirstOrDefault(u => u.Id == idTrasladoFondo);
        }

        public bool Delete(TrasladoFondo traslado)
        {
            try
            {
                traslado = _context.TrasladoFondo.Update(traslado).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
