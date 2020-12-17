using DisplaBackend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DisplaBackend.DAOs
{
    public interface IParametroDAO
    {
        Parametros GetParametro();
        string GetObservaciones();
        bool SaveOrUpdate(Parametros parametro);
        bool Delete(Parametros parametro);
        Parametros GetById(int idParametro);

    }

    public class ParametroDAO : IParametroDAO
    {
        private readonly DisplaNEWContext _context;

        public ParametroDAO(DisplaNEWContext context)
        {
            _context = context;
        }


        public Parametros GetParametro()
        {
            return _context.Parametros.LastOrDefault();
        }

        public string GetObservaciones()
        {
            return _context.Parametros.Select(p => p.Observaciones).LastOrDefault();
               
        }

        public bool SaveOrUpdate(Parametros parametro)
        {
            try
            {
                if (parametro.Id == 0)
                {
                    parametro = _context.Add(parametro).Entity;
                }
                else
                {
                    parametro = _context.Parametros.Update(parametro).Entity;

                }
                return _context.SaveChanges() >= 1;

            }
            catch (Exception e)
            {
                return false;
            }
        }

        public Parametros GetById(int idParametro)
        {
            return _context.Parametros.FirstOrDefault(u => u.Id == idParametro);
        }

        public bool Delete(Parametros parametro)
        {
            try
            {
                parametro = _context.Parametros.Update(parametro).Entity;
                return _context.SaveChanges() >= 1;

            }
            catch (DbUpdateException e)
            {
                throw e;
            }
        }
    }
}
