using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IGastoDAO
    {
        List<Gasto> GetGastos();
        //List<Gasto> GetGastosVigentes();
        bool SaveOrUpdate(Gasto gasto);
        bool Delete(Gasto gasto);
        Gasto GetById(int idGasto);

    }

    public class GastoDAO : IGastoDAO
    {
        private readonly DisplaNEWContext _context;

        public GastoDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public List<Gasto> GetGastos()
        {
            return _context.Gasto
                //.OrderByDescending(u => u.Borrado)
                .ToList();
        }

        //public List<Gasto> GetGastosVigentes()
        //{
        //    return _context.Gasto
        //        .Where(u => u.Borrado == false)
        //        .ToList();
        //}

        public bool SaveOrUpdate(Gasto gasto)
        {
            try
            {
                if (gasto.Id == 0)
                {
                    gasto = _context.Add(gasto).Entity;
                }
                else
                {
                    gasto = _context.Gasto.Update(gasto).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public Gasto GetById(int idGasto)
        {
            return _context.Gasto.FirstOrDefault(u => u.Id == idGasto);
        }

        public bool Delete(Gasto gasto)
        {
            try
            {
                //gasto.Borrado = !gasto.Borrado;
                _context.Gasto.Remove(gasto);
                //gasto = _context.Gasto.Update(gasto).Entity;
                return _context.SaveChanges() >= 1;
            }
            catch (DbUpdateException e)
            {
                //throw e;
                return false;
            }
        }
    }
}
